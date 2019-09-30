import app from './server/App'
import MemberLoginController from './controllers/LoginController'
import MemberDashboardController from './controllers/DashboardController'

console.clear()

const port = 3001
MemberLoginController.create(app)
MemberDashboardController.create(app)

app.listen(port, () => {
  console.log(['server Running at [', port, ']'])
})
