import React, { ReactNode, useState } from 'react'
import { Modal, Fade, makeStyles, createStyles, Theme, Backdrop, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import UploadFile from './UploadFile'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',            
        },
        root: {
            flexGrow: 0.5,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            height: '80vh',
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
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UploadFileModal(props: Readonly<OnChange>) {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const [value, setValue] = React.useState(0)
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <div onClick={handleOpen}>
                {props.children}
            </div>
            <Modal
                // aria-labelledby="transition-modal-title"
                // aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.root}>
                        <AppBar position="relative">
                            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
                                <Tab value={0} label="Upload de Imagens" wrapped  {...a11yProps(0)}/>
                                <Tab value={1} label="Todas as Imagens" {...a11yProps(1)}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <UploadFile onChange={props.onChange} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Todas as Imagens
                        </TabPanel>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}
