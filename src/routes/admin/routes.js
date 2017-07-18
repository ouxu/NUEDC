/**
 * Created by out_xu on 17/7/13.
 */
import AdminPage from './index'

import { ContestManage, ContestModel } from './contest/route'
import { ProblemManage, ProblemModel } from './problem/route'
import { SchoolManage, SchoolModel } from './school/route'
import { SchoolAdminManage, SchoolAdminModel } from './schoolAdmin/route'
import { ContestRecord, ContestRecordModel } from './contestRecord/route'
import { RecordingManage, RecordingModel } from './recording/route'
import { PrivilegeManage, PrivilegeModel } from './privilege/route'
import { MessageManage, MessageModel } from './message/route'
import { AdminNews, AdminNewsModel,NewsEditModel,NewsEdit } from './news/route'

export {
  AdminPage,
  ContestManage, ContestModel,
  ProblemManage, ProblemModel,
  SchoolManage, SchoolModel,
  SchoolAdminManage, SchoolAdminModel,
  ContestRecord, ContestRecordModel,
  RecordingManage, RecordingModel,
  PrivilegeManage, PrivilegeModel,
  MessageManage, MessageModel,
  AdminNews, AdminNewsModel,
  NewsEdit,NewsEditModel
}