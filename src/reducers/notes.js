function createnote (state={},action){
    switch(action.type){
        case 'ADD_NOTE_SUCCESS':
            return Object.assign({}, state,{
                isFetching:false,
                data:action.body
            } )
        default:
        return state
}
}

export default function notes (state={},action){
    return {
        createnote:createnote(state.createnote,action)
    }
}