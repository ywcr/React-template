import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Router, Route, Link,withRouter,Switch } from 'react-router-dom'

import './styles/index.less'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export class siderBar extends Component {
    constructor(props){
        super(props)
        this.onCollapse = this.onCollapse.bind(this)
        this.state = {
            collapsed : false
        }
    }
    onCollapse(collapsed){
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
        <div>
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[this.props.location.pathname]} mode="inline">
                <Menu.Item key="/">
                    <Icon type="pie-chart" />
                    <Link to={`/`}>总览</Link>
                </Menu.Item>
                
                <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>应用管理</span></span>}
                >
                <Menu.Item key="/application">
                    <Link to={`/application`}>应用</Link>     
                </Menu.Item>
                <Menu.Item key="/service">
                    <Link to={`/service`}>服务</Link>     
                </Menu.Item>
                <Menu.Item key="/vessel">
                    <Link to={`/vessel`}>容器</Link>     
                </Menu.Item>
                <Menu.Item key="/storage">
                    <Link to={`/storage`}>存储</Link>     
                </Menu.Item>
                <Menu.Item key="/snapshot">
                    <Link to={`/snapshot`}>快照</Link>     
                </Menu.Item>
                <Menu.Item key="/service_config">
                    <Link to={`/service_config`}>服务配置</Link>     
                </Menu.Item>
                <Menu.Item key="/network_isolation">
                    <Link to={`/network_isolation`}>网络隔离</Link>     
                </Menu.Item>
                </SubMenu>
                <SubMenu
                key="sub2"
                title={<span><Icon type="team" /><span>Team</span></span>}
                >
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
                </Menu.Item>
            </Menu>
            </Sider>
        </div>
        )
    }
}

export default withRouter(siderBar)
