import { Response } from 'express'

export class AController {
    protected sendError = (res: Response, error, message = 'Não foi possivel executar a operação'): void => {
      res.status(500).send({
        mensage: message,
        error: error
      })
    }
}
