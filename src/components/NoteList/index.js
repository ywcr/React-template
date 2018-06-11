import React,{Component} from 'react';
import { Tabs,Button,Input,Modal } from 'antd';
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
        return (
            <div className="NoteList">
                <div className='leftBox'>
                    <Button type='primary' size='large' onClick={() => this.props.history.push('/app_manage/app_create')}>
                        <i className="fa fa-plus" />创建应用
                    </Button>
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
                        <i className='fa fa-undo' />重新部署
                    </Button>
                    <Modal title="重新部署操作" visible={this.state.restarAppsModal}
                    onOk={this.handleRestarAppsOk} onCancel={this.handleRestarAppsCancel}
                    >
                        {/* <StateBtnModal appList={appList} state='Restart' /> */}
                    </Modal>
                </div>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="无状态应用" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="有状态应用" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default withRouter(NoteList);
