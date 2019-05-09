import React, { Component } from 'react';
import { Router, Route, Link,withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Icon,Row,Col,LocaleProvider } from 'antd';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { getUser } from './actions/users'
import { Contents, Overall } from './routes'
import SiderBar from './components/SiderBar'
import cookie from 'react-cookies'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


const { Header, Content, Footer } = Layout;

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

class App extends Component {
  constructor(props){
      super(props)
      this.exit = this.exit.bind(this);
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  componentWillMount(){
      this.props.getUser(cookie.load('lgname')).then((res)=>{
      });
  }
  exit(){// 退出登录
    deleteAllCookies();
    window.location.href = "http://me.enncloud.cn"
  }
  render() {
    const { match, location, history,user } = this.props
    const menu = (
        <Menu>
          <Menu.Item key="0" disabled>
            账号信息
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <a onClick={this.exit} >退出登录</a>
          </Menu.Item>
          {/* <Menu.Item key="3">3rd menu item</Menu.Item> */}
        </Menu>
    );
      
    return (
        <Layout className="App" style={{ minHeight: '100vh',minWidth:1024,scrollX:"scroll" }}>
            <SiderBar />
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8}></Col>
                            <Col span={6}></Col>
                            <Col span={2}>
                                {cookie.load('lgname')?<Dropdown overlay={menu} trigger={['click']}>
                                    <span className="ant-dropdown-link" href="#">
                                        {cookie.load('lgname')}<Icon type="down" />
                                    </span>
                                </Dropdown>:<Link to="/login" style={{color:"#000"}} >登录</Link>}
                            </Col>
                        </Row>
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{minHeight: 360 }}>
                        <Contents/>
                        <Overall/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
  }
}

const mapStateToProps = (state) => {
    const { usersDetail } = state.users
    return {
        user:usersDetail.data
    }
}

export default withRouter(connect(mapStateToProps,{getUser})(App));
