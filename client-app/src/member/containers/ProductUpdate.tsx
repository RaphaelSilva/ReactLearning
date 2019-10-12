import React from 'react'
import { Product } from '../../models/DBEntities'

interface IProductUpdate {
product?: Product
onUpdate: (product: Product) => void
}

export default function ProductUpdate(props: Readonly<IProductUpdate>) {
    return (
        <div>
            {props.product ? props.product.name : <h1>Produto Null</h1>}
        </div>
    )
}
