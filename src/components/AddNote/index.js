import React,{Component} from 'react';
import { Form,Input,Button } from 'antd';
import { connect } from 'react-redux';
import { addNotes } from '../../actions/note'
import './style/index.less'
const FormItem = Form.Item;
const TextArea = Input.TextArea

class addNote extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={

        }
    }
    handleSubmit(e){
        const { addNotes } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            addNotes(values)
            
          }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="addNote">
               <Form onSubmit={this.handleSubmit} className="note-form">
                    <FormItem>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input placeholder="Title" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input your content!' }],
                    })(
                        <TextArea placeholder="Content"></TextArea>
                    )}
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        提交
                    </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

addNote = Form.create()(addNote);
const mapStateToProps = (state,props) => {
    console.log(state,'-------state')
    return{

    }
}  
export default connect(mapStateToProps,{addNotes})(addNote)