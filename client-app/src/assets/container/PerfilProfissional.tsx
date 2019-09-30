import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';

export default class PerfilProfissional extends Component {
    render() {
        return (
            <Paper>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase >
                            <img alt="complex" src="/images/perfil-de-avatar.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="subtitle1">
                                    Maria dos Santos
                                </Typography>
                                <Typography variant="body1">
                                    <p>Uma breve apresentação de quem realmente é a Maria dos santos</p>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button>
                                    Comprar
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
