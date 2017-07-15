import React from 'react'
import { IndexRoute, Route, Router } from 'dva/router'
import App from './routes/app'
import Login from './routes/user/login'
import NotFound from './routes/404'
import {
  AdminPage,
  ContestManage,
  ContestModel,
  MessageManage,
  MessageModel,
  PrivilegeManage,
  PrivilegeModel,
  ProblemManage,
  ProblemModel,
  RecordingManage,
  RecordingModel,
  SchoolAdminManage,
  SchoolAdminModel,
  SchoolManage,
  SchoolModel,
  TeamManage,
  TeamModel
} from './routes/admin/routes'
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
        <IndexRoute getComponent={ContestManage} onEnter={() => registerModel(app, ContestModel)} />
        <Route
          path='contest' getComponent={ContestManage}
          onEnter={() => registerModel(app, ContestModel)}
        />
        <Route
          path='problem' getComponent={ProblemManage}
          onEnter={() => {
            registerModel(app, ContestModel)
            registerModel(app, ProblemModel)
          }}
        />
        <Route
          path='school' getComponent={SchoolManage}
          onEnter={() => registerModel(app, SchoolModel)}
        />
        <Route
          path='schoolAdmin' getComponent={SchoolAdminManage}
          onEnter={() => registerModel(app, SchoolAdminModel)}
        />
        <Route
          path='team' getComponent={TeamManage}
          onEnter={() => registerModel(app, TeamModel)}
        />
        <Route
          path='recording' getComponent={RecordingManage}
          onEnter={() => registerModel(app, RecordingModel)}
        />
        <Route
          path='privilege' getComponent={PrivilegeManage}
          onEnter={() => registerModel(app, PrivilegeModel)}
        />
        <Route
          path='message' getComponent={MessageManage}
          onEnter={() => registerModel(app, MessageModel)}
        />

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
