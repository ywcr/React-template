import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input,Upload,Icon,message } from "antd";
import { connect } from 'react-redux'
import moment from "moment";
import './styles/index.less'

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    className="commentList"
    dataSource={comments}
    header={`沟通记录：${comments.length} 条 `}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

class CommentWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [{author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "sdfsdf", datetime: "2019年04月25日 17:54:50"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "wfewef", datetime: "2019年04月25日 17:54:54"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "123123", datetime: "2019年04月25日 17:54:56"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "123123", datetime: "2019年04月25日 17:54:56"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "123123", datetime: "2019年04月25日 17:54:56"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "123123", datetime: "2019年04月25日 17:54:56"},
      {author: "Han Solo", avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png", content: "fewfwef", datetime: "2019年04月25日 17:54:59"}],
      submitting: false,
      value: "",
      fileList: [],
    };
  }

  componentDidMount(){
      const dom = document.querySelector('.ant-spin-container');
      dom.scrollTop = dom.offsetHeight;
  }

  handleSubmit = () => { // 提交数据
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [ // 传输的数据
          ...this.state.comments,
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: this.state.value,
            datetime: moment().format('YYYY年MM月DD日 HH:mm:ss')
          }
        ]
      },()=>{
        const dom = document.querySelector('.ant-spin-container');
        dom.scrollTop = dom.offsetHeight;
        console.log(this.state.comments,'----dom')
      });
    }, 1000);
  };

  handleChange = e => { // 输入内容。
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value,fileList } = this.state;
    
    const _this = this;
    const props = {
      onRemove: (file) => {
          this.setState((state) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: (file) => {
          console.log(file,'----file')
          if(file.size>5120){
            message.warning('文件大小不得超过5M');
            return false;
          }else if(fileList.length == 1){
            message.warning('只允许上传一个文件');
            return false;
          }
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
    };
    const Editor = ({ onChange, onSubmit, submitting, value }) => (//根据数据判断是否显示输入框
      <div>
        <Form.Item>
          <TextArea rows={4} onChange={onChange} value={value} /> 
          <div style={{float:"left"}}>
            <Upload {...props}>
              <Button style={{marginRight:"10px"}}>
                <Icon type="upload" /> 文件上传
              </Button>
              支持.png、.jpg、.jpeg、.txt、.rar、.doc、.xls、.xlsx、.zip、.7z格式，最大不超过5M
            </Upload>
          </div>
        </Form.Item>
        <Form.Item>
          
          <Button
            htmlType="submit"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            提交回复
          </Button>
        </Form.Item>
      </div>
    );
    return (
      <div>
        <CommentList comments={comments} />
        {this.props.isEditor?<Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              state = {this.state}
            />
          }
        />:''}
      </div>
    );
  }
}
const mapStateToProps = (state)=>{

}

export default connect(mapStateToProps,{})(CommentWorkOrder);
