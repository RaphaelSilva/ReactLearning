import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { Professional } from '../../models/DBEntities';

interface PerfilProfissionalI {
    professional: Professional
}

export default function PerfilProfissional(props: Readonly<PerfilProfissionalI>) {
    return (
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
                                Nome=> {props.professional.name}
                                </Typography>
                            <Typography component='p' variant="body1">
                                Uma breve apresentação de quem realmente é a Maria dos santos
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
    )

}
