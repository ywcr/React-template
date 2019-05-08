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
                        <i className='fa fa-play' />启动
                    </Button>
                    <Modal title="启动操作" visible={this.state.startAppsModal}
                    onOk={this.handleStartAppsOk} onCancel={this.handleStartAppsCancel}
                    >
                        {/* <StateBtnModal appList={appList} state='Running' /> */}
                    </Modal>
                    <Button type='ghost' size='large' onClick={() => this.batchStopApps()} disabled={this.state.checked}>
                        <i className='fa fa-stop' />停止
                    </Button>
                    <Modal title="停止操作" visible={this.state.stopAppsModal}
                    onOk={this.handleStopAppsOk} onCancel={this.handleStopAppsCancel}
                    >
                        {/* <StateBtnModal appList={appList} state='Stopped' /> */}
                    </Modal>
                    <Button type='ghost' size='large' onClick={() => this.loadData(this.props,null,true)}>
                        <i className='fa fa-refresh' />刷新
                    </Button>
                    <Button type='ghost' size='large' onClick={() => this.batchDeleteApps()} disabled={this.state.checked}>
                        <i className='fa fa-trash-o' />删除
                    </Button>
                    <Modal title="删除操作" visible={this.state.deleteAppsModal}
                    onOk={this.handleDeleteAppsOk} onCancel={this.handleDeleteAppsCancel}
                    >
                        {/* <StateBtnModal appList={appList} state='Delete' cdRule={this.props.cdRule} settingList={SettingListfromserviceorapp} callback={this.handleCheckboxvalue} /> */}
                    </Modal>
                    <Button type='ghost' size='large' onClick={() => this.batchRestartApps()} disabled={this.state.checked}>
                        <i className='fa fa-undo' />重启
                    </Button>
                    <Modal title="重新部署操作" visible={this.state.restarAppsModal}
                    onOk={this.handleRestarAppsOk} onCancel={this.handleRestarAppsCancel}
                    >
                        {/* <StateBtnModal appList={appList} state='Restart' /> */}
                    </Modal>
                    <Button type='ghost' size='large' onClick={() => this.batchRestartApps()} disabled={this.state.checked}>
                        <i className='fa fa-undo' />更多操作
                    </Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
export default withRouter(NoteList);
