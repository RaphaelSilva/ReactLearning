import { Response } from 'express'
import { ResponseView } from '../models/ViewModels'

export class AController {
    protected sendError = (res: Response, error, message = 'Não foi possivel executar a operação'): void => {
      res.status(500).send({
        message: message,
        variant: 'error'
      } as ResponseView)
    }

    protected sendResponseView = (res: Response, rv: ResponseView): void => {
      res.json(rv)
    }
}
