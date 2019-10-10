import { getRndInteger as gRI, getRandomString as gRS } from '../utils/Random'

import TestRepository from './TestRepository'
import { ProductType, Product } from '../models/Entities'
console.clear()
console.log('.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.')

const testRepository = new TestRepository()

const exec = async (): Promise<void> => {
  // --------------------------------------------- Preencher aqui antes
  testRepository.ofPerfilId = 1
  // ---------------------------------------------

  const productTypes: Array<ProductType> = []
  for (let i = 0; i < 15; i++) {
    productTypes.push({ name: gRS(gRI(3, 4), gRI(5, 13)).substring(0, 49), description: gRS(gRI(1, 3), gRI(5, 15)).substring(0, 79) })
  }

  const products: Array<Product> = []
  for (let i = 0; i < 15; i++) {
    const pType = productTypes[gRI(1, productTypes.length - 1)]
    products.push({
      name: gRS(gRI(3, 8), gRI(5, 15)).substring(0, 49),
      description: gRS(gRI(1, 3), gRI(5, 15)).substring(0, 119),
      img: '/imgs/profile/templ/profile-m.jpg',
      readMore: gRS(gRI(10, 50), gRI(5, 15)),
      registerDate: new Date(),
      tagLink: gRS(1, gRI(5, 30)),
      productType: pType,
      productTypeId: pType.id,
      profileId: testRepository.ofPerfilId
    })
  }
  testRepository.productTypes = productTypes
  testRepository.products = products
  await testRepository.InitTest()
}

exec().then(() => {
  console.log('done')
})
