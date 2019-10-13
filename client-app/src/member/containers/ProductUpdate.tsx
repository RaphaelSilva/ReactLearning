import React, { ChangeEvent, useState, FormEvent } from 'react'
import { Product } from '../../models/DBEntities'
import { Paper, Grid, TextField, Avatar, IconButton, makeStyles, CssBaseline, AppBar, Toolbar, Fab } from '@material-ui/core'
import { fetchPost } from '../../utils/FUtil'
import UploadFileModal from '../../component/UploadFileModal'
import Camera from '@material-ui/icons/Camera'
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

interface IProductUpdate {
    product: Product
    onUpdate: (product: Product) => void
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
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
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}))

export default function ProductUpdate(props: Readonly<IProductUpdate>) {
    const classes = useStyles()
    const [product, setProduct] = useState(props.product)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handlePickImage = (img: string) => {
        product.img = img
        setProduct({ ...product })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await fetchPost<string>('/api/product/save', JSON.stringify(product))
        console.log(result)

    }


    return (<>
        <CssBaseline />
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Paper style={{height: '80vh'}}>
                <Grid container >
                    <Grid item xs={12}>
                        <TextField className={classes.field}
                            name="name" id="product.name"
                            label="Name" value={product.name}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.field}
                            name="description" id="product.description"
                            label="Descrição" value={product.description}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.field}
                            name="readMore" id="product.readMore"
                            multiline rowsMax="5"
                            label="Informação extra" value={product.readMore}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.field}
                            name="tagLink" id="product.tagLink"
                            label="Link" value={product.tagLink}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.field}
                            name="productTypeId" id="product.productTypeId"
                            label="Descrição" value={product.productTypeId}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Avatar alt="Remy Sharp" src={product.img} className={classes.bigAvatar} />
                        <UploadFileModal onPick={handlePickImage} >
                            <IconButton color="default" aria-label="directions">
                                <Camera />
                            </IconButton>
                        </UploadFileModal>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Salvar</h1>
                    </Grid>
                </Grid>            
            </Paper>
            <AppBar position="sticky" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                        <AddIcon />
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </form>
    </>)
}
