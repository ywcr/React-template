import React, { Component } from 'react';
import { Router, Route, Link,withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb,Icon } from 'antd';
import logo from './logo.svg';
import './App.css';
import { Contents, Overall } from './routes'
import SiderBar from './components/SiderBar'
const { Header, Content, Footer } = Layout;
class App extends Component {
  constructor(props){
      super(props)
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  componentWillMount(){
      console.log(this.props.match,'-------location')
  }
  render() {
    const { match, location, history } = this.props
    console.log(location,'------locationlocationlocation')
    return (
        <Layout className="App" style={{ minHeight: '100vh' }}>
            <Overall/>
            <SiderBar />
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                   
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Contents/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
  }
}

export default withRouter(App);
