import { User, Professional, Commerce, Profile, Address, Contact, Customer } from '../models/Entities'
import { AddressDao, ContactDao, ProfessionalDao, CommerceDao, ProfileDao, UserDao, CustomerDao, ProductDao, ProductTypeDao } from '../dao/EntitiesDao'
import { testInsert, testFetch, testDeleteData } from './ATest'

export default class TestADao {
  public Address: Address
  public Contact: Contact
  public Customer: Customer
  public Professional: Professional
  public Commerce: Commerce
  public Profile: Profile
  public User: User

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public showError = (error, clazz?: string) => {
    console.log(`@${clazz}@`)
    console.log('@##########################################################@')
    console.log(error)
    console.log('@##########################################################@')
  }

  public daoAddress: AddressDao
  public daoContact: ContactDao
  public daoCustomer: CustomerDao
  public daoProfessional: ProfessionalDao
  public daoCommerce: CommerceDao
  public daoProfile: ProfileDao
  public daoUser: UserDao
  public productDao: ProductDao
  public productTypeDao: ProductTypeDao

  constructor () {
    this.daoAddress = new AddressDao()
    this.daoContact = new ContactDao()
    this.daoCustomer = new CustomerDao()
    this.daoProfessional = new ProfessionalDao()
    this.daoCommerce = new CommerceDao()
    this.daoProfile = new ProfileDao()
    this.daoUser = new UserDao()
    this.productDao = new ProductDao()
    this.productTypeDao = new ProductTypeDao()
  }

  public deleteAll = async (): Promise<void> => {
    await this.daoAddress.deleteAll()
    await this.daoContact.deleteAll()
    await this.daoCustomer.deleteAll()
    await this.daoProfessional.deleteAll()
    await this.daoCommerce.deleteAll()
    await this.daoProfile.deleteAll()
    await this.daoUser.deleteAll()
    await this.productTypeDao.deleteAll()
    await this.productDao.deleteAll()
    console.log('@InitTest done')
  }

  public basicData = async (): Promise<void> => {
    const savedAddress = await testInsert<Address>(this.Address, this.daoAddress, 'Address')
    const savedContact = await testInsert<Contact>(this.Contact, this.daoContact, 'Contact')
    const savedCustomer = await testInsert<Customer>(this.Customer, this.daoCustomer, 'Customer')
    this.Professional.customerId = savedCustomer.id
    this.Professional.addressId = savedAddress.id
    this.Professional.contactId = savedContact.id
    const savedProfessional = await testInsert<Professional>(this.Professional, this.daoProfessional, 'Professional')
    this.Commerce.addressId = savedAddress.id
    this.Commerce.contactId = savedContact.id
    const savedCommerce = await testInsert<Commerce>(this.Commerce, this.daoCommerce, 'Commerce')
    this.Profile.professionalId = savedProfessional.id
    this.Profile.commerceId = savedCommerce.id
    const savedProfile = await testInsert<Profile>(this.Profile, this.daoProfile, 'Profile')
    this.User.profileId = savedProfile.id
    const savedUser = await testInsert<User>(this.User, this.daoUser, 'User')
    console.assert(savedUser.id, '[testInsertData] UserId is not assign')
    console.log('@testInsertData done')
  }

  public testFetchById = async (): Promise<void> => {
    await testFetch<User>(this.User.id, this.User, this.daoUser, 'fetchUser')
    await testFetch<Profile>(this.Profile.id, this.Profile, this.daoProfile, 'fetchProfile')
    await testFetch<Professional>(this.Professional.id, this.Professional, this.daoProfessional, 'fetchProfessional')
    await testFetch<Commerce>(this.Commerce.id, this.Commerce, this.daoCommerce, 'fetchCommerce')
    await testFetch<Address>(this.Address.id, this.Address, this.daoAddress, 'fetchAddress')
    await testFetch<Contact>(this.Contact.id, this.Contact, this.daoContact, 'fetchContact')
    console.log('@testFetchById done')
  }

  public testRemoveById = async (): Promise<void> => {
    await testDeleteData<User>(this.User, this.daoUser, 'User')
    await testDeleteData<Profile>(this.Profile, this.daoProfile, 'Profile')
    await testDeleteData<Professional>(this.Professional, this.daoProfessional, 'Professional')
    await testDeleteData<Customer>(this.Customer, this.daoCustomer, 'Customer')
    await testDeleteData<Commerce>(this.Commerce, this.daoCommerce, 'Commerce')
    await testDeleteData<Address>(this.Address, this.daoAddress, 'Address')
    await testDeleteData<Contact>(this.Contact, this.daoContact, 'Contact')
    console.log('@testRemoveById done')
  }
}
