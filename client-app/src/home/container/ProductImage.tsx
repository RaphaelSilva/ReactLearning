import React from 'react'
import { Product } from '../../entities/DBEntities'

export default function ProductImage(props: Readonly<{ product: Product }>) {
    return (
        <h1>{props.product.name}</h1>
    )
}
