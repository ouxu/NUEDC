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
    url: 'http://nuedc.hrsoft.net/school/admin/team/export?contest_id=1',
    method: 'export',
    token: true,
    filename
  })
}

export { query, exportF }