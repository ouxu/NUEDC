import React from 'react'
import { IndexRoute, Route, Router } from 'dva/router'
import App from './routes/app'
import Login from './routes/login'
import NotFound from './routes/404'
import { AdminPage, CompetitionManage, CompetitionModal } from './routes/admin/routes'
import Home from './routes/home'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
const Routers = ({history, app}) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='home' component={Home} />
      <Route path='login' component={Login} />
      <Route path='admin' component={AdminPage}>
        <IndexRoute getComponent={CompetitionManage} onEnter={() => registerModel(app, CompetitionModal)} />
        <Route path='competition' getComponent={CompetitionManage}
               onEnter={() => registerModel(app, CompetitionModal)} />
      </Route>
      <Route path='student' component={AdminPage}>
        <Route path='' />
      </Route>
      <Route path='school' component={AdminPage} onEnter={() => registerModel(app, AdminModel)}>
        <Route path='' />
      </Route>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

export default Routers
