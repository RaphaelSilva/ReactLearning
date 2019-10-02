import React, { Component } from 'react'
import { fetchGet } from '../utils/FUtil'
import { Container } from '@material-ui/core'
import PerfilProfissional from './container/PerfilProfissional'
import { ProductToSale } from '../entities/ViewEntities'
import { ParseProfessional, ParsePerfil, ParseProduct } from '../entities/ParserJson'

interface IndexResult {
    match: {
        params: {
            productTag: string
        }
    }
}

interface StateInterface extends ProductToSale{
    isFetched: boolean
}

export default class ProductSale extends Component<IndexResult, StateInterface> {
    constructor(props: Readonly<IndexResult>) {
        super(props)

        this.state = {
            isFetched: false,
            professional: ParseProfessional(),
            perfil: ParsePerfil(),
            product: ParseProduct()
        }

        fetchGet<ProductToSale>('/api/productToSale/' + this.props.match.params.productTag)
            .then(this.resultFromFetch)
    }

    public resultFromFetch = (data: ProductToSale) => {
        this.setState({
            isFetched: true,
            professional: data.professional,
            perfil: data.perfil,
            product: data.product
        })
    }

    render() {
        return (
            <>
                <Container>
                    { this.state.isFetched ? (                    
                        
                    <PerfilProfissional professional={this.state.professional}/> 
                    
                    ) : 'Loading....'}
                </Container>
            </>
        )
    }
}
