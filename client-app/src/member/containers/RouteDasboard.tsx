import React, { Component, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';
import SecurityComponet, { ISecurityComponet } from '../../component/SecurityComponet';
import BodyPerfil from './BodyPerfil';
const BodyDashboard = React.lazy(() => import('./BodyDasboard'))

export default class RouteDasboard extends Component<ISecurityComponet> {
    render() {
        return (
            <Switch>

                <Route path='/member/Perfil' render={(p) =>
                    <SecurityComponet {...p} {...this.props}>
                        <Suspense fallback={<div>Loding.......</div>}>
                            <BodyPerfil {...p} {...this.props} />
                        </Suspense>
                    </SecurityComponet>
                } />

                <Route path={['/member/:text', '/member', '/member/Dashboard']} render={(p) =>
                    <SecurityComponet {...p} {...this.props}>
                        <Suspense fallback={<div>Loding.......</div>}>
                            <BodyDashboard {...p} {...this.props} name='BodyDasboard' />
                        </Suspense>
                    </SecurityComponet>
                } />

            </Switch>
        )
    }
}
