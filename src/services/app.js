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
    url: 'http://localhost:3004/api/form/export?NEUQer2017',
    method: 'export',
    token: true,
    filename
  })
}

export { query, exportF }