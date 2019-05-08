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
        this.skip = this.skip.bind(this)
        this.state = {
            collapsed : false
        }
    }
    onCollapse(collapsed){
        this.setState({ collapsed });
    }
    skip({item, key, keyPath}){
        this.props.history.push(key)
    }
    render() {
        return (
        <div>
            <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            >
            <div className="logo" >
                工单系统
            </div>
            <Menu onClick={this.skip} theme="dark" defaultSelectedKeys={[this.props.location.pathname]} mode="inline">
                <Menu.Item key="/">
                    <Icon type="pie-chart" />
                    <span>工单列表</span>
                </Menu.Item>
                <Menu.Item key="/submit">
                    <Icon type="user" />
                    <span>提交工单</span>     
                </Menu.Item>
            </Menu>
            </Sider>
        </div>
        )
    }
}

export default withRouter(siderBar)
