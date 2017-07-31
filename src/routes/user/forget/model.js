/**
 * Created by Pororo on 17/7/17.
 */
import modelExtend from 'dva-model-extend'
import { alertModel, loadingModel } from '../../../models/modelExtend'
export default modelExtend(alertModel, loadingModel, {
  namespace: 'forget',
  state: {},
  effects: {},
  reducers: {}
})
