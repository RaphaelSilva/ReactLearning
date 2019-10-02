import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductSale from './home/ProductSale'
import Index from './home/Index'

export class Home extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={['/', '/home']}  render={(p) => <Index />} />
                    <Route path='/p/:productTag' render={(p) => <ProductSale {...p} />} />
                </Switch>
            </Router>
        )
    }
}

export default Home
