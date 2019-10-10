import UserAuth from './models/UserAuth'
import Cookies from 'universal-cookie'

declare module 'express' {
  export interface Request {
     userAuth?: UserAuth;
     universalCookies: Cookies;
  }
}
