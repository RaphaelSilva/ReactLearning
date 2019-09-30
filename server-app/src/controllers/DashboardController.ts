import { Request, Response, Application } from 'express'
import MemberLoginController from './LoginController'
import { ProfessionalDao } from '../dao/EntitiesDao'

export default class MemberDashboardController {
  static instance: MemberDashboardController

  static create (app: Application): MemberDashboardController {
    this.instance = new MemberDashboardController()
    app.post('/api/member/find', [
      MemberLoginController.instance.isUserAuth,
      this.instance.findProfessionalByName
    ])
    return this.instance
  }

  private professionalDao: ProfessionalDao
  private constructor () {
    this.professionalDao = new ProfessionalDao()
  }

  public findProfessionalByName = (req: Request, res: Response): void => {
    if (req.body.professional.name) {
      this.professionalDao.fetchByName(req.body.professional.name)
        .then((professional) => { res.json(professional) })
        .catch((err) => {
          res.status(500).send({
            mensage: 'ProfessionalDao is not working well!',
            error: err
          })
        })
    } else {

    }
  }
}
