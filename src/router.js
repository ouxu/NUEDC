import React from 'react'
import { IndexRoute, Route, Router } from 'dva/router'
import App from './routes/app'
import NotFound from './routes/404'

import { Login, Register } from './routes/user/routes'
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
import {
  SchoolPage,
  SchoolInfoManage, SchoolInfoModel,
  JoinedTeamsManage, JoinedTeamsModel,
  RecommendExpertsManage, RecommendExpertsModel,
  SchoolResultManage, SchoolResultModel
} from './routes/school/routes'
import {
  StudentPage,
  StudentProblemManage, StudentProblemModel,
  ChooseProblemManage, ChooseProblemModel
} from './routes/student/routes'
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
      <Route path='register' getComponent={Register} />
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
      <Route path='student' component={StudentPage}>
        <IndexRoute getComponent={StudentProblemManage} onEnter={() => {
          registerModel(app, ContestModel)
          registerModel(app, StudentProblemModel)
        }} />
        <Route
          path='problem' getComponent={StudentProblemManage}
          onEnter={() => {
            registerModel(app, ContestModel)
            registerModel(app, StudentProblemModel)
          }}
        />
        <Route
          path='choose' getComponent={ChooseProblemManage}
          onEnter={() => {
            registerModel(app, ContestModel)
            registerModel(app, ChooseProblemModel)
          }}
        />
      </Route>
      <Route path='school' component={SchoolPage}>
        <IndexRoute getComponent={SchoolInfoManage} onEnter={() => registerModel(app, SchoolInfoModel)} />
        <Route
          path='schoolInfo' getComponent={SchoolInfoManage}
          onEnter={() => registerModel(app, SchoolInfoModel)}
        />
        <Route
          path='joinedTeams' getComponent={JoinedTeamsManage}
          onEnter={() => registerModel(app, JoinedTeamsModel)}
        />
        <Route
          path='schoolResult' getComponent={SchoolResultManage}
          onEnter={() => registerModel(app, SchoolResultModel)}
        />
        <Route
          path='recommendExperts' getComponent={RecommendExpertsManage}
          onEnter={() => registerModel(app, RecommendExpertsModel)}
        />
      </Route>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

export default Routers
