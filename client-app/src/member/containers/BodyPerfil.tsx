import React, { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react'
import { ISecurityComponet } from '../../component/SecurityComponet'
import {
    Grid, Paper, makeStyles, Avatar, Button,
    FormControlLabel, Switch, Typography, IconButton
} from '@material-ui/core'
import clsx from 'clsx';
import { fetchPost, fetchGet } from '../../utils/FUtil';
import { Professional, Contact, Address } from '../../models/DBEntities';
import { ParseProfessional, ParseAddress, ParseContact } from '../../models/ParserJson';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBR from "date-fns/locale/pt-BR";
import UploadFileModal from '../../component/UploadFileModal';
import FieldValidated from '../../component/FieldValidated';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CustomizedSnackbars, { RefCustomizedSnackbars } from '../../component/CustomizedSnackbars';
import { ResponseView } from '../../models/ViewModels';

interface IBodyPerfil extends ISecurityComponet {
    match: {
        params: {
            text: string
        }
    }
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    address: {
        height: 200,
    },
    bigAvatar: {
        margin: 10,
        width: 120,
        height: 120,
    },
    field: {
        width: '100%',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}))

const fetchProfessional = async (setting: (prof: Professional) => void) => {
    const profJson = await fetchGet<string>('/api/member/getProfessional')
    setting(ParseProfessional(profJson))
}

export default function BodyPerfil(props: Readonly<IBodyPerfil>) {
    const classes = useStyles()

    useEffect(() => {
        fetchProfessional((prof: Professional): void => {
            setProfessional(prof)
            setAddress(prof.address)
            setContact(prof.contact)
        })
    }, [])

    const mRef = useRef(RefCustomizedSnackbars)

    const [professional, setProfessional] = useState<Professional>(ParseProfessional())
    const [address, setAddress] = useState<Address>(ParseAddress())
    const [contact, setContact] = useState<Contact>(ParseContact())

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        professional.address = address
        professional.contact = contact

        professional.address.postalCode = address.postalCode.replace(/\D/g, '')
        professional.contact.phone = contact.phone.replace(/\D/g, '')

        fetchPost<ResponseView>('/api/member/updateProfessional', JSON.stringify(professional))
        .then(result => {
            mRef.current.show(result)
            if(result.variant === 'success'){
                fetchProfessional((prof: Professional): void => {
                    setProfessional(prof)
                    setAddress(prof.address)
                    setContact(prof.contact)
                })
            }
        }).catch(() => {
            mRef.current.show500()
        })
    }

    const handleInputChangeProfessional = (e: ChangeEvent<HTMLInputElement>) => {
        setProfessional({
            ...professional,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleInputChangeContact = (e: ChangeEvent<HTMLInputElement>) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setProfessional({
            ...professional,
            [e.target.name]: checked
        })
    }

    const handleDateChange = (date: Date | null) => {
        professional.dateBirth = date == null ? new Date() : date
        setProfessional({ ...professional })
    };

    const handlePickImage = (img: string) => {
        professional.img = img
        setProfessional({ ...professional })
    }

    return (<>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5"> Dados Pessoais </Typography>
                    <Paper className={classes.paper}>
                        <Grid container >
                            <Grid item xs={10}>
                                <Grid container spacing={1}>
                                    <Grid item xs={2} style={{ marginTop: 16 }}>
                                        <FieldValidated className={classes.field} name="name" id="professional.name" label="Nome" value={professional.name}
                                            required invalidMessage={{ valueMissing: 'Valor não pode ser Vazio' }}
                                            onChange={handleInputChangeProfessional} autoFocus />
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: 16 }}>
                                        <FieldValidated className={classes.field} name="lastName" id="professional.lastName" label="Sobrenome" value={professional.lastName}
                                            required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                            onChange={handleInputChangeProfessional} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                name="dateBirth"
                                                id="professional.dateBirth"
                                                label="Data de Nascimento"
                                                required
                                                invalidDateMessage="Data Invalida"
                                                value={professional.dateBirth}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FieldValidated className={classes.field} name="eMail" id="contact.eMail" label="E-mail" value={contact.eMail}
                                            type="email" required
                                            invalidMessage={{
                                                valueMissing: "Valor não pode ser Vazio",
                                                typeMismatch: "Ex.: contato@email.com"
                                            }}
                                            onChange={handleInputChangeContact} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FieldValidated className={classes.field} name="phone" id="contact.phone" label="Telefone" value={contact.phone}
                                            required type="tel" inputProps={{ maxLength: "16" }}
                                            mask={["(99) 9 9999-9999", "(99) 9999-9999"]}
                                            pickMask={(value, cMask, keyCode) => {
                                                const isNumber = (keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57)
                                                const isDel = keyCode === 8 || keyCode === 46
                                                const i = value.replace(/\D/g, '')
                                                const m = cMask.replace(/\D/g, '')                                                
                                                if (i.length >= m.length && isNumber) return 0 // 11
                                                if (m.length >= 11 && isDel) return 1
                                                return m.length === 11 ? 0 : 1
                                            }}
                                            onChange={handleInputChangeContact}
                                            invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <Avatar alt="Remy Sharp" src={professional.img} className={classes.bigAvatar} />
                                <UploadFileModal onPick={handlePickImage} >
                                    <span>alterar imagem</span>
                                    <IconButton><PhotoCameraIcon /></IconButton>
                                </UploadFileModal>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <Typography component="h1" variant="h5"> Endereço </Typography>
                    <Paper className={clsx(classes.paper, classes.address)}>
                        <FormControlLabel
                            control={
                                <Switch name="isAddressShowed" id="professional.isAddressShowed"
                                    checked={professional.isAddressShowed} onChange={handleSwitchChange}
                                    value="isAddressShowed" />
                            }
                            label="Deixar o endereço publico?"
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="street" id="address.street"
                                    label="Rua" value={address.street}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={3}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="num" id="address.num"
                                    label="Numero" value={address.num}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={5}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="complement" id="address.complement"
                                    label="Complemento" value={address.complement}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            {/* ------------------------------------------ */}
                            <Grid item xs={2}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="postalCode" id="address.postalCode"
                                    inputProps={{ maxLength: "9" }}
                                    mask={["99999-999"]}
                                    label="Cep" value={address.postalCode}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={4}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="district" id="address.district"
                                    label="Bairro" value={address.district}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={3}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="city" id="address.city"
                                    label="Cidade" value={address.city}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={3}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="state" id="address.state"
                                    label="Estado" value={address.state}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container direction='row' alignItems="center" justify="flex-end">
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>Atualizar</Button>
                </Grid>
            </Grid>
        </form>
        <CustomizedSnackbars ref={mRef}/>
    </>
    )
}


