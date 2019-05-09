import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row,Col,Button,Card,Modal,Form,Input,message} from 'antd'
import { submitOrder,questionList } from '../../../actions/order'
import './styles/index.less'
const { TextArea } = Input

export class SubmitWorkOrder extends Component {
  constructor(props){
    super(props)
    this.showModal = this.showModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      submitting:false,
      issueType:"",
      visible:false,
      orderType:"",
      type:""
    }
  }
  componentDidMount(){
    const {questionList} = this.props;
    questionList();
    if(this.props.match.params.type==1){
      this.showModal();
    }
  }
  showModal(item){
    const orderType = this.props.match.params.type
    this.setState({
      visible: true,
      issueType:orderType==1?"合作招募":item.questionTitle,
      orderType:orderType||2,
      questionId:orderType==1?"":item.id,
      type:orderType==1?"业务中台合作伙伴招募":"提交工单"
    });
  }
  handleSubmit(e){
    const { submitOrder } = this.props;
    e.preventDefault();
    const {validateFields} = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          submitting:true
        })
        values.orderType = this.state.orderType
        values.questionId = this.state.questionId
        submitOrder(values).then(({response})=>{
          return response.result;
        }).then((data)=>{
          if(data.c === 200){
            this.setState({
              visible:false
            })
            if(this.props.match.params.type==1){
              this.props.history.push("/submit/2")
            }
            message.success(data.m)
          }else{
            this.setState({
              submitting:false
            })
            message.error(data.m)
          }
        }).catch((error)=>{
          console.log(error,'-------error')
        })
      }
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { questionData } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 5,
          offset: 5,
        },
      },
    };
    const question = questionData?questionData.map((item)=>{
          return (
            <Col span={8}>
              <Card
                className="problem-block"
                title={item.questionTitle}
                size="small"
                extra={<a onClick={()=>{this.showModal(item)}}>提问</a>}
              >
                <p style={{'minHeight':60}}>{item.questionDescription}</p>
              </Card>
            </Col>
          )
      }):''
    return (
      <div className="submit-work-order">
        <h3 className="title">请选择问题的所属服务</h3>
        <Row gutter={50} style={{marginBottom:20}}>
          {question}
        </Row>
        <Modal
          title={this.state.type}
          visible={this.state.visible}
          onCancel={()=>{this.setState({visible:false})}}
          footer={null}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          
              <Form.Item
                label="分类"
              >
                {this.state.issueType}
              </Form.Item>
              <Form.Item
                label="描述"
              >
                {getFieldDecorator('orderDescription', {
                  rules: [{
                    required: true, message: '请输入描述信息',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <TextArea placeholder="请输入描述信息" autoSize={{minRows:2,maxRows:4}}  />
                )}
              </Form.Item>
              <Form.Item
                label="手机号"
              >
                {getFieldDecorator('phoneNumber', {
                  rules: [{
                    required: true,message:"请输入手机号"
                  },{
                    validator:(rule, value, callback)=>{
                      if(!value){
                        callback();
                      }else if(!(/^1[34578]\d{9}$/.test(value))){
                        callback("请输入正确的手机号")
                      }else{
                        callback();
                      }
                    }
                  }],
                })(
                  <Input placeholder="请输入手机号" />
                )}
              </Form.Item>
              <Form.Item
                label="邮箱"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '请输入邮箱账号',
                  }, {
                    required: true, message: '请输入邮箱账号',
                  }],
                })(
                  <Input placeholder="请输入邮箱" />
                )}
              </Form.Item>
              <Form.Item
                label="提前阅读"
              >
                <Row>
                  <Col>1、<a target="_blank" rel="noopener noreferrer" href="http://me.enncloud.cn/doc/service1">查看接入服务规范</a></Col>
                  <Col>2、<a target="_blank" rel="noopener noreferrer" href="http://me.enncloud.cn/doc/service1">查看服务接入指南</a></Col>
                  <Col>3、<a target="_blank" rel="noopener noreferrer" href="http://me.enncloud.cn/doc/service1">查看中台合作服务协议</a></Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" loading={this.state.submitting} htmlType="submit">提交工单</Button>
              </Form.Item>
            </Form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
    const {users,order} = state;
    const {usersDetail} = users;
    const {questionList} = order;
    return {
      userDetail:usersDetail.data,
      questionData:questionList.data
    }
}

const mapDispatchToProps = {
  submitOrder,questionList
}

SubmitWorkOrder = Form.create()(SubmitWorkOrder)

export default connect(mapStateToProps, mapDispatchToProps)(SubmitWorkOrder)
