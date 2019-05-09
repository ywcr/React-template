import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row,Col,Button,Modal, message} from 'antd'
import CommentWorkOrder from './Discuss/index'
import {getOrderDetail,endOrder} from '../../../actions/order'
import moment from 'moment';
import cookie from 'react-cookies';
import './styles/index.less' 
const confirm = Modal.confirm;

export class WorkOrderDetail extends Component {
  constructor(props){
    super(props);
    this.closeOrder = this.closeOrder.bind(this)
    this.getDetail = this.getDetail.bind(this)
    this.state = {

    }
  }
  componentDidMount(){
    this.getDetail()
  }
  getDetail(){//获取工单详情
    const {getOrderDetail,match} = this.props;
    getOrderDetail(match.params.id)
  }
  closeOrder(){//结单
    const {endOrder,match} = this.props;
    //结束工单 发送信息给后台 某某某关闭工单
    confirm({
      title:'结束工单',
      content:"确认结束工单吗？",
      onOk:()=>{
        endOrder(match.params.id,cookie.load('lgname')).then(({response})=>{
          return response.result;
        }).then((data)=>{
          if(data.c==200){
            message.success('已结单！')
            this.getDetail();
          }
        })
      },
      onCancel:()=>{

      }
    })
  }
  orderStatus(status){
    switch(status){
      case 1:
        return "待处理"
        break;
      case 2:
        return "处理中"
        break;
      case 3:
        return "结单"
        break;
    }
  }
  render() {
    const {orderDetail} = this.props;
    return (
      <div className="work-order-detail">
        <Row className="header-message">
            <Col className="message" span={20}>
                <span>工单编号: {orderDetail.orderCode}</span>
                <span>提单人: {orderDetail.realName}</span>
                <span>联系电话: {orderDetail.phoneNumber}</span>
                <span>提交时间: {moment(orderDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                <span>工单状态: {this.orderStatus(orderDetail.status)}</span>
            </Col>
            <Col span={4}>
                <Button className="button-end" onClick={this.closeOrder} type="primary">结单</Button>
            </Col>
            {/* 说明
                状态：待处理、处理中、结单

                1、受理人未回复，处于待处理

                2、受理人有回复记录、处于处理中

                3、触发结单、处于结单。 */}
        </Row>
        <Row className="header-message" style={{borderBottom:'1px solid #ccc',paddingBottom:10}}>
          <Col><span>工单描述: {orderDetail.orderDescription}</span></Col>
        </Row>
        <Row className="commentLog">
            <CommentWorkOrder orderId={this.props.match.params.id} isEditor={orderDetail.status!=3}></CommentWorkOrder>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    const {order,users} = state
    return {
      user:users.usersDetail.data,
      orderDetail:order.orderDetail.data||[]
    }
}

const mapDispatchToProps = {
  getOrderDetail,endOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderDetail)
