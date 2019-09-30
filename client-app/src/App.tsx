import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './component/PrivateRoute'
import SecurityComponet, { ISecurityComponet } from './component/SecurityComponet'

const Home = React.lazy(() => import('./Home'))
const MemberDashboard = React.lazy(() => import('./member/Dashboard'))
const MemberLogin = React.lazy(() => import('./member/MemberLogin'))

export default function App() {

  const memberProps: ISecurityComponet = {
    cookieName:'userMemberAuth',
    urlredirect:'/memberLogin'
  }
  
  return (
    <Router>
      <Switch>

        <Route path={['/', '/Home']} exact render={() =>
          <Suspense fallback={<div>Loding.......</div>}>
            <Home />
          </Suspense>
        } />

        <Route path='/member' 
          render={(props) =>
            <SecurityComponet location={props.location} {...memberProps}>
              <Suspense fallback={<div>Loding.......</div>}>
                <MemberDashboard {...props} {...memberProps} name='MemberDasboard'/>
              </Suspense>
            </SecurityComponet>
          } />


        <Route path='/memberLogin' exact render={(props) =>
          <Suspense fallback={<div>Loding.......</div>}>
            <MemberLogin {...props} />
          </Suspense>
        } />

        <PrivateRoute path='/adm' exact cookieName='userAdmAuth' urlredirect='/adm/login' render={(props) =>
          <Suspense fallback={<div>Loding.......</div>}>
            <MemberDashboard {...props} cookieName='userAdmAuth' urlredirect='/admLogin' />
          </Suspense>
        } />


        <Route path='/assets/:idProduto' exact render={() =>
          <Suspense fallback={<div>Loding.......</div>}><Home />
          </Suspense>
        } />

      </Switch>
    </Router >
  )
}
