function getUsers (state={},action){
    switch(action.type){
        case 'GET_USER_DETAIL_SUCCESS':
            return Object.assign({}, state,{
                isFetching:false,
                data:action.response.result.d
            } )
        default:
            return state
    }
}

export default function users (state={},action){
    return {
        usersDetail:getUsers(state.getUsers,action)
    }
}