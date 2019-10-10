import { ProfessionalDao, AddressDao, ContactDao, ProductDao, ProfileDao } from '../../dao/EntitiesDao'
import { ProductToSale } from '../../models/ViewModels'

export default class ProductSaleRepository {
    public professionalDao: ProfessionalDao
    public addressDao: AddressDao
    public contactDao: ContactDao
    public productDao: ProductDao
    public profileDao: ProfileDao

    constructor (
      professionalDao?: ProfessionalDao,
      addressDao?: AddressDao,
      contactDao?: ContactDao,
      productDao?: ProductDao,
      profileDao?: ProfileDao
    ) {
      this.addressDao = addressDao || new AddressDao()
      this.contactDao = contactDao || new ContactDao()
      this.professionalDao = professionalDao || new ProfessionalDao()
      this.productDao = productDao || new ProductDao()
      this.profileDao = profileDao || new ProfileDao()
    }

    public getProductToSale = async (tagLink: string): Promise<ProductToSale> => {
      const product = await this.productDao.fetchByTag(tagLink)
      const profile = await this.profileDao.fetchById(product.profileId)
      const professional = await this.professionalDao.fetchById(profile.professionalId)
      return {
        product: product,
        profile: profile,
        professional: professional
      }
    }
}
