import axios from 'axios'
import { loadState } from '../../../helpers/persist'
import qs from 'qs'
import cache from 'memory-cache'
export const HTTP_NO_CONTENT = 204
export const HTTP_UNAUTHORIZED = 401
export const HTTP_FORBIDDEN = 403
export const HTTP_SERVICE_UNAVAILABLE = 503

export const baseURL = process.env.SERVICE_URL

let regions = []

const cachedFetch = async (url) => {
  const cachedResponse = cache.get(url);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const hours = 24;
    const response = await fetch(url);
    const data = await response.json();
    cache.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
};

async function transformOptions(options = {}, { withToken, region,clientIp,  formData }) {
  const storage = withToken ? loadState("auth") : null
  let token = undefined
  if (storage){
    token = storage.token
  }

  const headers = {
    Accept: 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (clientIp) {
    headers["x-real-ip"] = clientIp
    headers["X-Real-IP"] = clientIp
  }

  if (!regions.length) {
    const url = baseURL + '/countries'
    const regionData = await cachedFetch(url)
    regions = regionData.data
  }

  if (region) {
    const foundCountry = regions.find(item => item.slug === region)
    if (foundCountry) {
      headers["country"] = foundCountry.id
    }
  }


  headers["Custom-Header"] = clientIp ?? "undefined"

 
  return Object.assign({}, {
    headers,
    paramsSerializer: qs.stringify,
    baseURL,
    data: formData
  }, { ...options, params: { ...options.params } })
}

export async function request(options, requestParams) {
  const allOptions = await transformOptions(options, requestParams)

  const response = await axios(allOptions)
  switch (response.status) {
  case HTTP_NO_CONTENT:
    return null
  default:
    return response.data
  }
}

const simpleRequest = method => async (url, params = {}, data, requestParams = {}) => {
  return request({ method, url, params, data, timeout: 15000 }, requestParams)
}

export const get = simpleRequest('get')
export const post = simpleRequest('post')
export const del = simpleRequest('delete')
export const patch = simpleRequest('patch')
export const put = simpleRequest('put')

export default {
  get,
  post,
  patch,
  put,
  del,
  baseURL,
  HTTP_NO_CONTENT,
  HTTP_UNAUTHORIZED,
  HTTP_FORBIDDEN
}
