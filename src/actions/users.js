import { FETCH_API } from '../middleware/api'

export const GET_USER_DETAIL_REQUEST = "GET_USER_DETAIL_REQUEST"
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS"
export const GET_USER_DETAIL_FAILURE = "GET_USER_DETAIL_FAILURE"
function getUserDetail(userName,callback){
     return {
        [FETCH_API]: {
            types: [GET_USER_DETAIL_REQUEST, GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_FAILURE],
            endpoint: `/api/center/user/islogined?username=`+userName,
            options: {
                method: 'GET',
            },
            schema: {}
          },
          callback
    }
}

export function getUser(userName, callback) {
    return (dispatch, getState) => {
      return dispatch(getUserDetail(userName, callback))
    }
}
  
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function fetchLogin(body, callback) {
  return {
    [FETCH_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: `/api/center/user/login`,
      options: {
        method: 'POST',
        body,
      },
      schema: {},
    },
    callback
  }
}

export function login(body, callback) {
  return (dispatch) => {
    return dispatch(fetchLogin(body, callback))
  }
}