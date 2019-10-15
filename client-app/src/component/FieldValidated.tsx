import React, { ChangeEvent, useState, FormEvent, FocusEvent } from 'react'

import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

type ValidityMensagens = {
    badInput?: string
    customError?: string
    patternMismatch?: string
    rangeOverflow?: string
    rangeUnderflow?: string
    stepMismatch?: string
    tooLong?: string
    tooShort?: string
    typeMismatch?: string
    valueMissing: string
}

type FieldValidatedProps = {
    className: string
    id: string
    label: string
    name: string
    title?: string
    rowsMax?: string
    invalidMessage?: ValidityMensagens
    type?: string;
    value: any
    autoFocus?: boolean
    required?: boolean
    multiline?: boolean
    inputProps?: InputBaseComponentProps
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    assert?: (el: HTMLInputElement | HTMLTextAreaElement) => boolean
}

export default function FieldValidated(props: Readonly<FieldValidatedProps>) {
    const describedby = props.name + props.id

    const [fcError, setFcError] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState(props.invalidMessage ? props.invalidMessage.valueMissing : '')

    // const [, setValidityState] = useState<ValidityState>({
    //     badInput: false, customError: false, patternMismatch: false,
    //     rangeOverflow: false, rangeUnderflow: false, stepMismatch: false, tooLong: false,
    //     tooShort: false, typeMismatch: false, valid: false, valueMissing: false,
    // })

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (props.assert) setFcError(!props.assert(e.target))
        else {
            doValidation(e.target)
        }
    }

    const handleInvalid = (e: FormEvent) => {
        if (props.assert) setFcError(!props.assert(e.target as HTMLInputElement | HTMLTextAreaElement))
        else {
            doValidation(e.target as HTMLInputElement | HTMLTextAreaElement)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e)
    }

    const doValidation = (el: HTMLInputElement | HTMLTextAreaElement) => {
        if (el.validity.badInput && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.badInput ? props.invalidMessage.badInput : 'badInput')
        }
        if (el.validity.customError && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.customError ? props.invalidMessage.customError : 'customError')
        }
        if (el.validity.patternMismatch && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.patternMismatch ? props.invalidMessage.patternMismatch : 'patternMismatch')
        }
        if (el.validity.rangeOverflow && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.rangeOverflow ? props.invalidMessage.rangeOverflow : 'rangeOverflow')
        }
        if (el.validity.rangeUnderflow && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.rangeUnderflow ? props.invalidMessage.rangeUnderflow : 'rangeUnderflow')
        }
        if (el.validity.stepMismatch && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.stepMismatch ? props.invalidMessage.stepMismatch : 'stepMismatch')
        }
        if (el.validity.tooLong && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.tooLong ? props.invalidMessage.tooLong : 'tooLong')
        }
        if (el.validity.tooShort && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.tooShort ? props.invalidMessage.tooShort : 'tooShort')
        }
        if (el.validity.typeMismatch && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.typeMismatch ? props.invalidMessage.typeMismatch : 'typeMismatch')
        }
        if (el.validity.valueMissing && props.invalidMessage) {
            setInvalidMessage(props.invalidMessage.valueMissing ? props.invalidMessage.valueMissing : 'valueMissing')
        }

        setFcError(!el.validity.valid)
    }

    return (
        <FormControl className={props.className} error={fcError} >
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <Input id={props.id} name={props.name} value={props.value}
                inputProps={props.inputProps}
                aria-describedby={describedby}
                onChange={handleChange}
                autoFocus={props.autoFocus}
                required={props.required}
                onInvalid={handleInvalid}
                multiline={props.multiline}
                rowsMax={props.rowsMax}
                type={props.type}
                onBlur={handleBlur} />
            {fcError ? (<FormHelperText id={describedby}>{invalidMessage}</FormHelperText>) : ''}
        </FormControl>
    )

}
