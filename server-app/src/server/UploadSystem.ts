import MemberLoginController from '../controllers/LoginController'
import { Application, Request, Response } from 'express'
import OpenFile from '../utils/OpenFile'
import formidable = require('formidable')

export default class UploadSystem {
    static instance: UploadSystem

    static create (app: Application): UploadSystem {
      if (this.instance) return this.instance
      this.instance = new UploadSystem(OpenFile.rootPublic)

      app.post('/api/server/upload', [
        MemberLoginController.instance.isUserAuth,
        this.instance.upload
      ])

      app.get('/api/server/upload', [
        MemberLoginController.instance.isUserAuth,
        this.instance.getAll
      ])

      return this.instance
    }

    private constructor (root) {
      console.log('UploadWasCreated on -> ' + root)
    }

    private defPath = '\\imgs\\profile\\'

    private upload = (req: Request, res: Response): void => {
      const form = new formidable.IncomingForm()
      let newPath = ''
      form.on('file', (_field, file: formidable.File) => {
        newPath = `${this.defPath}${req.userAuth.profileId}\\${file.name}`
        OpenFile.moveFileFrom(file.path, newPath)
      })
      form.on('end', () => {
        res.json(newPath)
      })
      form.parse(req)
    }

    private getAll = (req: Request, res: Response): void => {
      const findOn = `${this.defPath}${req.userAuth.profileId}`
      const allPath = []
      OpenFile.listAllFiles(findOn).forEach(path => {
        allPath.push(findOn + '\\' + path)
      })

      res.json(allPath)
    }
}
