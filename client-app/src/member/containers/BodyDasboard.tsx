import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core'
import Chart from './exemplo/Chart'
import Deposits from './exemplo/Deposits'
import Orders from './exemplo/Orders'
import clsx from 'clsx'
import { ISecurityComponet } from '../../component/SecurityComponet'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }
}))

interface IBodyDasboard extends ISecurityComponet {
    match: {
        params: {
            text: string
        }
    }
}

export default function BodyDasboard(props: Readonly<IBodyDasboard>) {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

    console.log('MainDascoard location => ' + props.location)

    return <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
                <Chart />
            </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
                <Deposits />
            </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Orders />
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <h1>{props.match.params.text}</h1>
            </Paper>
        </Grid>
    </Grid>

}
