import { Request, Response, Application } from 'express'
import MemberLoginController from './LoginController'
import { ProfessionalDao, AddressDao, ContactDao } from '../dao/EntitiesDao'
import { Professional } from '../entities/IEntities'
import { AController } from './AController'

export default class MemberController extends AController {
  static instance: MemberController

  static create (app: Application): MemberController {
    if (this.instance) return this.instance
    this.instance = new MemberController()
    app.post('/api/member/find', [
      MemberLoginController.instance.isUserAuth,
      this.instance.findProfessionalByTag
    ])
    app.post('/api/member/getProfessional', [
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

  private constructor () {
    super()
    this.professionalDao = new ProfessionalDao()
    this.addressDao = new AddressDao()
    this.contactDao = new ContactDao()
  }

  private updateProfessional = async (req: Request, res: Response): Promise<void> => {
    const professional = req.body as Professional
    console.log(professional)
    const oldProfessional = await this.professionalDao.fetchById(professional.id)
    console.log(oldProfessional)
    const oldAddress = await this.addressDao.fetchById(professional.addressId)
    console.log(oldAddress)
    const oldContact = await this.contactDao.fetchById(professional.contactId)
    console.log(oldContact)

    res.json({ mensage: 'updated' })
  }

  private findProfessionalByTag = (req: Request, res: Response): void => {
    if (req.userAuth) {
      this.professionalDao.fetchByProfileId(req.userAuth.profileId)
        .then((professional) => {
          res.json(professional)
        }).catch((error) => { this.sendError(res, error, '') })
    } else {

    }
  }
}
