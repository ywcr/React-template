import { getType,genRandomString } from '../common/tools'
import { camelizeKeys } from 'humps'
import { normalize } from 'normalizr'
import cloneDeep from 'lodash/cloneDeep';

function fetchApi(endpoint, options, schema) {
    console.log(endpoint, options, schema,'----endpoint, options, schema')
    if (!options) {
      options = {
        method: 'GET'
      }
    }
    if (!options.credentials) {
      options.credentials = 'same-origin'
      // options.credentials = 'include'
    }
    // The request body can be of the type String, Blob, or FormData.
    // Other data structures need to be encoded before hand as one of these types.
    // https://github.github.io/fetch/#request-body
    const REQUEST_BODY_METHODS = ['POST', 'PUT', 'PATCH']
    // if set options.noContentType true skip set 'Content-Type'
    if (!options.noContentType && REQUEST_BODY_METHODS.indexOf(options.method) > -1) {
      if (!options.headers) options.headers = {}
      if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json'
      }
      let bodyType = getType(options.body)
      if (bodyType === 'object' || bodyType === 'array') {
        options.body = JSON.stringify(options.body)
      }
    }
    // And random string in query for IE(avoid use cache)
    let randomQuery = '_=' + genRandomString()
    if (endpoint.indexOf('?') > -1) {
      endpoint += `&${randomQuery}`
    } else {
      endpoint += `?${randomQuery}`
    }
    // Encode url before fetch(multiple encoding produce errors !!!)
    endpoint = encodeURI(endpoint)
    return fetch(endpoint, options).then(response =>
      response.json().then(json => ({ json, response })).catch(error => {
        return Promise.reject({
          message: '网络或服务暂时不可用，请稍后重试',
        })
      })
    ).then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json)
      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    })
}
export const FETCH_API = Symbol('FETCH API')
export default store => next => action => {
    console.log('wahahhahahha')
    const fetchAPI = action[FETCH_API]
    if (typeof fetchAPI === 'undefined') {
      return next(action)
    }
  
    let { endpoint } = fetchAPI
    const { schema, types } = fetchAPI
  
    if (typeof endpoint === 'function') {
      endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.')
    }
    if (!schema) {
      throw new Error('Specify one of the exported Schemas.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.')
    }
  
    function actionWith(data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[FETCH_API]
      return finalAction
    }
  
    // // Add current.space.namespace for every fetch in headers
    // const space = cloneDeep(store.getState().entities.current.space || {})
    const options = fetchAPI.options || {}
    // options.headers = options.headers || {}
    // // sys admin check user personal space
    // if (space.userName) {
    //   options.headers.onbehalfuser = space.userName
    //   space.namespace = 'default'
    // }
    // options.headers.teamspace = options.headers.teamspace || space.namespace || ''
  
    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType }))
    return fetchApi(endpoint, options, schema).then(
      response => next(actionWith({
        response,
        type: successType
      })),
      error => {
        next(actionWith({
          type: failureType,
          // error: error.message || 'Something bad happened'
          error: error
        }))
      }
    )
  }