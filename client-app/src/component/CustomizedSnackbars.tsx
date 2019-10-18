import React, { SyntheticEvent, forwardRef, useImperativeHandle, useState } from 'react'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'
import { Snackbar, SnackbarContent, Theme, makeStyles, IconButton } from '@material-ui/core'
import { amber, green } from '@material-ui/core/colors'
import { ResponseView } from '../models/ViewModels'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

const CustomizedSnackbars = forwardRef((props: Readonly<{}>, ref) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)    
    
    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        setOpen(false)
    }
    
    const [variant, setVariant] = useState("success")
    const [message, setMessage] = useState("") 
    
    useImperativeHandle(ref, () => ({
        show(responseView: ResponseView ) { 
            setMessage(responseView.message)
            setVariant(responseView.variant)
            setOpen(true) 
        },
        show500() { 
            setMessage("Ops! Tivemos um problema técnico!")
            setVariant('error')
            setOpen(true) 
        }
    }))
    
    const Icon = variantIcon[variant as keyof typeof variantIcon];
    return (
        <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        >
            <SnackbarContent
                className={clsx(classes[variant as keyof typeof variantIcon], classes.margin)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                />
        </Snackbar>
    )
})

export const RefCustomizedSnackbars = { 
    show: (responseView: ResponseView) => {},
    show500: () => {}
 }
export default CustomizedSnackbars