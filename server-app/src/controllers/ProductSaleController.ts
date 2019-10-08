import { Request, Response, Application } from 'express'
import ProductSaleRepository from './ProductSaleRepository'
import { AController } from './AController'

export default class ProductSaleController extends AController {
  static instance: ProductSaleController

  static create (app: Application): ProductSaleController {
    if (this.instance) return this.instance
    this.instance = new ProductSaleController()
    app.get('/api/productToSale/:productTag', [
      this.instance.getProductToSale
    ])

    return this.instance
  }

  private productSaleRepository: ProductSaleRepository

  private constructor () {
    super()
    this.productSaleRepository = new ProductSaleRepository()
  }

  private getProductToSale = (req: Request, res: Response): void => {
    if (req.params.productTag) {
      this.productSaleRepository.getProductToSale(req.params.productTag)
        .then((productToSale) => {
          res.json(productToSale)
        }).catch((error) => this.sendError(res, error))
    } else {
      this.sendError(res, new Error('Parametros não foram bem formatados'))
    }
  }
}
