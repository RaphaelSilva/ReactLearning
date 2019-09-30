import React, { Component } from 'react'

import Link from '@material-ui/core/Link';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>Ola Mundo</h1>
                <Link color="inherit" href="/member">Area do Membro</Link>
            </div>
        )
    }
}

export default Home
