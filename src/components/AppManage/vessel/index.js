import React,{Component} from 'react';
import { Tabs,Button,Input,Modal,Table, Icon, Divider } from 'antd';
import { Router, Route, Link,withRouter } from 'react-router-dom'

const TabPane = Tabs.TabPane;

class NoteList extends Component{
    constructor(props){
        super(props)
        this.callback = this.callback.bind(this)
        this.state={
            
        }
    }
    callback(key) {
        console.log(key);
    }
    render(){
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;">Action 一 {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
                <Divider type="vertical" />
                <a href="javascript:;" className="ant-dropdown-link">
                  More actions <Icon type="down" />
                </a>
              </span>
            ),
          }];
          
          const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];
        return (
            <div className="NoteList">
                <div className='leftBox'>
                    <Button type='ghost' size='large' onClick={this.batchStartApps} disabled={this.state.checked}>
                        <i className='fa fa-play' />重新分配
                    </Button>
                    
                    <Button type='ghost' size='large' onClick={() => this.loadData(this.props,null,true)}>
                        <i className='fa fa-refresh' />刷新
                    </Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
export default withRouter(NoteList);
