import React, { useState, ReactNode, forwardRef, useImperativeHandle } from 'react'
import {
    Fade, Modal, createStyles, makeStyles, Backdrop,
    Typography, Box, AppBar, Tab, Tabs, IconButton, Grid, Container
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'

interface IMyModal {
    renderItens: Array<ReactNode>
    labelTabs: Array<string>
    defaultTab: number
}

const useStyles = makeStyles(theme =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        root: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
        },
        toolbar: {
            padding: 2,
        },

    }),
)

interface OnChange {
    onChange: (img: string) => void
    children?: ReactNode
}

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const MyModal = forwardRef((props: Readonly<IMyModal>, ref) => {
    const classes = useStyles()
    const defaultTab = props.defaultTab ? props.defaultTab : 0

    const [value, setValue] = React.useState(defaultTab)
    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    useImperativeHandle(ref, () => ({
        open() { setOpen(true) },
        close() { handleClose() }
    }))

    return (
        <Modal
            aria-labelledby="my-modal-title"
            aria-describedby="my-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}>
            <Fade in={open}>
                <Container fixed>
                    <div className={classes.root}>
                        <AppBar position="relative">
                            <Grid container alignItems="center">
                                <Grid item xs={11}>
                                    <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                                        {props.labelTabs.map((label, idx) => {
                                            const w = idx === defaultTab
                                            return (
                                                <Tab key={idx} value={idx} label={label} {...a11yProps(idx)} wrapped={w} />
                                            )
                                        })}
                                    </Tabs>
                                </Grid>
                                <Grid item xs={1} container direction="row" justify="flex-end" alignItems="center">
                                    <IconButton onClick={handleClose} size="medium">
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </AppBar>
                        {props.renderItens.map((itemTab, idx) => {
                            return (
                                <TabPanel key={idx} value={value} index={idx}>
                                    {itemTab}
                                </TabPanel>
                            )
                        })}
                    </div>
                </Container>
            </Fade>
        </Modal>
    )
})

export const RefMyModal = { open: Function, close: Function }
export default MyModal