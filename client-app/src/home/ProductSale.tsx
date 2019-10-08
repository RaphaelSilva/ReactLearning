import React, { Component } from 'react'
import { fetchGet } from '../utils/FUtil'
import { Container } from '@material-ui/core'
import { ProductToSale } from '../entities/ViewEntities'
import { ParseProfessional, ParseProfile, ParseProduct } from '../entities/ParserJson'
import ServicePage from './template/ServicePage'

interface IndexResult {
    match: {
        params: {
            productTag: string
        }
    }
}

interface StateInterface /*extends ProductToSale*/ {
    isFetched: boolean
    productToSale: ProductToSale
}

export default class ProductSale extends Component<IndexResult, StateInterface> {
    constructor(props: Readonly<IndexResult>) {
        super(props)
        this.state = {
            isFetched: false,
            productToSale: {
                professional: ParseProfessional(),
                profile: ParseProfile(),
                product: ParseProduct()
            }
        }

        fetchGet<ProductToSale>('/api/productToSale/' + this.props.match.params.productTag)
            .then(this.resultFromFetch)
    }

    public resultFromFetch = (data: ProductToSale) => {
        this.setState({
            isFetched: true,
            productToSale: data
        })
    }

    render() {
        return (
            <>
                <Container style={{paddingTop: 15}}>
                    {this.state.isFetched ? (
                        //TODO: Ask to product Template before 
                        <ServicePage productToSale={this.state.productToSale} />

                        // TODO: Make a Loading component
                    ) : 'Loading....'}
                </Container>
            </>
        )
    }
}
