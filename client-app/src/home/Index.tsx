import React from 'react'

interface IndexResult {
    match: {
        params: {
            productTag: string
        }
    }
}

export default function Index() {


    return (
        <div>
            <h1>Ola Mundo</h1>
            <a href="/member">Area do Membro</a>
        </div>
    )
}
