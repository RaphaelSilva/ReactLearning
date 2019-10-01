import ADao from './ADao'
import {
  Product, ProductType, Local, Perfil, Professional,
  Address,
  Contact,
  Commerce,
  User
} from '../entities/IEntities'

export class AddressDao extends ADao<Address> {
  constructor () {
    super('address', ['zipCod', 'street', 'num', 'complement', 'district', 'city', 'state'])
  }
}

export class ContactDao extends ADao<Contact> {
  constructor () {
    super('contact', ['phone', 'eMail'])
  }
}

export class ProfessionalDao extends ADao<Professional> {
  constructor () {
    super('professional', ['name', 'lastName', 'dateBirth', 'img',
      'isAddressShowed', 'addressId', 'contactId'])
  }

  public fetchByPerfilId (perfilId: number): Promise<string> {
    let sql = this.buildSelect()
    sql += ' join perfil on professional.id = perfil.professionalId'
    sql += ' left join contact on professional.contactId = contact.id'
    sql += ' left join address on professional.addressId = address.id'
    sql += ' where perfil.id = ?'
    return this.getResult<string>({
      sql: sql,
      values: [perfilId]
    })
  }

  public fetchByName (name: string): Promise<Professional> {
    return this.getResult<Professional>({
      sql: this.selectWhere('name = ?'),
      values: [name]
    })
  }
}

export class CommerceDao extends ADao<Commerce> {
  constructor () {
    super('commerce', ['name', 'img', 'addressId', 'contactId'])
  }
}

export class PerfilDao extends ADao<Perfil> {
  constructor () {
    super('perfil', ['professionalId', 'commerceId'])
  }
}

export class UserDao extends ADao<User> {
  constructor () {
    super('sysUser', ['userName', 'password', 'perfilId', 'actived'])
  }

  public fetchUser (userName: string, cls = 'userName = ?'): Promise<User> {
    return this.getResult<User>({
      sql: this.selectWhere(cls),
      values: [userName]
    })
  }
}

export class LocalDao extends ADao<Local> {
  constructor () {
    super('local', ['name', 'description', 'addressId', 'commerceId'])
  }
}

export class ProductTypeDao extends ADao<ProductType> {
  constructor () {
    super('productType', ['name', 'description'])
  }
}

export class ProductDao extends ADao<Product> {
  constructor () {
    super('product', ['name', 'description', 'value', 'tagLink', 'registerDate',
      'productTypeId', 'perfilId'])
  }
}
