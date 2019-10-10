import { ProductDao, ProductTypeDao } from '../../dao/EntitiesDao'
import { ProductAndType } from '../../models/ViewModels'

export default class ProductServiceRepository {
  public productDao: ProductDao
  public productTypeDao: ProductTypeDao

  constructor (
    productDao?: ProductDao,
    productTypeDao?: ProductTypeDao
  ) {
    this.productDao = productDao || new ProductDao()
    this.productTypeDao = productTypeDao || new ProductTypeDao()
  }

  public listProduct = async (ofPerfilId: number): Promise<Array<ProductAndType>> => {
    let productTypeField = this.productTypeDao.concatTableFields(this.productTypeDao.fields)
    productTypeField = productTypeField.replace('name', 'name as typeName')
    productTypeField = productTypeField.replace('description', 'description as typeDescription')
    productTypeField += ',productType.id as typeId'
    const dbReturn = await this.productDao.getComplexlist<ProductAndType>('product.profileId = ?',
      [ofPerfilId], productTypeField, this.productTypeDao.table)
    return dbReturn
  }
}
