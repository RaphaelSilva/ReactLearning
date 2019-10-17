import React, { ChangeEvent, useState, FormEvent } from 'react'
import { Product } from '../../models/DBEntities'
import { Paper, Grid, Avatar, IconButton, makeStyles, CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'
import { fetchPost } from '../../utils/FUtil'
import UploadFileModal from '../../component/UploadFileModal'
import Camera from '@material-ui/icons/Camera'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FieldValidated from '../../component/FieldValidated'
import { ResponseView } from '../../models/ViewModels'

interface IProductUpdate {
    product: Product
    onUpdate: (result: ResponseView & { product?: Product } | null) => void
    onCancel: () => void
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(JSON.stringify(product))
        fetchPost<ResponseView & { product?: Product }>('/api/product/save',
            JSON.stringify(product)).then((result) => {
                console.log(result)
                props.onUpdate(result)
            }).catch(() => props.onUpdate(null))
    }

    return (<>
        <CssBaseline />
        <form className={classes.form} onSubmit={handleSubmit}>
            <Paper style={{ height: '80vh' }} className={classes.paper}>
                <Grid container >
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="code" id="product.code" required={true}
                            label="Codigo" value={product.code}
                            onChange={handleInputChange} autoFocus
                            inputProps={{ maxLength: "35" }}
                            title="Preencha o campo Codigo" />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="name" id="product.name" required={true}
                            label="Name" value={product.name}
                            onChange={handleInputChange}
                            inputProps={{ maxLength: "50" }}
                            title="Preencha o campo Name" />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="description" id="product.description" required={true}
                            label="Descrição" value={product.description}
                            inputProps={{ maxLength: "120" }}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="readMore" id="product.readMore" required={true}
                            label="Informação extra" value={product.readMore}
                            multiline rowsMax="5"
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="tagLink" id="product.tagLink" required={true}
                            label="Link" value={product.tagLink}
                            inputProps={{ maxLength: "64" }}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FieldValidated className={classes.field}
                            name="productTypeId" id="product.productTypeId" required={true}
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
                </Grid>
            </Paper>
            <AppBar position="sticky" color="primary" className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" type="submit">
                        <Typography style={{ padding: 5 }}>
                            Salvar
                        </Typography>
                        <SaveIcon />
                    </IconButton>
                    <div className={classes.grow} />
                    <IconButton color="inherit" edge="end" onClick={() => props.onCancel()}>
                        <Typography style={{ padding: 5 }}>
                            Cancelar
                        </Typography>
                        <CancelIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </form>
    </>)
}
