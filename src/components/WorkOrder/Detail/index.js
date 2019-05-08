import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row,Col,Button} from 'antd'
import CommentWorkOrder from './Discuss/index'
import './styles/index.less' 

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
    console.log("获取工单详情",this.props.match.params.id)
  }
  closeOrder(){//结单
    console.log('结束工单')
    //结束工单 发送信息给后台 某某某关闭工单
  }

  render() {
    return (
      <div className="work-order-detail">
        <Row className="header-message">
            <Col className="message" span={20}>
                <span>工单编号:ZTJR20190001</span>
                <span>提单人:王小二</span>
                <span>联系电话:18616741211</span>
                <span>提交时间:2019-04-10 09：12</span>
                <span>工单状态:处理中</span>
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
        <Row className="commentLog">
            <CommentWorkOrder isEditor={true}></CommentWorkOrder>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkOrderDetail)
