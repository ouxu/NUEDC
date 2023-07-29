import { API, request } from '../utils'

const query = async () => {
  return request({
    url: API.tokenVerify,
    method: 'get',
    token: true
  })
}
const exportF = async ({filename}) => {
  return request({
    url: 'http://nuedc-be.acmclub.cn/sysadmin/contest-record/export',
    method: 'export',
    token: true,
    filename
  })
}

export { query, exportF }
