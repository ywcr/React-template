import { FETCH_API } from '../middleware/api'

//-------------------- 工单列表 -------------------------

export const GET_ORDER_LIST_REQUEST = "GET_ORDER_LIST_REQUEST"
export const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS"
export const GET_ORDER_LIST_FAILURE = "GET_ORDER_LIST_FAILURE"
function getList(startDate,endDate,orderCode,status,callback){
     return {
        [FETCH_API]: {
            types: [GET_ORDER_LIST_REQUEST, GET_ORDER_LIST_SUCCESS, GET_ORDER_LIST_FAILURE],
            endpoint: `/api/order/list?startDate=${startDate}&endDate=${endDate}&orderCode=${orderCode}&status=${status}`,
            options: {
                method: 'GET',
            },
            schema: {}
        },
        callback
    }
}

export function getOrderList(startDate,endDate,orderCode,status,callback) { //获取工单列表
    return (dispatch, getState) => {
      return dispatch(getList(startDate,endDate,orderCode,status,callback))
    }
}

//-------------------- 工单详情 -------------------------

export const GET_ORDER_DETAIL_REQUEST = "GET_ORDER_DETAIL_REQUEST"
export const GET_ORDER_DETAIL_SUCCESS = "GET_ORDER_DETAIL_SUCCESS"
export const GET_ORDER_DETAIL_FAILURE = "GET_ORDER_DETAIL_FAILURE"

function getDetail(id){
    return {
        [FETCH_API]:{
            types:[GET_ORDER_DETAIL_REQUEST,GET_ORDER_DETAIL_SUCCESS,GET_ORDER_DETAIL_FAILURE],
            endpoint:`/api/order/get?id=${id}`,
            options:{
                method:'GET',
            },
            schema:{}
        }
    }
}

export function getOrderDetail(id){ //  
    return (dispatch,getState) => {
        return dispatch(getDetail(id))
    }
}

//-------------------- 提交工单 -------------------------

export const ADD_ORDER_REQUEST = "ADD_ORDER_REQUEST"
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS"
export const ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE"

function addOrder(body){
    return {
        [FETCH_API]:{
            types:[ADD_ORDER_REQUEST,ADD_ORDER_SUCCESS,ADD_ORDER_FAILURE],
            endpoint:`/api/order/add`,
            options:{
                method:'POST',
                body:body
            },
            schema:{}
        }
    }
}

export function submitOrder(body){ //  
    return (dispatch,getState) => {
        return dispatch(addOrder(body))
    }
}

//-------------------- 结单 -------------------------

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST"
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS"
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE"

function updateOrder(id,userName){
    return {
        [FETCH_API]:{
            types:[UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAILURE],
            endpoint:`/api/order/update`,
            options:{
                method:'POST',
                body:{
                    id:id,
                    userName:userName,
                }
            },
            schema:{}
        }
    }
}

export function endOrder(id,userName){ //  
    return (dispatch,getState) => {
        return dispatch(updateOrder(id,userName))
    }
}

//-------------------- 添加回复 -------------------------

export const INTER_FLOW_REQUEST = "INTER_FLOW_REQUEST"
export const INTER_FLOW_SUCCESS = "INTER_FLOW_SUCCESS"
export const INTER_FLOW_FAILURE = "INTER_FLOW_FAILURE"

function fetchReplyOrder(orderId,flowDescription,userName,flowfile){
    return {
        [FETCH_API]:{
            types:[INTER_FLOW_REQUEST,INTER_FLOW_SUCCESS,INTER_FLOW_FAILURE],
            endpoint:`/api/flow/add`,
            options:{
                method:'post',
                body:{
                    orderId: orderId,
                    flowDescription:flowDescription,
                    userName:userName,
                    flowfile:flowfile,
                },
            },
            schema:{}
        }
    }
}

export function replyOrder(orderId,flowDescription,userName,flowfile){ //  
    return (dispatch,getState) => {
        return dispatch(fetchReplyOrder(orderId,flowDescription,userName,flowfile))
    }
}

//-------------------- 沟通列表 -------------------------

export const INTER_FLOW_LIST_REQUEST = "INTER_FLOW_LIST_REQUEST"
export const INTER_FLOW_LIST_SUCCESS = "INTER_FLOW_LIST_SUCCESS"
export const INTER_FLOW_LIST_FAILURE = "INTER_FLOW_LIST_FAILURE"

function fetchInterFlowList(orderId){
    return {
        [FETCH_API]:{
            types:[INTER_FLOW_LIST_REQUEST,INTER_FLOW_LIST_SUCCESS,INTER_FLOW_LIST_FAILURE],
            endpoint:`/api/flow/list?orderId=${orderId}`,
            options:{
                method:'GET',
                
            },
            schema:{}
        }
    }
}

export function interFlowList(orderId){ //  
    return (dispatch,getState) => {
        return dispatch(fetchInterFlowList(orderId))
    }
}

//-------------------- 下载图片 -------------------------

export const DOWNLOAD_FILE_REQUEST = "DOWNLOAD_FILE_REQUEST"
export const DOWNLOAD_FILE_SUCCESS = "DOWNLOAD_FILE_SUCCESS"
export const DOWNLOAD_FILE_FAILURE = "DOWNLOAD_FILE_FAILURE"

function fetchDownloadFile(id){
    return {
        [FETCH_API]:{
            types:[DOWNLOAD_FILE_REQUEST,DOWNLOAD_FILE_SUCCESS,DOWNLOAD_FILE_FAILURE],
            endpoint:`/api/flow/download?id=${id}`,
            options:{
                method:'get',
            },
            schema:{}
        }
    }
}

export function downloadFile(id){
    return (dispatch,getState) => {
        return dispatch(fetchDownloadFile(id))
    }
}

//-------------------- 问题列表 -------------------------

export const QUESTION_LIST_REQUEST = "QUESTION_LIST_REQUEST"
export const QUESTION_LIST_SUCCESS = "QUESTION_LIST_SUCCESS"
export const QUESTION_LIST_FAILURE = "QUESTION_LIST_FAILURE"

function fetchQuestionList(){
    return {
        [FETCH_API]:{
            types:[QUESTION_LIST_REQUEST,QUESTION_LIST_SUCCESS,QUESTION_LIST_FAILURE],
            endpoint:`/api/question/list`,
            options:{
                method:'GET',
            },
            schema:{}
        }
    }
}

export function questionList(){
    return (dispatch,getState) => {
        return dispatch(fetchQuestionList())
    }
}
