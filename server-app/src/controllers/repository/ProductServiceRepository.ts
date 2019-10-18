import { ProductDao, ProductTypeDao } from '../../dao/EntitiesDao'
import { ProductAndType, ResponseView } from '../../models/ViewModels'
import { Product } from '../../models/Entities'

export default class ProductServiceRepository {
  public productDao: ProductDao
  public productTypeDao: ProductTypeDao
  private otherFields: string
  private relation: string

  constructor (
    productDao?: ProductDao,
    productTypeDao?: ProductTypeDao
  ) {
    this.productDao = productDao || new ProductDao()
    this.productTypeDao = productTypeDao || new ProductTypeDao()

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

  findProducts = async (profileId: number, text: string): Promise<Array<ProductAndType>> => {
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

  public update = async (product: Product): Promise<ResponseView & { product?: Product }> => {
    try {
      // validate all fields of product importante to save
      this.valideting(product)
      // true: update product to DB if id is null

      if (product.id) {
        await this.productDao.update(product)
        return { message: `Produto ${product.name} atualizado com sucesso!`, variant: 'success' }
      } else {
        const nProduct = await this.productDao.add(product)
        return { message: `Produto ${product.name} inserido com sucesso!`, variant: 'success', product: nProduct }
      }
    } catch (error) {
      // false: launch a mensage of Error as a Exception
      console.log('updateUpdate')
      console.log(error)
      return { message: `Ops! não podemos atualizar seu produto ${product.name}`, variant: 'warning' }
    }
  }

  public checkTagLink = (profileId: number, value: string, productId?: number): Promise<Array<Product>> => {
    return productId ? this.productDao.fetchBy([
      profileId,
      value,
      productId
    ], 'profileId = ? AND tagLink = ? AND id <> ?') : this.productDao.fetchBy([
      profileId,
      value
    ], 'profileId = ? AND tagLink = ?')
  }
}
