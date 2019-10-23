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
    const dbReturn = await this.productDao
      .getComplexlist<ProductAndType>('product.profileId = ?',
        [profileId], this.otherFields, this.relation)
    return dbReturn
  }

  public findProducts = async (profileId: number, text: string): Promise<Array<ProductAndType>> => {
    const dbReturn = await this.productDao
      .getComplexlist<ProductAndType>('product.profileId = ? AND LOWER(product.name) like LOWER(?)',
        [profileId, `%${text}%`], this.otherFields, this.relation)
    return dbReturn
  }

  public listProductInfo = async (productId: number): Promise<Array<ProductInfo>> => {
    return this.productInfoDao.fetchBy(productId, 'productId = ?')
  }

  public checkTagLink = (value: string, productId?: number): Promise<Array<Product>> => {
    return productId ? this.productDao.fetchBy([
      value,
      productId
    ], 'tagLink = ? AND id <> ?') : this.productDao.fetchBy([
      value
    ], 'tagLink = ?')
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

  private updateProductInfo = async (product: Product): Promise<void> => {
    let oProductInfo = await this.productInfoDao.fetchBy(product.id, 'productId = ?')
    if (product.productInfos) {
      for (let i = 0; i < product.productInfos.length; i++) {
        const productInfosOfView = product.productInfos[i]
        if (typeof productInfosOfView.id === 'undefined' || productInfosOfView.id === 0) {
          productInfosOfView.productId = product.id
          await this.productInfoDao.add(productInfosOfView)
        } else {
          oProductInfo = oProductInfo.filter((value) => {
            return value.id !== productInfosOfView.id
          })
        }
      }
    }
    if (oProductInfo.length > 0) {
      for (let i = 0; i < oProductInfo.length; i++) {
        await this.productInfoDao.deleteData(oProductInfo[i])
      }
    }
  }

  private updatePayment = async (product: Product): Promise<void> => {
    let oPayments = await this.paymentDao.fetchBy(product.id, 'productId = ?')
    for (let i = 0; i < product.payments.length; i++) {
      const paymentOfView = product.payments[i]
      if (typeof paymentOfView.id === 'undefined' || paymentOfView.id === 0) {
        paymentOfView.productId = product.id
        await this.paymentDao.add(paymentOfView)
      } else {
        oPayments = oPayments.filter((value) => {
          return value.id !== paymentOfView.id
        })
      }
    }
    if (oPayments.length > 0) {
      for (let i = 0; i < oPayments.length; i++) {
        await this.paymentDao.deleteData(oPayments[i])
      }
    }
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
        await this.updateProductInfo(product)
        await this.updatePayment(product)
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

  public remove = async (productId: number): Promise<ResponseView & { product?: Product }> => {
    const product = await this.productDao.fetchById(productId)
    // TODO validete excluson
    await this.productDao.deleteData(product)
    return { message: `Seu produto ${product.name} foi excluido`, variant: 'success' }
  }
}
