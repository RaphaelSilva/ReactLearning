/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomerDao } from '../dao/EntitiesDao'
import { Professional, Customer, Contact, Address } from '../models/Entities'
import ADao from '../dao/ADao'
import OpenFile from '../utils/OpenFile'

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
console.clear()
OpenFile.rootPublic = 'D:\\workspace_docker\\SpazioRD\\server-app\\src\\public'
console.log(OpenFile.listAllFiles('\\imgs\\profile\\1\\'))
const t = 'D:\\workspace_docker\\SpazioRD\\server-app\\src\\public\\imgs\\profile\\1\\Logos-01.png'
const tspl = t.split('\\')

console.log(tspl[tspl.length - 1])
