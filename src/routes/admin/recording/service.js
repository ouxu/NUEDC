/**
 * Created by out_xu on 17/7/14.
 */
import { API, request, urlEncode } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminContestRecords,
  method: 'get',
  token: true,
  data
})

const fetchSelectOption = async () => request({
  url: API.adminSchools,
  method: 'get',
  token: true
})

const allChecked = async (data) => request({
  url: API.adminResultsUpdate,
  method: 'put',
  token: true,
  data
})

const downloadExcel = async ({filename}, data) => request({
  url: API.adminContestRecordExcel + '?' + urlEncode({...data}),
  method: 'export',
  token: true,
  filename
})

export { fetchTable, fetchSelectOption, allChecked, downloadExcel }
