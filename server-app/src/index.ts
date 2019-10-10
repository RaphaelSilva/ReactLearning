import App from './server/App'
import MemberLoginController from './controllers/LoginController'
import MemberController from './controllers/MemberController'
import ProductSaleController from './controllers/ProductSaleController'
import UploadSystem from './server/UploadSystem'
import OpenFile from './utils/OpenFile'
import ProductServiceController from './controllers/ProductServiceController'

// throw new Error("Method not implemented.");
OpenFile.rootPublic = __dirname.toString() + '\\public'

const port = 3001
App.setStatic(OpenFile.rootPublic)

MemberLoginController.create(App.exp)
MemberController.create(App.exp)
ProductSaleController.create(App.exp)
ProductServiceController.create(App.exp)

UploadSystem.create(App.exp)

App.exp.listen(port, () => {
  console.log(['server Running at [', port, ']'])
})
