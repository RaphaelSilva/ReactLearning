import { Request, Response, Application } from 'express'
import { AController } from './AController'
import ProductServiceRepository from './repository/ProductServiceRepository'
import MemberLoginController from './LoginController'
import { Product } from '../models/Entities'
import ADao from '../dao/ADao'

export default class ProductServiceController extends AController {
  static instance: ProductServiceController

  static create (app: Application, routePrefix = '/api/product'): ProductServiceController {
    if (this.instance) return this.instance
    this.instance = new ProductServiceController()
    app.get(`${routePrefix}/list`, [
      MemberLoginController.instance.isUserAuth,
      this.instance.listAll
    ])

    app.get(`${routePrefix}/list/:text`, [
      MemberLoginController.instance.isUserAuth,
      this.instance.findProducts
    ])

    app.get(`${routePrefix}/listTypes/`, [
      MemberLoginController.instance.isUserAuth,
      this.instance.listTypes
    ])

    app.post(`${routePrefix}/save`, [
      MemberLoginController.instance.isUserAuth,
      this.instance.save
    ])

    app.get(`${routePrefix}/valideteTagLink/:tagLink/:productId`, [
      MemberLoginController.instance.isUserAuth,
      this.instance.valideteTagLink
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

  private listTypes = (req: Request, res: Response): void => {
    this.productServiceRepository.productTypeDao.list()
      .then((productType) => {
        res.json(productType)
      }).catch((error) => {
        this.sendError(res, error, 'Não foi possivel recuperar os tipos de produtos [PSCLT]')
      })
  }

  private save = (req: Request, res: Response): void => {
    const product = req.body as Product
    product.profileId = req.userAuth.profileId
    this.productServiceRepository.update(product).then((result) => {
      this.sendResponseView(res, result)
    }).catch(error => this.sendError(res, error,
      'Problemas no servidor para atualizar professional [PSCSP]'))
  }

  private valideteTagLink = (req: Request, res: Response): void => {
    const value = req.params.tagLink
    const productId = req.params.productId
    ADao.debug = true
    this.productServiceRepository.checkTagLink(value, parseInt(productId)).then((list) => {
      if (list.length === 0) {
        this.sendResponseView(res, {
          variant: 'success',
          message: 'Seu link está valido'
        })
      } else {
        this.sendResponseView(res, {
          variant: 'warning',
          message: 'Seu link encontra-se em uso'
        })
      }
    })
  }
}
