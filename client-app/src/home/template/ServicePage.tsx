import React from 'react'
import { ProductToSale } from '../../entities/ViewEntities'
import { Grid, Paper } from '@material-ui/core'
import ProductHeader from '../container/ProductHeader'
import ProductImageCarousel from '../container/ProductImageCarousel'
import ProductPayment from '../container/ProductPayment'

export default function ServicePage(props: Readonly<{productToSale: ProductToSale}>) {
    const product = props.productToSale.product
    return <Paper>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <img src={product.img} alt={product.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={9}>
                <ProductHeader product={props.productToSale.product}/>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <ProductImageCarousel productId={props.productToSale.product.id || 0}/>
        </Grid>
        <Grid container spacing={2}>
            <ProductPayment productId={props.productToSale.product.id || 0}/>
        </Grid>
    </Paper>

}
