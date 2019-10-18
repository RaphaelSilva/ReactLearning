import React, { ChangeEvent, useState, FormEvent, FocusEvent, ReactNode } from 'react'
import { FormControl, InputLabel, FormHelperText, NativeSelect } from '@material-ui/core'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'
import Input, { InputProps } from '@material-ui/core/Input'
import InputMask from 'react-input-mask'
import { ResponseView } from '../models/ViewModels'

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
    children?: ReactNode
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
    mask?: Array<string>
    select?: boolean
    onChangeSelect?: (
        event: ChangeEvent<HTMLSelectElement>,
        child: ReactNode,
    ) => void
    pickMask?: (value: string, currentMask: string, keyCode: number) => number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    assert?: (el: any) => boolean
    getValideted?: (value: string) => Promise<ResponseView>
}

export default function FieldValidated(props: Readonly<FieldValidatedProps>) {
    const describedby = props.name + props.id
    const [fcError, setFcError] = useState(false)
    const [invalidMessage, setInvalidMessage] = useState(props.invalidMessage ? props.invalidMessage.valueMissing : '')

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (props.getValideted) props.getValideted(e.target.value)
            .then((responseView) => { 
                if(responseView.variant === 'warning'){
                    setInvalidMessage(responseView.message)
                    setFcError(true)
                }
            })
        if (props.assert) setFcError(!props.assert(e))
        else {
            doValidation(e.target)
        }
    }

    const handleInvalid = (e: FormEvent) => {
        if (props.assert) setFcError(!props.assert(e))
        else {
            doValidation(e.target as HTMLInputElement | HTMLTextAreaElement)
        }
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

    const [numMask, setNumMask] = useState(0)
    const changeMask = (i: number): void => {
        if (props.pickMask && props.mask && props.value.length > 0) {
            setNumMask(props.pickMask(props.value, props.mask[numMask], i))
        }
    }

    return (
        <FormControl className={props.className} error={fcError} >
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            {props.mask ?
                (
                    <InputMask mask={props.mask[numMask]}
                        id={props.id} name={props.name} value={props.value}
                        autoFocus={props.autoFocus}
                        onChange={props.onChange}
                        onKeyDown={e => {
                            changeMask(e.keyCode)
                        }}
                        required={props.required}
                        onInvalid={handleInvalid}
                        onBlur={(e) => handleBlur(e as FocusEvent<HTMLInputElement | HTMLTextAreaElement>)}
                    >
                        {(inputProps: InputProps) => <Input
                            {...inputProps}
                            type={props.type}
                        />}
                    </InputMask>
                )
                : props.select ?
                    (
                        <NativeSelect
                            value={props.value}
                            autoFocus={props.autoFocus}
                            onChange={props.onChangeSelect}
                            onInvalid={handleInvalid}
                            onBlur={handleBlur}
                            required={props.required}
                            inputProps={{
                                name: props.name,
                                id: props.id,
                            }}
                            input={<Input
                                aria-describedby={describedby}
                            />}
                        >
                            {props.children}
                        </NativeSelect>
                    )
                    :
                    (
                        <Input
                            id={props.id} name={props.name} value={props.value}
                            inputProps={props.inputProps}
                            aria-describedby={describedby}
                            type={props.type}
                            rowsMax={props.rowsMax}
                            multiline={props.multiline}
                            autoFocus={props.autoFocus}
                            required={props.required}
                            onChange={props.onChange}
                            onInvalid={handleInvalid}
                            onBlur={handleBlur}
                        />
                    )
            }
            {fcError ? (<FormHelperText id={describedby}>{invalidMessage}</FormHelperText>) : ''}
        </FormControl>
    )

}
