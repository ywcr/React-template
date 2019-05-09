import { getType,genRandomString } from '../common/tools'
import { camelizeKeys } from 'humps'
import { normalize } from 'normalizr'
import { message } from 'antd'

function fetchApi(endpoint, options, schema) {
    if (!options) {
      options = {
        method: 'GET',
      }
    }
    if (!options.credentials) {
      options.credentials = 'same-origin'
    }
    options.credentials = 'include' // fetch设置携带cookie

    // ------ 处理请求类型，设置headers 处理json数据转为string对象 ------

    const REQUEST_BODY_METHODS = ['POST', 'PUT', 'PATCH']
      // if set options.noContentType true skip set 'Content-Type'
    if (!options.noContentType && REQUEST_BODY_METHODS.includes(options.method)) {
      if (!options.headers) options.headers = {}
      if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      //   let bodyType = getType(options.body)
      //   if (bodyType === 'object' || bodyType === 'array') {
      //     options.body = JSON.stringify(options.body)
      //   }

      // ------ 格式化数据 format data ------
      options.body =  new URLSearchParams(options.body).toString();
    }

    if(endpoint.includes('flow/add')){ // 添加回复 处理数据格式
      var formData  = new FormData();
      for(var name in options.body) {
        formData.append(name, options.body[name]);
      }
      options.body =  formData;
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
      if(json.c!=200){
        if(json.c==401){
          message.error(json.m)
          window.location.href="http://me.enncloud.cn:8080/center/user/tologin"
        }else{
          message.error(json.m)
        }
      }
      const camelizedJson = camelizeKeys(json)
      return Object.assign({},
        normalize(camelizedJson, schema)
      )
    }).catch(function(error) {
      console.log('request failed', error)
      message.error(error.message)
      return Promise.reject(error)
      // return Promise.reject(error.message)
      // {error: "Internal Server Error"
      // message: "No message available"
      // path: "/order/add"
      // status: 500
      // timestamp: "2019-05-07T06:46:11.092+0000"}
    })
}
export const FETCH_API = Symbol('FETCH API')
export default store => next => action => {
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