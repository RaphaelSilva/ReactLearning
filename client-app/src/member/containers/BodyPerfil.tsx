import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { ISecurityComponet } from '../../component/SecurityComponet'
import { Grid, Paper, makeStyles, Avatar, TextField, Button, FormControlLabel, Switch } from '@material-ui/core'
import clsx from 'clsx';
import { myFetch } from '../../utils/FUtil';
import { Professional, Contact, Address } from '../../entities/IEntities';
import { ParseProfessional } from '../../entities/ParserJson';

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
    fixedHeight: {
        height: 300,
    },
    address: {
        height: 400,
    },
    contact: {
        height: 200,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}))

const fetchProfessional = async (setting: (prof: Professional) => void) => {
    const profJson = await myFetch<string>('/api/member/getProfessional')
    setting(ParseProfessional(profJson))
}

export default function BodyPerfil(props: Readonly<IBodyPerfil>) {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    useEffect(() => {
        fetchProfessional((prof: Professional): void => {
            setProfessional(prof)
            setAddress(prof.address)
            setContact(prof.contact)
        })
    }, [])

    const [professional, setProfessional] = useState({
        img: '',
        name: '',
        lastName: '',
        isAddressShowed: true
    } as Professional)

    const [address, setAddress] = useState({
        city: '', complement: '', district: '', num: '',
        state: '', street: '', zipCod: 0
    } as Address)

    const [contact, setContact] = useState({
        eMail: '',
        phone: ''
    } as Contact)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        professional.address = address
        professional.contact = contact
        console.log(professional)
        const result = await myFetch<string>('/api/member/updateProfessional', JSON.stringify(professional))
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

    return (
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <Avatar alt="Remy Sharp" src={professional.img} className={classes.bigAvatar} />
                        <TextField name="name" id="professional.name" label="Nome" value={professional.name}
                            onChange={handleInputChangeProfessional} autoFocus />
                        <TextField name="lastName" id="professional.lastName" label="Sobrenome" value={professional.lastName}
                            onChange={handleInputChangeProfessional} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper className={clsx(classes.paper, classes.contact)} >
                        <TextField name="eMail" id="contact.eMail" label="E-mail" value={contact.eMail}
                            onChange={handleInputChangeContact} />
                        <TextField name="phone" id="contact.phone" label="Telefone" value={contact.phone}
                            onChange={handleInputChangeContact} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={clsx(classes.paper, classes.address)}>
                        <FormControlLabel
                            control={
                                <Switch name="isAddressShowed" id="professional.isAddressShowed"
                                    checked={professional.isAddressShowed} onChange={handleSwitchChange}
                                    value="isAddressShowed" />
                            }
                            label="Mostrar o endereço para as pessoas?"
                        />
                        <TextField name="street" id="address.street" label="Rua" value={address.street}
                            onChange={handleInputChangeAddress} />
                        <TextField name="num" id="address.num" label="Numero" value={address.num}
                            onChange={handleInputChangeAddress} />
                        <TextField name="complement" id="address.complement" label="Complemento" value={address.complement}
                            onChange={handleInputChangeAddress} />
                        <TextField name="zipCod" id="address.zipCod" label="Cep" value={address.zipCod}
                            onChange={handleInputChangeAddress} />
                        <TextField name="district" id="address.district" label="Bairro" value={address.district}
                            onChange={handleInputChangeAddress} />
                        <TextField name="city" id="address.city" label="Cidade" value={address.city}
                            onChange={handleInputChangeAddress} />
                        <TextField name="state" id="address.state" label="Estado" value={address.state}
                            onChange={handleInputChangeAddress} />
                    </Paper>
                </Grid>
                <Grid container direction='row' alignItems="center" justify="flex-end">
                    <Button type="submit" variant="contained" color="primary">Atualizar</Button>
                </Grid>
            </Grid>
        </form>
    )
}


