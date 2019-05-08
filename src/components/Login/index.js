import React, { PropTypes, Component } from 'react'
import { Button, Form, Input, Card, Tooltip, message, Alert, Col, Row, Spin,Icon } from 'antd'
import './styles/index.less'
import { login } from '../../actions/users'
import { connect } from 'react-redux'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends React.Component {
    componentDidMount() {
      // To disabled submit button at the beginning.
      this.props.form.validateFields();
    }
  
    handleSubmit = (e) => {
      const {login} = this.props;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        login({username:values.username,password:values.password})

        // `username=${values.username}&password=${values.password}`
      });
    }
  
    render() {
      const {
        getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
      } = this.props.form;
  
      // Only show error after a field is touched.
      const usernameError = isFieldTouched('username') && getFieldError('username');
      const passwordError = isFieldTouched('password') && getFieldError('password');
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={usernameError ? 'error' : ''}
            help={usernameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

function mapStateToProps (state, props) {
  return {
  }
}
Login = Form.create()(Login)
export default connect(mapStateToProps, {login})(Login)