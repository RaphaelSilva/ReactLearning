import React, { ReactNode, useRef } from 'react'
import UploadFile from './UploadFile'
import MyModal, { RefMyModal } from './MyModal';
import UploadListFile from './UploadListFile';

export interface OnChange {
    onPick: (img: string) => void
    children?: ReactNode
}

export default function UploadFileModal(props: Readonly<OnChange>) {

    const mRef = useRef(RefMyModal)
    const handlePick = (img: string) => {
        props.onPick(img)
        mRef.current.close()
    }

    return (
        <>
            <div onClick={() => mRef.current.open()}>
                {props.children}
            </div>
            <MyModal ref={mRef}
                defaultTab={1}
                labelTabs={["Upload de Imagens", "Todas as Imagens"]}
                renderItens={[
                    <UploadFile onPick={handlePick} />,
                    <UploadListFile onPick={handlePick}/>
                ]} />
        </>
    )
}
