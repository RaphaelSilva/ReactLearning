import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { Authenticated } from '../utils/UserAuth'

export interface IPrivateRoute extends RouteProps {
  cookieName: string
  urlredirect: string
}

export default class PrivateRoute extends Route<IPrivateRoute> {
  public isAuthenticated: boolean

  constructor(props: Readonly<IPrivateRoute>) {
    super(props)
    const cookies = new Cookies()
    const cookie = cookies.get(props.cookieName)
    if (cookie) {
      this.isAuthenticated = (cookie as Authenticated).isAuthenticated
    } else this.isAuthenticated = false
  }

  render() {
    return this.isAuthenticated ? super.render() : (<Redirect to={
      {
        pathname: this.props.urlredirect,
        state: {
          from: this.props.location
        }
      }
    } />)
  }
}
