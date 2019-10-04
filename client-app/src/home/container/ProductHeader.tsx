import React from 'react'
import { Product } from '../../entities/DBEntities'

export default function ProductHeader(props: Readonly<{ product: Product }>) {
    return (
        <div>
            {props.product.name}
        </div>
    )
}
