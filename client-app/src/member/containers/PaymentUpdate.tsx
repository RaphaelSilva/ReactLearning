import React, { useEffect, useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';

import { Payment } from '../../models/Entities'
import { fetchGet } from '../../utils/FUtil'
import { IconButton, Button, TextField, Divider } from '@material-ui/core';
import Mask from '../../utils/Mask';
import VMasker from 'vanilla-masker';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            width: '100%',
        },
        newPaymentInput: {
            width: '100%',
        },
        paper: {
            marginTop: theme.spacing(3),
            width: '100%',
            overflowX: 'auto',
            marginBottom: theme.spacing(2),
        },
        divAcation: {
            display: 'flex',
            flexWrap: "nowrap",
            alignItems: 'center', //centraliza horizontalmente
            justifyContent: 'center' //cetraliza verticalmente (space-between)
        },
        divider: {
            height: 28,
            margin: 4,
        },
        table: {
            minWidth: 650,
        },
    }),
);

interface PaymentUpdateProps {
    productId: number | undefined
}

const fetchPayment = (productId: string): Promise<Array<Payment>> => {
    return fetchGet<Array<Payment>>(`/api/product/listPaymentsOf/${productId}`)
}

export interface RefPaymentUpdate {
    payments: Array<Payment>
    getPayments: () => Array<Payment>
}

const PaymentUpdate = forwardRef((props: Readonly<PaymentUpdateProps>, ref: Ref<Array<Payment>>) => {
    const classes = useStyles();
    const [focusAdd, setFocusAdd] = useState(false)
    const [insertPayment, setInsertPayment] = useState(false)
    const [payments, setPayments] = useState(new Array<Payment>())
    useEffect(() => {
        if (props.productId) fetchPayment(`${props.productId}`)
            .then(listPayment => {
                setPayments(listPayment)
            })
    }, [props.productId])

    const addNewPayment = () => {
        const name = (document.getElementById('payment.name') as HTMLInputElement).value
        const description = (document.getElementById('payment.description') as HTMLInputElement).value
        const value = (document.getElementById('payment.value') as HTMLInputElement).value

        if (name && description && value) {
            payments.push({
                id: 0,
                name: name,
                description: description,
                value: parseFloat(VMasker.toNumber(value)),
                img: '',
                productId: props.productId || 0
            })
            setPayments(payments)
            setInsertPayment(false)
            setFocusAdd(true)
        }
    }

    const removePayment = (payment: Payment, idx: number) => {
        const paymentsFiltered = payments.filter((value, index, arr) => {
            return index !== idx
        })
        setPayments(paymentsFiltered)
    }

    const rennderNewPayment = (show: boolean) => {
        if (show) return (
            <TableRow key="newPayment">
                <TableCell component="th" scope="row">
                    <TextField className={classes.newPaymentInput} autoFocus name="name" id="payment.name" inputProps={{maxLength: 50}}/>
                </TableCell>
                <TableCell align="right"><TextField className={classes.newPaymentInput} inputProps={{maxLength: 80}}
                    name="description" id="payment.description" /></TableCell>
                <TableCell align="right"><TextField className={classes.newPaymentInput} 
                    name="value" id="payment.value" ref={(input: HTMLInputElement) => {
                        if (input) {
                            Mask.setMaskMoney<HTMLInputElement>(input.getElementsByTagName('input')[0])
                        }
                    }} /></TableCell>
                <TableCell align="right"><Button onClick={addNewPayment}>Incluir</Button><Button onClick={() => {
                    setInsertPayment(false)
                    setFocusAdd(true)
                }}>cancelar</Button></TableCell>
            </TableRow >
        )
    }

useImperativeHandle<Array<Payment>, Array<Payment>>(ref, () => payments, [payments])

return (
    <div className={classes.root}>
        <Divider/>
        <Paper className={classes.paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Meio&nbsp;de&nbsp;Pagamento</TableCell>
                        <TableCell >Descrição</TableCell>
                        <TableCell align="right">Valor&nbsp;<strong>(R$)</strong></TableCell>
                        <TableCell align="right">
                            <div className={classes.divAcation}>
                                <strong>Ação&nbsp;&nbsp;&nbsp;</strong>
                                <Divider className={classes.divider} orientation='vertical' />
                                <IconButton color="primary" ref={(el) => {
                                    if (el && focusAdd) {
                                        (el as HTMLButtonElement).focus()
                                        setFocusAdd(false)
                                    }
                                }}
                                    aria-label="directions"
                                    onClick={() => setInsertPayment(true)}>
                                    <Add />
                                </IconButton>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rennderNewPayment(insertPayment)}
                    {payments.map((payment, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{payment.name}</TableCell>
                            <TableCell>{payment.description}</TableCell>
                            <TableCell align="right">{VMasker.toMoney(payment.value)}</TableCell>
                            <TableCell align="right"><Button onClick={() => removePayment(payment, index)}>Excluir</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    </div >
)
})

export default PaymentUpdate