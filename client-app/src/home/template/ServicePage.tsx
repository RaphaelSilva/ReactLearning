import React from 'react'
import { ProductToSale } from '../../entities/ViewEntities'
import { Grid, Paper } from '@material-ui/core'
import ProductImage from '../container/ProductImage'
import ProductHeader from '../container/ProductHeader'
import ProductImageCarousel from '../container/ProductImageCarousel'
import ProductPayment from '../container/ProductPayment'

export default function ServicePage(props: Readonly<{productToSale: ProductToSale}>) {
    return <Paper>
        <Grid container spacing={2}>
            <Grid item >
                <ProductImage product={props.productToSale.product} />
            </Grid>
            <Grid item>
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
