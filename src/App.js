import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from './logo.svg';
import './App.css';
import Nav from './containers/nav'
import AddNote from './components/AddNote'
import NoteList from './components/NoteList'
const { Header, Content, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
            <Header style={{ position: 'fixed', width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1"><Link to="/" >文件夹</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/list" >列表</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/create" >添加</Link></Menu.Item>
                {/* <Nav/> */}
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
                <Route path="/create" component={AddNote}/>
                <Route path="/list" component={NoteList}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
