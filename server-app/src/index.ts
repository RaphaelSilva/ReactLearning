import App from './server/App'
import MemberLoginController from './controllers/LoginController'
import MemberController from './controllers/MemberController'
import ProductSaleController from './controllers/ProductSaleController'
console.clear()

// throw new Error("Method not implemented.");

const port = 3001
MemberLoginController.create(App.exp)
MemberController.create(App.exp)
ProductSaleController.create(App.exp)

const root = __dirname.toString() + '\\public\\'
console.log(root)
App.setStatic(root)

App.exp.listen(port, () => {
  console.log(['server Running at [', port, ']'])
})
