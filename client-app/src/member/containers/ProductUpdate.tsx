import React, { ChangeEvent, useState, FormEvent, useEffect, ReactNode } from 'react'
import { Product, ProductType } from '../../models/Entities'
import { Paper, Grid, Avatar, IconButton, makeStyles, CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'
import { fetchPost, fetchGet } from '../../utils/FUtil'
import UploadFileModal from '../../component/UploadFileModal'
import Camera from '@material-ui/icons/Camera'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import FieldValidated from '../../component/FieldValidated'
import { ResponseView } from '../../models/ViewModels'
import PaymentUpdate from './PaymentUpdate'
import ProductInfoUpdate from './ProductInfoUpdate'

interface IProductUpdate {
    product: Product
    onUpdate: (result: ResponseView & { product?: Product } | null) => void
    onCancel: () => void
}

const useStyles = makeStyles(theme => ({
    root:{
        maxWidth: '1500px',
        overflowX: 'auto',
    },
    paper: {
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
    gridItem: {
        padding: theme.spacing(2),
    },
}))

export default function ProductUpdate(props: Readonly<IProductUpdate>) {
    const classes = useStyles()
    const [product, setProduct] = useState(props.product)
    const [productTypeList, setProductTypeList] = useState([] as Array<ProductType>)

    useEffect(() => {
        fetchGet<Array<ProductType>>('/api/product/listTypes')
            .then((productTypes) => {
                setProductTypeList(productTypes)
            })
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>, child: ReactNode, ) => {
        product.productTypeId = parseInt(event.target.value)
        setProduct({ ...product })
    }

    const handlePickImage = (img: string) => {
        product.img = img
        setProduct({ ...product })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchPost<ResponseView & { product?: Product }>('/api/product/save',
            JSON.stringify(product)).then((result) => {
                props.onUpdate(result)
            }).catch(() => props.onUpdate(null))
    }

    const valideTagLink = async (value: string) => {
        return await fetchGet<ResponseView>(`/api/product/valideteTagLink/${value}/${product.id}`).then((result) => {
            return result
        })
    }

    // xs, extra-small: 0px
    // sm, small: 600px
    // md, medium: 960px()
    // lg, large: 1280px
    // xl, extra-large: 1920px
    return (<div className={classes.root} id="temp-raphael">
        <CssBaseline />
        <form className={classes.form} onSubmit={handleSubmit}>
            <Paper style={{ height: '80vh' }} className={classes.paper}>
                <Grid container >
                    <Grid item className={classes.gridItem} md={1} sm={3} xs={12}>
                        <FieldValidated className={classes.field}
                            name="code" id="product.code" required={true}
                            label="Codigo" value={product.code}
                            onChange={handleInputChange} autoFocus
                            inputProps={{ maxLength: "35" }}
                            title="Preencha o campo Codigo" />
                    </Grid>
                    <Grid item className={classes.gridItem} md={3} sm={5} xs={12}>
                        <FieldValidated className={classes.field}
                            name="name" id="product.name" required={true}
                            label="Name" value={product.name}
                            onChange={handleInputChange}
                            inputProps={{ maxLength: "50" }}
                            title="Preencha o campo Name" />
                    </Grid>
                    <Grid item className={classes.gridItem} md={2} sm={4} xs={12}>
                        <FieldValidated className={classes.field}
                            name="tagLink" id="product.tagLink" required={true}
                            label="Link" value={product.tagLink}
                            inputProps={{ maxLength: "64" }}
                            onChange={handleInputChange}
                            getValideted={valideTagLink}
                        />
                    </Grid>
                    <Grid item className={classes.gridItem} md={6} sm={12} xs={12}>
                        <FieldValidated className={classes.field}
                            name="description" id="product.description" required={true}
                            label="Descrição" value={product.description}
                            inputProps={{ maxLength: "120" }}
                            onChange={handleInputChange} />
                    </Grid>
                    <Grid container >
                        <Grid item className={classes.gridItem} md={2} sm={3} xs={12}>
                            <Avatar alt="Remy Sharp" src={product.img} className={classes.bigAvatar} />
                            <UploadFileModal onPick={handlePickImage} >
                                <IconButton color="default" aria-label="directions">
                                    <Camera />
                                </IconButton>
                            </UploadFileModal>
                        </Grid>
                        <Grid item className={classes.gridItem} md={2} sm={3} xs={12}>
                            <FieldValidated className={classes.field}
                                name="productTypeId" id="product.productTypeId" required={true}
                                label="Tipo de Produto" value={product.productTypeId}
                                onChangeSelect={handleChangeSelect} select
                                invalidMessage={{ valueMissing: "Selecione o tipo de produto" }}
                                assert={(el) => el.target.value ? el.target.value.length > 0 : false}>
                                <option value="" />
                                {productTypeList.map((pType, index) =>
                                    (<option value={pType.id} key={index} >{pType.name}</option>))}
                            </FieldValidated>
                        </Grid>
                        <Grid item className={classes.gridItem} md={8} sm={12} xs={12}>
                            <FieldValidated className={classes.field}
                                name="readMore" id="product.readMore" required={true}
                                label="Informação extra" value={product.readMore}
                                multiline rowsMax="15"
                                onChange={handleInputChange} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <ProductInfoUpdate productId={product.id} ref={(productInfos) => {
                            if (productInfos) {
                                product.productInfos = productInfos
                                setProduct(product)
                            }
                        }} />
                    </Grid>
                    <Grid item xs={12} >
                        <PaymentUpdate productId={product.id} ref={(payments) => {
                            if (payments) {
                                product.payments = payments
                                setProduct(product)
                            }
                        }} />
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
    </div>)
}
