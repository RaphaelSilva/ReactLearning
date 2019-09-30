import React, { Component } from 'react'
import { Container } from '@material-ui/core'

import PerfilProfissional from './container/PerfilProfissional'

export default class Index extends Component {
    render() {
        return (
            <>
                <Container>
                    <PerfilProfissional />
                </Container>
            </>
        )
    }
}
