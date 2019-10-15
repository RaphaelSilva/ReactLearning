import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { ISecurityComponet } from '../../component/SecurityComponet'
import {
    Grid, Paper, makeStyles, Avatar, Button,
    FormControlLabel, Switch, Typography
} from '@material-ui/core'
import clsx from 'clsx';
import { fetchPost, fetchGet } from '../../utils/FUtil';
import { Professional, Contact, Address } from '../../models/DBEntities';
import { ParseProfessional } from '../../models/ParserJson';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBR from "date-fns/locale/pt-BR";
import UploadFileModal from '../../component/UploadFileModal';
import FieldValidated from '../../component/FieldValidated';

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
    professional: {
        height: 250,
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

    const [professional, setProfessional] = useState<Professional>(ParseProfessional())
    const [address, setAddress] = useState<Address>({
        city: '', complement: '', district: '', num: '',
        state: '', street: '', postalCode: ''
    })

    const [contact, setContact] = useState<Contact>({
        eMail: '',
        phone: ''
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        professional.address = address
        professional.contact = contact
        console.log(professional)
        const result = await fetchPost<string>('/api/member/updateProfessional', JSON.stringify(professional))
        console.log(result)
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

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <Typography component="h1" variant="h5"> Dados do profissional </Typography>
                    <Paper className={clsx(classes.paper, classes.professional)}>
                        <Grid container spacing={1}>
                            <Grid item xs={2} style={{ marginTop: 15 }}>
                                <FieldValidated className={classes.field} name="name" id="professional.name" label="Nome" value={professional.name}
                                    required invalidMessage={{ valueMissing: 'Valor não pode ser Vazio' }}
                                    onChange={handleInputChangeProfessional} autoFocus />
                            </Grid>
                            <Grid item xs={5} style={{ marginTop: 15 }}>
                                <FieldValidated className={classes.field} name="lastName" id="professional.lastName" label="Sobrenome" value={professional.lastName}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    onChange={handleInputChangeProfessional} />
                            </Grid>
                            <Grid item xs={5}>
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
                            <Grid item xs={8}>
                                <FieldValidated className={classes.field} name="phone" id="contact.phone" label="Telefone" value={contact.phone}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    onChange={handleInputChangeContact} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Typography component="h1" variant="h5"> Imagem </Typography>
                    <Paper className={clsx(classes.paper, classes.professional)} >
                        <UploadFileModal onPick={handlePickImage} >
                            <p>Click para alterar a imagem</p>
                            <Avatar alt="Remy Sharp" src={professional.img} className={classes.bigAvatar} />
                        </UploadFileModal>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
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
                            <Grid item xs={1}>
                                <FieldValidated className={classes.field}
                                    required invalidMessage={{ valueMissing: "Valor não pode ser Vazio" }}
                                    name="postalCode" id="address.postalCode"
                                    label="Cep" value={address.postalCode}
                                    onChange={handleInputChangeAddress} />
                            </Grid>
                            <Grid item xs={3}>
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
    )
}


