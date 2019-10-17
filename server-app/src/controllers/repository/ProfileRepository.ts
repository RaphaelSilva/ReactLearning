import { ProfessionalDao, AddressDao, ContactDao, ProfileDao, CustomerDao } from '../../dao/EntitiesDao'
import { Professional } from '../../models/Entities'
import { ResponseView } from '../../models/ViewModels'

export default class ProfileRepository {
  public professionalDao: ProfessionalDao
  public customerDao: CustomerDao
  public addressDao: AddressDao
  public contactDao: ContactDao
  public profileDao: ProfileDao

  constructor (
    addressDao?: AddressDao,
    contactDao?: ContactDao,
    customerDao?: CustomerDao,
    professionalDao?: ProfessionalDao,
    profileDao?: ProfileDao
  ) {
    this.addressDao = addressDao || new AddressDao()
    this.contactDao = contactDao || new ContactDao()
    this.professionalDao = professionalDao || new ProfessionalDao()
    this.customerDao = customerDao || new CustomerDao()
    this.profileDao = profileDao || new ProfileDao()
  }

  private validetingProfessional = (professional: Professional): void => {
    const addressValided = this.addressDao.valideField(professional.address)
    const contactValided = this.contactDao.valideField(professional.contact)
    const customerValided = this.customerDao.valideField(professional)
    const professionalValided = this.professionalDao.valideField(professional)

    if (
      addressValided.length +
      contactValided.length +
      customerValided.length +
      professionalValided.length > 0) {
      let msgErro = ''
      addressValided.forEach(node => { msgErro += node.msg + '\n' })
      contactValided.forEach(node => { msgErro += node.msg + '\n' })
      customerValided.forEach(node => { msgErro += node.msg + '\n' })
      professionalValided.forEach(node => { msgErro += node.msg + '\n' })
      throw new Error(msgErro)
    }
    if (typeof professional.id === 'undefined') {
      throw new Error('Professional id is empty')
    }
    if (
      typeof professional.address.id === 'undefined' ||
      typeof professional.contact.id === 'undefined') {
      throw new Error('Professional Address and Contact is empty')
    }
    if (typeof professional.dateBirth === 'string') {
      professional.dateBirth = new Date(professional.dateBirth)
    }
  }

  public updateProfile = async (professional: Professional): Promise<ResponseView> => {
    try {
      // validate all fields of professional importante to save
      this.validetingProfessional(professional)
      // true: update professional to DB
      await this.addressDao.update(professional.address)
      await this.contactDao.update(professional.contact)
      await this.customerDao.update(professional)
      await this.professionalDao.update(professional)
      return { message: 'Perfil atualizado com sucesso!', variant: 'success' }
    } catch (error) {
      // false: launch a mensage of Error as a Exception
      console.log('updateProfile')
      console.log(error)
      return { message: 'Ops! não podemos atualizar o perfil', variant: 'warning' }
    }
  }
}
