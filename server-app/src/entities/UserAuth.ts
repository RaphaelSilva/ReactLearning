import { Request } from 'express'
import User from './User'

export default class UserAuth {
    public name: string
    public isAuthenticated: boolean
    public addressIp: string
    public route: string
    public filePath: string
    public fileName: string

    static getAddressIp (req: Request): string {
      return '' + (req.headers['x-forwarded-for'] || req.connection.remoteAddress)
    }

    constructor (user?: User, password?: string, addressIp?: string) {
      this.name = user ? user.userName : ''
      this.isAuthenticated = user ? (user.password === password) : false
      this.addressIp = addressIp
    }

    static clone (uAuth: UserAuth): UserAuth {
      const nUAuth = new UserAuth()
      nUAuth.name = uAuth.name
      nUAuth.isAuthenticated = uAuth.isAuthenticated
      nUAuth.addressIp = uAuth.addressIp
      nUAuth.route = uAuth.route
      nUAuth.filePath = uAuth.filePath
      nUAuth.fileName = uAuth.fileName
      return nUAuth
    }

    public getFileName (): string {
      this.fileName = this.name + this.addressIp.replace('.', '').replace('.', '').replace('.', '')
      return this.fileName
    }

    public getFullPath (): string {
      return this.filePath + this.getFileName()
    }
}
