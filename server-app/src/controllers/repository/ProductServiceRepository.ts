import { ProductDao, ProductTypeDao } from '../../dao/EntitiesDao'
import { ProductAndType } from '../../models/ViewModels'

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
}
