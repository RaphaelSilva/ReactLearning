import React, { useEffect, useState, forwardRef, useImperativeHandle, Ref, ChangeEvent } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import { ProductInfo } from '../../models/Entities';
import { fetchGet } from '../../utils/FUtil';
import UploadFileModal from '../../component/UploadFileModal';
import { ParseProductInfo } from '../../models/ParserJson';
import { Grid, TextField, Button, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        divider: {
            height: 28,
            margin: 4,
        },
        textField: {
            width: '100%',
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            paddingRight: theme.spacing(1)
        }
    }),
);

interface ProductInfoProps {
    productId: number | undefined
}

const fetchProductInfo = (productId: number): Promise<Array<ProductInfo>> => {
    return fetchGet<Array<ProductInfo>>(`/api/product/listProductInfo/${productId}`)
}
const ProductInfoUpdate = forwardRef((props: Readonly<ProductInfoProps>, ref: Ref<Array<ProductInfo>>) => {
    const classes = useStyles();
    const [productInfos, setProductInfos] = useState<Array<ProductInfo>>(new Array<ProductInfo>())
    const [productInfo, setProductInfo] = useState<ProductInfo>(ParseProductInfo())
    const [addProductInfoShow, setAddProductInfoShow] = useState(false)

    useEffect(() => {
        if (props.productId) fetchProductInfo(props.productId)
            .then(list => setProductInfos(list))
    }, [props.productId])

    const handlePickImage = (img: string) => {
        productInfo.img = img;
        setProductInfo(productInfo)
        setAddProductInfoShow(true)
    }

    const handleAddButtonProductInfo = () => {
        productInfos.push(productInfo)
        setProductInfos(productInfos)
        setAddProductInfoShow(false)
        setProductInfo(ParseProductInfo())
    }
    const handleOnChangeNewProduct = (e: ChangeEvent<HTMLInputElement>) => {
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }

    const removeProductInfo = (i: number) => {
        setProductInfos(productInfos.filter((_value, index) => {
            return index !== i
        }))
    }

    const renderNewProductInfo = () => {
        return (
            <Grid container direction="row">
                <Grid item xs={12} sm={5}>
                    <img className={classes.img} src={productInfo.img} alt={productInfo.description} />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Grid container direction="row" justify="flex-start" alignItems="center">
                        <Grid item xs={12}>
                            <TextField inputProps={{ maxLength: 50 }} className={classes.textField}
                                value={productInfo.title} name="title" label="Titulo"
                                id="productInfo.title" onChange={handleOnChangeNewProduct} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField inputProps={{ maxLength: 50 }} className={classes.textField}
                                value={productInfo.description} name="description" label="Descrição"
                                id="productInfo.description" onChange={handleOnChangeNewProduct} />
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" justify="flex-end" alignItems="center">
                        <Divider orientation='vertical' className={classes.divider} />
                        <Button onClick={() => handleAddButtonProductInfo()}>Adicionar</Button>
                        <Divider orientation='vertical' className={classes.divider} />
                        <Button onClick={() => {
                            setAddProductInfoShow(false)
                            setProductInfo(ParseProductInfo())
                        }}>Cancelar</Button>
                        <Divider orientation='vertical' className={classes.divider} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const renderButtonAddNewProductInfo = () => {
        return (
            <UploadFileModal onPick={handlePickImage} >
                <IconButton color="primary">
                    <Add />
                    <Typography>
                        Informação
                        </Typography>
                </IconButton>
            </UploadFileModal>
        )
    }

    useImperativeHandle<Array<ProductInfo>, Array<ProductInfo>>(ref, () => productInfos, [productInfos])
    return (
        <div className={classes.root}>
            <Divider />
            <Grid container>
                <Grid item xs={12}>
                    {addProductInfoShow ? renderNewProductInfo() : renderButtonAddNewProductInfo()}
                </Grid>
                <Grid item xs={12}>
                    <GridList cellHeight={180} className={classes.gridList} cols={2.5}>
                        {productInfos.map((item, index) => (
                            <GridListTile key={index}>
                                <img src={item.img} alt={item.description} />
                                <GridListTileBar
                                    title={item.title}
                                    subtitle={<span>by: {item.description}</span>}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.description}`}
                                            className={classes.icon}
                                            onClick={() => { removeProductInfo(index) }}>
                                            <Delete />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </div>
    )
})

export default ProductInfoUpdate
