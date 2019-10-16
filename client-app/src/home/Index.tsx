import React, { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { Input } from '@material-ui/core'
import { InputProps } from '@material-ui/core/Input';

interface IndexResult {
    match: {
        params: {
            productTag: string
        }
    }
}

// Will work fine
function MInput(props: { value: string | number | string[] | undefined; onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined; }) {
    return (
        <ReactInputMask mask="99/99/9999" value={props.value} onChange={props.onChange}>
            {(inputProps:InputProps) => <Input {...inputProps} />}            
        </ReactInputMask>
    );
}

export default function Index() {

    const [valor, setValor] = useState("05101988")

    return (
        <div>
            <h1>Ola Mundo</h1>
            <a href="/member">Area do Membro</a>
            <br></br>
            <MInput value={valor} onChange={e => setValor(e.target.value)} />

        </div>
    )
}
