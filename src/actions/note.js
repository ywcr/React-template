import { FETCH_API } from '../middleware/api'

export const ADD_NOTE_REQUEST = "ADD_NOTE_REQUEST"
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS"
export const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE"
function note(body,callback){
    console.log(body,'-----addNote')
    return {
        [FETCH_API]: {
            types: [ADD_NOTE_REQUEST, ADD_NOTE_SUCCESS, ADD_NOTE_FAILURE],
            endpoint: `/admin/ispwset`,
            options: {
                method: 'POST',
                body
            },
            schema: {}
          },
          callback
    }
}

export function addNotes(body, callback) {
    return (dispatch, getState) => {
      return dispatch(note(body, callback))
    }
  }
  