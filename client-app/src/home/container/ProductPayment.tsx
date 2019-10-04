import React from 'react'

export default function ProductPayment(props: Readonly<{productId: number}>) {
    return (
        <div>
            {props.productId}
        </div>
    )
}
