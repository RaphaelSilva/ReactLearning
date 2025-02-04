import { Application } from 'express'
import cookiesMiddleware from 'universal-cookie-express'
import cors = require('cors')
import express = require('express')

class App {
    public exp: Application

    public constructor () {
      this.exp = express()
      this.middlewares()
    }

    private middlewares (): void {
      this.exp.use(express.json())
      this.exp.use(cors())
      this.exp.use(cookiesMiddleware())
    }
}

export default new App().exp
