import React, { FormEvent, useState, useEffect } from 'react';

import {
    Avatar, Button, CssBaseline, TextField, FormControlLabel,
    Checkbox, Link, Grid, Typography, Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import UserAuth from '../utils/UserAuth';
import { RouteProps } from 'react-router';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function MemberLogin(props: Readonly<RouteProps>) {
    const classes = useStyles()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        fetch("/api/doLogin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    userName: data.get('userName'),
                    password: data.get('password'),
                }
            })
        }).then((response: Response) => {
            response.json().then((data) => {
                if (response.status === 200) {
                    const rUserAuth = UserAuth.clone(JSON.parse(data))
                    setUser(rUserAuth)
                } else {
                    alert(data.mensage)
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    const [user, setUser] = useState(new UserAuth())
    useEffect(() => {
        user.route && user.isAuthenticated ? fetch(user.route, { method: 'POST' })
            .then((response: Response) => {
                response.json().then((data) => {
                    UserAuth.setInst(data)
                    window.location.href = '/member'
                }).catch((err) => {
                    console.log(err)
                })
            }) : console.log('User not allowed')
    }, [user])

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}> <LockOutlinedIcon /> </Avatar>
            <Typography component="h1" variant="h5"> Logar </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Usuario"
                    name="userName"
                    autoComplete="userName"
                    autoFocus />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password" />
                <FormControlLabel
                    control={<Checkbox value="remember" name="lembr" color="primary" />}
                    label="Lembrar login" />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}> Entrar</Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">Esqueceu a senha?</Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">{"Ainda não tem uma conta?"}</Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>)

}
