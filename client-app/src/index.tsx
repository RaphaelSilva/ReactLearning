import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CookiesProvider } from 'react-cookie';
import Home from './Home';

ReactDOM.render(
    <CookiesProvider>
        <Home />
        <App />
    </CookiesProvider>, document.getElementById('root'))
