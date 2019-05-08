import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles/index.less'
import {Link} from 'react-router-dom'
import { Breadcrumb,Row,Col,DatePicker,Button,Radio,Select,Table,Input } from 'antd'
import { getOrderList } from '../../actions/order'
import moment from "moment";
const { RangePicker } = DatePicker;
const Option = Select.Option;
const Search = Input.Search;


export class OrderList extends Component {
  
  constructor(props){
    super(props);
    this.chooseTime = this.chooseTime.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
    this.getWorkOrderList = this.getWorkOrderList.bind(this)
    this.state = {
      day:"today",
      screenDate:[],
      chooseStatus:"0",
      searchVal:''
    }
  }
  componentDidMount(){
    this.getWorkOrderList();
  }
  handleTimeChange(e){// 选择今天 七天 全部
    this.setState({
      day:e.target.value,
      screenDate:[]
    },()=>{
      this.getWorkOrderList();
    })
  }
  chooseTime(date,dateString){// 时间选择器
    this.setState({
      day:"",
      screenDate:date
    },()=>{
      this.getWorkOrderList();
    })
    
  }
  handleStatusChange(val){// 状态筛选
    this.setState({
      chooseStatus:val
    },()=>{
      this.getWorkOrderList();
    })
  }
  handleTableChange({current}){
    this.getWorkOrderList(current);
  }
  getWorkOrderList(page){//获取列表
    const {getOrderList,user} = this.props;
    const {screenDate} = this.state;
    let startDate = "";
    let endDate="";
    switch (this.state.day) {
      case 'today':
        startDate = moment().format("YYYY-MM-DD 00:00:00");
        endDate = moment().format("YYYY-MM-DD hh:mm:ss");
        break;
      case 'seven_day':
        startDate = moment().subtract(7,'d').format("YYYY-MM-DD 00:00:00");
        endDate = moment().format("YYYY-MM-DD hh:mm:ss");
        break;
      default:
        startDate = screenDate[0]
        endDate = screenDate[1]
        break;
    }
    getOrderList(startDate,endDate,this.state.searchVal,this.state.chooseStatus,page||1)
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }
  
  render() {
    const day = this.state.day;

    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
      }
    ];
    
    const columns = [{
      title: '工单编号',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '问题描述',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '问题分类',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '状态',
      dataIndex: 'address1',
      key: 'address1',
    }, {
      title: '提交账户',
      dataIndex: 'address2',
      key: 'address2',
    }, {
      title: '提交时间',
      dataIndex: 'address3',
      key: 'address3',
    }, {
      title: '操作',
      dataIndex: 'address4',
      key: 'address4',
      render:(text,record)=>(
          <Link to={`/detail/${record.key}`}>查看</Link>
      )
    }];

    return (
      <div className="work-order">
        {/* <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb> */}
        <Row className="choose">
            <Radio.Group  className="choose-day" value={day} onChange={this.handleTimeChange}>
              <Radio.Button value="today">今天</Radio.Button>
              <Radio.Button value="seven_day">七天</Radio.Button>
              <Radio.Button value="all">全部</Radio.Button>
            </Radio.Group>
            <RangePicker className="choose-date" disabledDate={this.disabledDate} value={this.state.screenDate} placeholder={['开始日期','结束日期']} onChange={this.chooseTime} />
            <Select className="choose-status" defaultValue="0" style={{ width: 88 }} onChange={this.handleStatusChange}>
              <Option value="0">全部</Option>
              <Option value="1">待处理</Option>
              <Option value="2">处理中</Option>
              <Option value="3">结单</Option>
            </Select>
            <Search className="choose-search"
              placeholder="根据工单号搜索"
              onSearch={value => this.setState({searchVal:value},()=>{this.getWorkOrderList()})}
              style={{ width: 200}}
            />
        </Row>
        <Row>
          <Col className="work-order-table">
            <Table dataSource={dataSource} onChange={this.handleTableChange} columns={columns} />
          </Col>
        </Row>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    const {users} = state
    return {
      user:users.usersDetail.data
    }
}

const mapDispatchToProps = {
  getOrderList
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
