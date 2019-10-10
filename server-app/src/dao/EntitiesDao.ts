import ADao from './ADao'
import {
  Product, ProductType, Local, Profile, Professional,
  Address, Contact, Commerce, User, Customer, Payment,
  Cart, Order, OrderItem
} from '../models/Entities'

export class AddressDao extends ADao<Address> {
  constructor () {
    super('address', 'postalCode,street,num,complement,district,city,state')
  }
}

export class ContactDao extends ADao<Contact> {
  constructor () {
    super('contact', 'phone,eMail')
  }
}

export class CustomerDao extends ADao<Customer> {
  constructor () {
    super('customer', 'name,lastName,dateBirth,img,cpf,addressId,contactId')
  }
}

export class ProfessionalDao extends ADao<Professional> {
  public joinded = ' join customer on customer.id = professional.customerId'

  constructor () {
    super('professional', 'img,cnpj,isAddressShowed,addressId,contactId,customerId')
  }

  public fetchByProfileId (profileId: number): Promise<string> {
    const sql = this.buildSelect() + this.fromTable() + this.joinded +
      ' join profile on professional.id = profile.professionalId' +
      ' left join contact on professional.contactId = contact.id' +
      ' left join address on professional.addressId = address.id' +
      ' where profile.id = ?'
    return this.getResult<string>({
      sql: sql,
      values: [profileId]
    })
  }
}

export class CommerceDao extends ADao<Commerce> {
  constructor () {
    super('commerce', 'name,img,addressId,contactId')
  }
}

export class ProfileDao extends ADao<Profile> {
  constructor () {
    super('profile', 'professionalId,commerceId')
  }
}

export class UserDao extends ADao<User> {
  constructor () {
    super('sysUser', 'userName,password,profileId,actived')
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
    super('local', 'name,description,addressId,commerceId')
  }
}

export class ProductTypeDao extends ADao<ProductType> {
  constructor () {
    super('productType', 'name,description')
  }
}

export class ProductDao extends ADao<Product> {
  constructor () {
    super('product', 'name,description,img,readMore,tagLink,registerDate,productTypeId,profileId')
  }

  public fetchByTag (tagLink: string): Promise<Product> {
    return this.getResult<Product>({
      sql: this.selectWhere('tagLink = ?'),
      values: [tagLink]
    })
  }
}

export class PaymentDao extends ADao<Payment> {
  constructor () {
    super('payment', 'id,name,description,value,productId')
  }
}

export class CartDao extends ADao<Cart> {
  constructor () {
    super('cart', 'id,info,status,listIdItens,createReg,customerId')
  }
}

export class OrderDao extends ADao<Order> {
  constructor () {
    super('sOrder', 'id,paymentMethod,customerId,cartId,subTotal,status')
  }
}

export class OrderItemDao extends ADao<OrderItem> {
  constructor () {
    super('sOrderItem', 'id,checkoutId,paymentId,productId,customerId,isRecurrence,quantity')
  }
}
