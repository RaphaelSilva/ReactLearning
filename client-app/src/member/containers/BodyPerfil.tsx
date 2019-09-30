import React from 'react'
import { ISecurityComponet } from '../../component/SecurityComponet'

interface IBodyPerfil extends ISecurityComponet {
    match: {
        params: {
            text: string
        }
    }
}

export default function BodyPerfil(props: Readonly<IBodyPerfil>) {
    console.log('BoryPerfil location -> ' + props.location);
    
    return (
        <div>
            <h1>Ola mundo Perfil</h1>
        </div>
    )
}


