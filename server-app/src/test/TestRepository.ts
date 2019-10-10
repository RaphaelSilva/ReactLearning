import ProductServiceRepository from '../controllers/repository/ProductServiceRepository'
import { ProductDao, ProductTypeDao } from '../dao/EntitiesDao'
import { Product, ProductType } from '../models/Entities'
import { testInsert, testDeleteData, validateObj } from './ATest'

export default class TestRepository {
    public products: Array<Product>
    public productTypes: Array<ProductType>
    public productServiceRepository: ProductServiceRepository
    public ofPerfilId: number
    public productDao: ProductDao
    public productTypeDao: ProductTypeDao

    constructor (productDao?: ProductDao, productTypeDao?: ProductTypeDao) {
      this.productDao = productDao || new ProductDao()
      this.productTypeDao = productTypeDao || new ProductTypeDao()
      this.productServiceRepository = new ProductServiceRepository(this.productDao, this.productTypeDao)
    }

    public InitTest = async (): Promise<void> => {
      for (let i = 0; i < this.productTypes.length; i++) {
        await testInsert<ProductType>(this.productTypes[i], this.productTypeDao, 'ProductType')
      }

      for (let i = 0; i < this.products.length; i++) {
        console.assert(this.products[i].productType.id, `@InitTest [ProductType=${this.products[i].productType.id}]`)
        this.products[i].productTypeId = this.products[i].productType.id
        await testInsert<Product>(this.products[i], this.productDao, 'Product')
      }
      console.log('@InitTest done')
    }

    public cleanData = async (): Promise<void> => {
      for (let i = 0; i < this.productTypes.length; i++) {
        await testDeleteData<ProductType>(this.productTypes[i], this.productTypeDao, 'ProductType')
      }

      for (let i = 0; i < this.products.length; i++) {
        await testDeleteData<Product>(this.products[i], this.productDao, 'Product')
      }
    }

    public testListProduct = async (): Promise<void> => {
      const result = await this.productServiceRepository.listProduct(this.ofPerfilId)
      result.forEach(el => {
        this.products.forEach(product => {
          if (product.id === el.id) {
            const clz = 'ProductOnly'
            validateObj(el, product, clz, this.productDao.fields)
            console.assert(el.typeDescription === product.productType.description,
                `@validateObj[${clz}] Property [typeDescription] =>
                [${el.typeDescription}] != [${product.productType.description}]`)
            console.assert(el.typeName === product.productType.name,
                    `@validateObj[${clz}] Property [typeName] =>
                    [${el.typeName}] != [${product.productType.name}]`)
          }
        })
      })
    }
}
