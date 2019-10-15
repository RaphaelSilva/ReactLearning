import { Request, Response, Application } from 'express'
import { AController } from './AController'
import ProductServiceRepository from './repository/ProductServiceRepository'
import MemberLoginController from './LoginController'

export default class ProductServiceController extends AController {
    static instance: ProductServiceController

    static create (app: Application): ProductServiceController {
      if (this.instance) return this.instance
      this.instance = new ProductServiceController()
      app.get('/api/product/list', [
        MemberLoginController.instance.isUserAuth,
        this.instance.listAll
      ])

      app.get('/api/product/list/:text', [
        MemberLoginController.instance.isUserAuth,
        this.instance.findProducts
      ])

      app.post('/api/product/save/:productTag', [
        this.instance.addOne
      ])

      return this.instance
    }

    private productServiceRepository: ProductServiceRepository

    constructor () {
      super()
      this.productServiceRepository = new ProductServiceRepository()
    }

    private listAll = (req: Request, res: Response): void => {
      this.productServiceRepository.listProduct(req.userAuth.profileId)
        .then((productTyped) => {
          res.json(productTyped)
        }).catch((error) => {
          this.sendError(res, error)
        })
    }

    private findProducts = (req: Request, res: Response): void => {
      if (req.params.text) {
        this.productServiceRepository.findProducts(req.userAuth.profileId, req.params.text)
          .then((productTyped) => {
            res.json(productTyped)
          }).catch((error) => {
            this.sendError(res, error)
          })
      } else {
        this.sendError(res, new Error('Url mau formada'), 'Url mau formada')
      }
    }

    private addOne = (req: Request, res: Response): void => {
      console.log('aqui')

      res.json({ msg: 'success' })
    }
}
