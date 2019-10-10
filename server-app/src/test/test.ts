import TestADao from './TestADao'
import { User, Professional, Commerce, Profile, Address, Contact, Customer, Product, ProductType } from '../models/Entities'
import TestRepository from './TestRepository'
import { getRndInteger as gRI, getRandomString as gRS } from '../utils/Random'

console.clear()
const address: Address = {
  postalCode: '13088340',
  street: 'Av. Herminia de Andrade Couto e Silva',
  num: '188',
  complement: 'SpazioRD',
  district: 'Pq. São Quirino',
  city: 'Campinas',
  state: 'São Paulo'
}

const contact: Contact = {
  eMail: 'eng.raphaelsn@gmail.com',
  phone: '19999991155'
}

const customer: Customer = {
  name: 'Raphael',
  lastName: 'Silva do Nascimneto',
  dateBirth: new Date('1988-10-01'),
  img: '/imgs/profile/templ/profile-m.jpg',
  cpf: '05214693218',
  address: address,
  contact: contact,
  addressId: address.id,
  contactId: contact.id
}

const professional: Professional = {
  name: customer.name,
  lastName: customer.lastName,
  dateBirth: customer.dateBirth,
  img: customer.img,
  cpf: customer.cpf,
  cnpj: '10623708000152',
  isAddressShowed: true,
  address: address,
  contact: contact,
  customerId: customer.id,
  addressId: address.id,
  contactId: contact.id
}

const commerce: Commerce = {
  name: 'SpazioRD',
  img: '/imgs/profile/templ/profile-m.jpg',
  address: address,
  contact: contact,
  addressId: address.id,
  contactId: contact.id
}

const profile: Profile = {
  commerce: commerce,
  commerceId: commerce.id,
  professional: professional,
  professionalId: professional.id
}

const user: User = {
  userName: 'raphael',
  password: '123',
  actived: true,
  profile: profile,
  profileId: profile.id
}

console.log('@-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-@')
console.log('@-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-@')
console.log('@-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-@')

const mThen = (): void => {
  console.log('@###########################################################@')
  console.log('@#####Pass#Pass#Pass#Pass#Pass#Pass#Pass#Pass#Pass#Pass#####@')
  console.log('@###########################################################@')
}

const mCatch = (error): void => {
  console.log('@###########################################################@')
  console.log('@Error#Error#Error#Error#Error#Error#Error#Error#Error#Error@')
  console.log('@###########################################################@')
  console.log(error)
}

const testADao = new TestADao()
const testRepository = new TestRepository(testADao.productDao, testADao.productTypeDao)

const exec = [
  async (): Promise<void> => {
    testADao.Address = address
    testADao.Contact = contact
    testADao.Customer = customer
    testADao.Professional = professional
    testADao.Commerce = commerce
    testADao.Profile = profile
    testADao.User = user
    await testADao.deleteAll()
    await testADao.basicData()
    await testADao.testFetchById()
    await testADao.testRemoveById()
  },
  async (): Promise<void> => {
    await testADao.deleteAll()
    await testADao.basicData()

    testRepository.ofPerfilId = testADao.Profile.id
    const productTypes: Array<ProductType> = []
    for (let i = 0; i < 15; i++) {
      productTypes.push({ name: gRS(gRI(3, 4), gRI(5, 13)).substring(0, 49), description: gRS(gRI(1, 3), gRI(5, 15)).substring(0, 79) })
    }

    const products: Array<Product> = []
    for (let i = 0; i < 15; i++) {
      const pType = productTypes[gRI(1, productTypes.length - 1)]
      products.push({
        name: gRS(gRI(3, 8), gRI(5, 15)).substring(0, 49),
        description: gRS(gRI(1, 3), gRI(5, 15)).substring(0, 119),
        img: '/imgs/profile/' + testADao.Profile.id + '/profile-m.jpg',
        readMore: gRS(gRI(10, 50), gRI(5, 15)),
        registerDate: new Date(),
        tagLink: gRS(gRI(3, 8), gRI(5, 15)).substring(0, 63),
        productType: pType,
        productTypeId: pType.id,
        profileId: testADao.Profile.id
      })
    }
    testRepository.productTypes = productTypes
    testRepository.products = products
    await testRepository.InitTest()
    await Promise.all([
      testRepository.testListProduct()
    ])
    await testRepository.cleanData()
  }]

const start = async (): Promise<void> => {
  for (let i = 0; i < exec.length; i++) {
    await exec[i]()
    console.log('@-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-@')
  }

  await testADao.deleteAll()
  await testADao.basicData()
}
start().then(mThen).catch(mCatch)
