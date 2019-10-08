import { User, Professional, Commerce, Profile, Address, Contact, EntitiId, Customer } from '../entities/IEntities'
import { AddressDao, ContactDao, ProfessionalDao, CommerceDao, ProfileDao, UserDao, CustomerDao } from '../dao/EntitiesDao'
import ADao from '../dao/ADao'

export default class TestDao {
  public Address: Address = {
    postalCode: '13088340',
    street: 'Av. Herminia de Andrade Coulto e Silva',
    num: '188',
    complement: 'SpazioRD',
    district: 'Pq. São Quirino',
    city: 'Campinas',
    state: 'São Paulo'
  }

  public Contact: Contact = {
    eMail: 'eng.raphaelsn@gmail.com',
    phone: '19999991155'
  }

  public Customer: Customer= {
    name: 'Raphael',
    lastName: 'Silva do Nascimneto',
    dateBirth: new Date('1988-10-01'),
    img: '/imagens/profile-de-avatar.jpg',
    cpf: '05214693218',
    address: this.Address,
    addressId: this.Address.id,
    contact: this.Contact,
    contactId: this.Contact.id
  }

  public Professional: Professional = {
    name: this.Customer.name,
    lastName: this.Customer.lastName,
    dateBirth: this.Customer.dateBirth,
    img: this.Customer.img,
    cpf: this.Customer.cpf,
    customerId: this.Customer.id,
    cnpj: '10623708000152',
    address: this.Address,
    addressId: this.Address.id,
    contact: this.Contact,
    contactId: this.Contact.id,
    isAddressShowed: true
  }

  public Commerce: Commerce = {
    name: 'SpazioRD',
    img: '/imagens/profile-de-avatar.jpg',
    address: this.Address,
    addressId: this.Address.id,
    contact: this.Contact,
    contactId: this.Contact.id
  }

  public Profile: Profile = {
    commerce: this.Commerce,
    commerceId: this.Commerce.id,
    professional: this.Professional,
    professionalId: this.Professional.id
  }

  public User: User = {
    userName: 'raphael',
    password: '123',
    actived: true,
    profile: this.Profile,
    profileId: this.Profile.id
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public showError = (error, clazz?: string) => {
    console.log(`@${clazz}@`)
    console.log('@##########################################################@')
    console.log(error)
    console.log('@##########################################################@')
  }

  private daoAddress: AddressDao
  private daoContact: ContactDao
  private daoCustomer: CustomerDao
  private daoProfessional: ProfessionalDao
  private daoCommerce: CommerceDao
  private daoProfile: ProfileDao
  private daoUser: UserDao

  constructor () {
    this.daoAddress = new AddressDao()
    this.daoContact = new ContactDao()
    this.daoCustomer = new CustomerDao()
    this.daoProfessional = new ProfessionalDao()
    this.daoCommerce = new CommerceDao()
    this.daoProfile = new ProfileDao()
    this.daoUser = new UserDao()
  }

  public testInsertData = async (): Promise<void> => {
    const savedAddress = await this.testInsert<Address>(this.Address, this.daoAddress, 'Address')
    const savedContact = await this.testInsert<Contact>(this.Contact, this.daoContact, 'Contact')
    const savedCustomer = await this.testInsert<Customer>(this.Customer, this.daoCustomer, 'Customer')
    this.Professional.customerId = savedCustomer.id
    this.Professional.addressId = savedAddress.id
    this.Professional.contactId = savedContact.id
    const savedProfessional = await this.testInsert<Professional>(this.Professional, this.daoProfessional, 'Professional')
    this.Commerce.addressId = savedAddress.id
    this.Commerce.contactId = savedContact.id
    const savedCommerce = await this.testInsert<Commerce>(this.Commerce, this.daoCommerce, 'Commerce')
    this.Profile.professionalId = savedProfessional.id
    this.Profile.commerceId = savedCommerce.id
    const savedProfile = await this.testInsert<Profile>(this.Profile, this.daoProfile, 'Profile')
    this.User.profileId = savedProfile.id
    const savedUser = await this.testInsert<User>(this.User, this.daoUser, 'User')
    console.assert(savedUser.id, '[testInsertData] UserId is not assign')
  }

  public testFetchById = async (): Promise<void> => {
    const fetchUser = await this.daoUser.fetchById(this.User.id)
    TestDao.validateObj(this.User, fetchUser, 'fetchUser')

    const fetchProfile = await this.daoProfile.fetchById(this.Profile.id)
    TestDao.validateObj(this.Profile, fetchProfile, 'fetchProfile')

    const fetchProfessional = await this.daoProfessional.fetchById(this.Professional.id)
    TestDao.validateObj(this.Professional, fetchProfessional, 'fetchProfessional')

    const fetchCommerce = await this.daoCommerce.fetchById(this.Commerce.id)
    TestDao.validateObj(this.Commerce, fetchCommerce, 'fetchCommerce')

    const fetchAddress = await this.daoAddress.fetchById(this.Address.id)
    TestDao.validateObj(this.Address, fetchAddress, 'fetchAddress')

    const fetchContact = await this.daoContact.fetchById(this.Contact.id)
    TestDao.validateObj(this.Contact, fetchContact, 'fetchContact')
  }

  public testRemoveById = async (): Promise<void> => {
    const removedUser = await this.daoUser.deleteData(this.User)
    console.assert(removedUser.id === 0, '@testRemoveById[removedUser]')

    const removedProfile = await this.daoProfile.deleteData(this.Profile)
    console.assert(removedProfile.id === 0, '@testRemoveById[removedProfile]')

    const removedProfessional = await this.daoProfessional.deleteData(this.Professional)
    console.assert(removedProfessional.id === 0, '@testRemoveById[removedProfessional]')

    const removedCommerce = await this.daoCommerce.deleteData(this.Commerce)
    console.assert(removedCommerce.id === 0, '@testRemoveById[removedCommerce]')

    const removedAddress = await this.daoAddress.deleteData(this.Address)
    console.assert(removedAddress.id === 0, '@testRemoveById[removedAddress]')

    const removedContact = await this.daoContact.deleteData(this.Contact)
    console.assert(removedContact.id === 0, '@testRemoveById[removedContact]')
  }

  private testInsert<K extends EntitiId> (data: K, dao: ADao<K>, clazz: string): Promise<K> {
    return new Promise<K>((resolve): void => {
      dao.newData(data).then((savedData) => {
        TestDao.validateObj(data, savedData, clazz)
        resolve(savedData)
      }).catch((error) => {
        this.showError(error, clazz)
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validateObj = (data1: any, data2: any, clazz: string): void => {
    // console.assert(data === savedData, '@validateObj[' + clazz + ']
    // Instance is not equal[\n' + JSON.stringify(data) + '\n] != [\n' + JSON.stringify(savedData) + ']')
    const vObj = Reflect.ownKeys(data2)
    for (const key of vObj) {
      const v1 = Reflect.get(data1, key)
      const v2 = Reflect.get(data2, key)
      console.assert(v1 === v2,
        '@validateObj[' + clazz + '] Property [' + key.toString() +
        '] is -\t-\t-\t-\t-> [' + v1 + '] != [' + v2 + ']')
    }
  }
}
