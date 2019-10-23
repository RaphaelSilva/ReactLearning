import React from 'react'
import { Product } from '../../models/Entities'
import { Typography, Divider } from '@material-ui/core'

export default function ProductHeader(props: Readonly<{ product: Product }>) {
    const product = props.product

    return (
        <div>
            <Typography variant="h3" component='h3'>{product.name}</Typography>
            <Typography variant="subtitle2">{product.description}</Typography>
            <Divider/>
            <Typography variant="subtitle1">{product.readMore}</Typography>
        </div>
    )
}
