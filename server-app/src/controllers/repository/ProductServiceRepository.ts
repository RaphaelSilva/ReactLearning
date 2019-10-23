import { ProductDao, ProductTypeDao, PaymentDao, ProductInfoDao } from '../../dao/EntitiesDao'
import { ProductAndType, ResponseView } from '../../models/ViewModels'
import { Product, ProductInfo } from '../../models/Entities'

export default class ProductServiceRepository {
  public productDao: ProductDao
  public productTypeDao: ProductTypeDao
  public paymentDao: PaymentDao
  public productInfoDao: ProductInfoDao

  private otherFields: string
  private relation: string

  constructor (
    productDao?: ProductDao,
    productTypeDao?: ProductTypeDao,
    paymentDao?: PaymentDao,
    productInfoDao?: ProductInfoDao
  ) {
    this.productDao = productDao || new ProductDao()
    this.productTypeDao = productTypeDao || new ProductTypeDao()
    this.paymentDao = paymentDao || new PaymentDao()
    this.productInfoDao = productInfoDao || new ProductInfoDao()

    this.otherFields = 'product.id,' + this.productTypeDao.concatTableFields(this.productTypeDao.fields)
    this.otherFields = this.otherFields.replace('name', 'name as typeName')
    this.otherFields = this.otherFields.replace('description', 'description as typeDescription')
    this.otherFields += ',productType.id as typeId'
    this.relation = 'join productType on product.productTypeId = productType.id'
  }

  public listProduct = async (profileId: number): Promise<Array<ProductAndType>> => {
    const dbReturn = await this.productDao.getComplexlist<ProductAndType>('product.profileId = ?',
      [profileId], this.otherFields, this.relation)
    return dbReturn
  }

  public findProducts = async (profileId: number, text: string): Promise<Array<ProductAndType>> => {
    const dbReturn = await this.productDao.getComplexlist<ProductAndType>('product.profileId = ? AND LOWER(product.name) like LOWER(?)',
      [profileId, `%${text}%`], this.otherFields, this.relation)
    return dbReturn
  }

  private valideting = (product: Product): void => {
    const pValide = this.productDao.valideField(product)
    if (pValide.length > 0) {
      let msgErro
      pValide.forEach(node => { msgErro += node.msg + '\n' })
      throw new Error(msgErro)
    }
    product.registerDate = new Date(product.registerDate)
  }

  private saveNewProduct = async (product: Product): Promise<ResponseView & { product?: Product }> => {
    const nProduct = await this.productDao.add(product)
    for (let i = 0; i < product.payments.length; i++) {
      const payment = product.payments[i]
      payment.productId = nProduct.id
      await this.paymentDao.add(payment)
    }
    if (product.productInfos) {
      for (let i = 0; i < product.productInfos.length; i++) {
        const productInfo = product.productInfos[i]
        productInfo.productId = nProduct.id
        await this.productInfoDao.add(productInfo)
      }
    }
    return { message: `Produto ${product.name} inserido com sucesso!`, variant: 'success', product: nProduct }
  }

  public update = async (product: Product): Promise<ResponseView & { product?: Product }> => {
    try {
      // validate all fields of product importante to save
      this.valideting(product)
      const result = await this.checkTagLink(product.tagLink, product.id)
      if (result.length > 0) return { message: `Ops! Parece que alguem já escolheu esse link: ${product.tagLink}`, variant: 'warning' }
      if (product.payments === null || product.payments.length === 0) {
        return { message: 'Ao menos 1 metodo de pagamento tem que ser cadastrado', variant: 'warning' }
      }
      // true: update product to DB if id is null

      if (product.id) {
        await this.productDao.update(product)
        const oPayments = await this.paymentDao.fetchBy(product.id, 'productId = ?')
        for (let i = 0; i < product.payments.length; i++) {
          const paymentOfView = product.payments[i]
          const isNewPayment = paymentOfView.id === 0
          if (isNewPayment) {
            paymentOfView.productId = product.id
            await this.paymentDao.add(paymentOfView)
          } else {
            for (let o = 0; o < oPayments.length; o++) {
              if (paymentOfView.id === oPayments[o].id) {
                oPayments.splice(o, 1) // remove what still in a list
                break
              }
            }
          }
        }
        if (oPayments.length > 0) { // leftover don't exist more in list
          for (let i = 0; i < oPayments.length; i++) {
            this.paymentDao.deleteData(oPayments[i])
          }
        }
        return { message: `Produto ${product.name} atualizado com sucesso!`, variant: 'success' }
      } else {
        return this.saveNewProduct(product)
      }
    } catch (error) {
      // false: launch a mensage of Error as a Exception
      console.log('updateUpdate')
      console.log(error)
      return { message: `Ops! não podemos atualizar seu produto ${product.name}`, variant: 'warning' }
    }
  }

  public checkTagLink = (value: string, productId?: number): Promise<Array<Product>> => {
    return productId ? this.productDao.fetchBy([
      value,
      productId
    ], 'tagLink = ? AND id <> ?') : this.productDao.fetchBy([
      value
    ], 'tagLink = ?')
  }

  public listProductInfo = async (productId: number): Promise<Array<ProductInfo>> => {
    return this.productInfoDao.fetchBy(productId, 'productId = ?')
  }
}
