import { ProfessionalDao, AddressDao, ContactDao, ProductDao, PerfilDao } from '../dao/EntitiesDao'
import { Product, Perfil, Professional } from '../entities/IEntities'

export interface ProductToSale {
    product: Product;
    perfil: Perfil;
    professional: Professional;
}

export default class ProductSaleRepository {
    public professionalDao: ProfessionalDao
    public addressDao: AddressDao
    public contactDao: ContactDao
    public productDao: ProductDao
    public perfilDao: PerfilDao

    constructor (
      professionalDao?: ProfessionalDao,
      addressDao?: AddressDao,
      contactDao?: ContactDao,
      productDao?: ProductDao,
      perfilDao?: PerfilDao
    ) {
      this.addressDao = addressDao || new AddressDao()
      this.contactDao = contactDao || new ContactDao()
      this.professionalDao = professionalDao || new ProfessionalDao()
      this.productDao = productDao || new ProductDao()
      this.perfilDao = perfilDao || new PerfilDao()
    }

    public getProductToSale = async (tagLink: string): Promise<ProductToSale> => {
      const product = await this.productDao.fetchByTag(tagLink)
      const perfil = await this.perfilDao.fetchById(product.perfilId)
      const professional = await this.professionalDao.fetchById(perfil.professionalId)
      return {
        product: product,
        perfil: perfil,
        professional: professional
      }
    }
}
