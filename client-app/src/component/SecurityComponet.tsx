import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { Authenticated } from '../utils/UserAuth'
import * as H from 'history';

export interface ISecurityComponet {
    name?: string
    location?: H.Location
    urlredirect: string
    cookieName: string
}

export default class SecurityComponet extends Component<ISecurityComponet> {
    public isAuthenticated: boolean
    
    constructor(props: Readonly<ISecurityComponet>){
        super(props)
        const cookies = new Cookies()
        const cookie = cookies.get(props.cookieName)
        if (cookie) {
          this.isAuthenticated = (cookie as Authenticated).isAuthenticated
        } else this.isAuthenticated = false
        console.log(props)        
    }

    render() {
        return this.isAuthenticated ? this.props.children : (<Redirect to={
            {
              pathname: this.props.urlredirect,
              state: {
                from: this.props.location
              }
            }
          } />)
    }
}
