function orderList (state={},action){
    switch(action.type){
        case "GET_ORDER_LIST_SUCCESS":
            return Object.assign({},state,{
                isFetching:false,
                data:action.response.result.d
            })
        default:
            return state;
    }
}

function orderDetail (state={},action){
    switch(action.type){
        case "GET_ORDER_DETAIL_SUCCESS":
            return Object.assign({},state,{
                isFetching:false,
                data:action.response.result.d
            })
        default:
            return state;
    }
}

function flowList (state={},action){
    switch(action.type){
        case "INTER_FLOW_LIST_SUCCESS":
            return Object.assign({},state,{
                isFetching:false,
                data:action.response.result.d
            })
        default:
            return state;
    }
}

function questionList (state={},action){
    switch(action.type){
        case "QUESTION_LIST_SUCCESS":
            return Object.assign({},state,{
                isFetching:false,
                data:action.response.result.d
            })
            
        default:
            return state;
    }
}
function submitOrder(state={},action){
    switch(action.type){
        case "ADD_ORDER_REQUEST":
            return Object.assign({},state,{
                isFetching:true
            })
        case "ADD_ORDER_SUCCESS":
            return Object.assign({},state,{
                isFetching:false,
                data:action.response.result.d
            })
        case "ADD_ORDER_FAILURE":
            return Object.assign({},state,{
                isFetching:false,
            })
        default:
            return state;
    }
}

export default function order(state={},action){
    return {
        orderList:orderList(state.orderList,action),
        questionList:questionList(state.questionList,action),
        flowList:flowList(state.flowList,action),
        orderDetail:orderDetail(state.orderDetail,action),
        submitOrder:submitOrder(state.submitOrder,action)
    }
}