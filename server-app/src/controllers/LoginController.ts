import { Response, Application, Request } from 'express'
import OpenFile from '../ossystem/OpenFile'
import UserAuth from '../entities/UserAuth'
import { UserDao } from '../dao/EntitiesDao'

export default class MemberLoginController {
  static instance: MemberLoginController
  static cookieName = 'userMemberAuth'

  static create (app: Application): MemberLoginController {
    if (this.instance) return this.instance

    this.instance = new MemberLoginController()
    app.post('/api/doLogin', this.instance.doLogin)

    this.instance.pathRouterGetUserAuth = '/api/getUserAuth'
    app.post('' + this.instance.pathRouterGetUserAuth, [
      this.instance.isUserAuth,
      this.instance.getUserAuth
    ])
    return this.instance
  }

  private userDao: UserDao
  private pathRouterGetUserAuth: string

  private constructor () {
    this.userDao = new UserDao()
  }

  public isUserAuth = (req: Request, res: Response, next: Function): void => {
    let cookie = req.headers.cookie.toString()
    if (cookie) {
      cookie = decodeURIComponent(cookie)
    } else {
      throw Error()
    }
    const cookieName = MemberLoginController.cookieName
    const userAuth = UserAuth.clone(req.universalCookies.get(cookieName))
    req.userAuth = OpenFile.read<UserAuth>(userAuth.getFullPath())
    next()
  }

  private sendLoginError (res: Response, msg: string): void {
    res.status(500).send({
      error: 'Access dened!',
      mensage: msg
    })
  }

  private doLogin = (req: Request, res: Response): void => {
    const userName = req.body.user.userName
    const password = req.body.user.password
    if (userName && password) {
      this.userDao.fetchUser(userName).then((user) => {
        const userAuth = new UserAuth(user, password, UserAuth.getAddressIp(req))
        if (userAuth.isAuthenticated) {
          userAuth.route = this.pathRouterGetUserAuth
          userAuth.filePath = OpenFile.path
          OpenFile.write<UserAuth>(userAuth.getFullPath(), userAuth)
          const jsonUserAuth = JSON.stringify(userAuth)
          res.cookie(MemberLoginController.cookieName, jsonUserAuth, {
            path: '/',
            maxAge: 30 * 60 * 1000
          }) // expires in 30 minutes
          res.json(jsonUserAuth)
        } else this.sendLoginError(res, 'Usuario ou senha estão errados')
      }).catch((err) => {
        this.sendLoginError(res, err)
      })
    } else {
      this.sendLoginError(res, 'Usuario ou senha no formato incorreto')
    }
  }

  private getUserAuth = (req: Request, res: Response): void => {
    res.json(JSON.stringify(req.userAuth))
  }
}
