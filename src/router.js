import React from 'react'
import { IndexRoute, Route, Router } from 'dva/router'
import App from './routes/app'
import NotFound from './routes/404'

import { Login, Register } from './routes/user/routes'
import {
  AdminNews,
  AdminNewsModel,
  AdminPage,
  ContestManage,
  ContestModel,
  ContestRecord,
  ContestRecordModel,
  MessageManage,
  MessageModel,
  NewsEdit,
  NewsEditModel,
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
  TeamAdminManage
} from './routes/admin/routes'
import {
  JoinedTeamsManage,
  JoinedTeamsModel,
  SchoolInfoManage,
  SchoolInfoModel,
  SchoolPage,
  SchoolResultManage,
  SchoolResultModel
} from './routes/school/routes'
import {
  StudentPage,
  StudentScoreManage, StudentScoreModel,
  StudentProblemManage, StudentProblemModel,
  StudentSignUpManage, StudentSignUpModel
} from './routes/student/routes'
import Home from './routes/home/route'
import { News, NewsContent } from './routes/news/route'
import { Notice, NoticeContent } from './routes/notices/route'

import Download from './routes/download'
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
const Routers = ({history, app}) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute getComponent={Home} />
      <Route path='home' getComponent={Home} />
      <Route path='download' component={Download} />
      <Route path='news' getComponent={News}>
        <Route path=':id' getComponent={NewsContent} />
      </Route>
      <Route path='news' getComponent={News} />
      <Route path='notices' getComponent={Notice}>
        <Route path=':id' getComponent={NoticeContent} />
      </Route>
      <Route path='news' getComponent={News} />
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
          path='team' getComponent={TeamAdminManage}
          onEnter={() => {
            registerModel(app, ContestModel)
            registerModel(app, ContestRecordModel)
          }}
        />
        <Route
          path='schoolAdmin' getComponent={SchoolAdminManage}
          onEnter={() => registerModel(app, SchoolAdminModel)}
        />
        <Route
          path='contestRecord' getComponent={ContestRecord}
          onEnter={() => {
            registerModel(app, ContestModel)
            registerModel(app, ContestRecordModel)
          }}
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
        <Route
          path='news' getComponent={AdminNews}
          onEnter={() => registerModel(app, AdminNewsModel)}
        />
        <Route
          path='news/edit' getComponent={NewsEdit}
          onEnter={() => registerModel(app, NewsEditModel)}
        />

      </Route>
      <Route path='student' component={StudentPage}>
        <IndexRoute getComponent={StudentSignUpManage} onEnter={() => {
          registerModel(app, StudentSignUpModel)
        }} />
        <Route
          path='problem' getComponent={StudentProblemManage}
          onEnter={() => {
            registerModel(app, StudentProblemModel)
          }}
        />
        <Route path='score' getComponent={StudentScoreManage}
               onEnter={() => {
                 registerModel(app, StudentScoreModel)
               }}
        />
        <Route path="signup" getComponent={StudentSignUpManage}
               onEnter={() => {
                 registerModel(app, StudentSignUpModel)
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
      </Route>
    </Route>
    <Route path='*' component={NotFound} />
  </Router>
)

export default Routers
