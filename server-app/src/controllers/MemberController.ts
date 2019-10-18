import { Request, Response, Application } from 'express'
import MemberLoginController from './LoginController'
import { ProfessionalDao, AddressDao, ContactDao } from '../dao/EntitiesDao'
import { Professional } from '../models/Entities'
import { AController } from './AController'
import ProfileRepository from './repository/ProfileRepository'

export default class MemberController extends AController {
  static instance: MemberController

  static create (app: Application): MemberController {
    if (this.instance) return this.instance
    this.instance = new MemberController()
    app.post('/api/member/find', [
      MemberLoginController.instance.isUserAuth,
      this.instance.findProfessionalByTag
    ])
    app.get('/api/member/getProfessional', [
      MemberLoginController.instance.isUserAuth,
      this.instance.findProfessionalByTag
    ])
    // put
    app.post('/api/member/updateProfessional', [
      MemberLoginController.instance.isUserAuth,
      this.instance.updateProfessional
    ])

    return this.instance
  }

  private professionalDao: ProfessionalDao
  private addressDao: AddressDao
  private contactDao: ContactDao
  private profileRepository: ProfileRepository

  private constructor () {
    super()
    this.profileRepository = new ProfileRepository(
      this.addressDao = new AddressDao(),
      this.contactDao = new ContactDao(),
      null,
      this.professionalDao = new ProfessionalDao()
    )
  }

  private updateProfessional = (req: Request, res: Response): void => {
    const professional = req.body as Professional
    this.profileRepository.updateProfile(professional).then((result) => {
      this.sendResponseView(res, result)
    }).catch(error => this.sendError(res, error,
      'Problemas no servidor para atualizar professional [MCUP]'))
  }

  private findProfessionalByTag = (req: Request, res: Response): void => {
    if (req.userAuth) {
      this.professionalDao.fetchByProfileId(req.userAuth.profileId)
        .then((professional) => {
          res.json(professional)
        }).catch((error) => { this.sendError(res, error, '') })
    } else {
      this.sendError(res, new Error('Tem que estar logado Falha critica'))
    }
  }
}
