import React, { ReactNode, useRef } from 'react'
import UploadFile from './UploadFile'
import MyModal, { RefMyModal } from './MyModal';

interface OnChange {
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
                defaultTab={0}
                labelTabs={["Upload de Imagens", "Todas as Imagens"]}
                renderItens={[
                    <UploadFile onPick={handlePick} />,
                    <p style={{height: '80vh'}}>Todas as Imagens</p>
                ]} />
        </>
    )
}
