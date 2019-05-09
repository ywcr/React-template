import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input,Upload,Icon,message,Modal } from "antd";
import { connect } from 'react-redux'
import moment from "moment";
import {interFlowList,replyOrder,downloadFile} from '../../../../actions/order'
import cooke from 'react-cookies';
import './styles/index.less'

const TextArea = Input.TextArea;
function convertImgToBase64(url, callback, outputFormat){
  var canvas = document.createElement('CANVAS'),
      ctx = canvas.getContext('2d'),
      img = new Image;
      img.crossOrigin = 'Anonymous';
      img.onload = function(){
          canvas.height = img.height;
          canvas.width = img.width;
          ctx.drawImage(img,0,0);
          var dataURL = canvas.toDataURL(outputFormat || 'image/png');
          callback.call(this, dataURL);
          canvas = null; 
      };
      img.src = url;
}


const CommentList = ({ comments,downloadImg}) => (
  <List
    className="commentList"
    dataSource={comments}
    header={`沟通记录：${comments.length} 条 `}
    itemLayout="horizontal"
    renderItem={item => <Comment 
    author={item.realName}
    avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    content={(<div><span>{item.flowDescription}</span>{item.attachmentFilename?<div style={{fontSize:12}}><a onClick={()=>{downloadImg(item.id)}}> 查看图片</a></div>:""}</div>)}
    datetime={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value,props }) => (//根据数据判断是否显示输入框
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} /> 
      <div style={{float:"left"}}>
        <Upload {...props}>
          <Button style={{marginRight:"10px"}}>
            <Icon type="upload" /> 添加附件
          </Button>
          支持.png、.jpg、.jpeg格式，最大不超过5M
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

class CommentWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: "",
      fileList: [],
      visible:false,
    };
  }

  componentDidMount(){
    this.getFlowList();
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps,'----nextProps')
  }
  getFlowList =()=>{
    const {interFlowList,orderId} = this.props;
    
    interFlowList(orderId).then(({response})=>response.result).then((data)=>{
      this.setState({
        comments:data.d?data.d.flows:[]
      },()=>{
        setTimeout(()=>{
          const dom = document.querySelector('.ant-spin-container');
          dom.scrollTop = dom.scrollHeight;
        },1000)
      })
    })
  }
  downloadImg = (id)=>{
    const {downloadFile} = this.props;
    const _this = this;
    downloadFile(id).then(({response})=>{
      this.setState({
        img:encodeURI(response.result.d.image)
      },()=>{
        _this.setState({
          visible:true
        })
      })
    })
  }
  handleCancel = () => {
    this.setState({
      visible:false,
      img:''
    })
  }
  handleSubmit = () => { // 提交数据
    const {replyOrder,orderId} = this.props;
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });
    replyOrder(orderId,this.state.value,cooke.load('lgname'),this.state.fileList[0]||'').then(({response})=>{
      return response.result;
    }).then((data)=>{
      if(data.c==200){
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: "",
            fileList:[]
            // comments: [ // 传输的数据
            //   ...this.state.comments,
            //   {
            //     realName: cooke.load('lgname'),
            //     avatar:
            //       "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            //     flowDescription: this.state.value,
            //     createTime: moment().format('YYYY年MM月DD日 HH:mm:ss')
            //   }
            // ]
          });
        }, 1000);
        this.getFlowList();
      }else{
        message.error('添加回复失败！')
      }
    })
    
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
          if(file.size>512000){
            message.warning('文件大小不得超过5M');
            return false;
          }else if(fileList.length == 1){
            message.warning('只允许上传一个文件');
            return false;
          }
          this.setState(state => ({
            fileList: [file],
            // fileList: [...state.fileList, file],
          }));
          return false;
        },
        accept:".png,.jpg,.jpeg",
        fileList,
    };
    return (
      <div>
        <CommentList comments={comments} downloadImg = {this.downloadImg} />
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
              props={props}
              state = {this.state}
            />
          }
        />:''}
        <Modal
          title="查看图片"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          {this.state.img?<img src={`data:image/png;base64,`+this.state.img}/>:null}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return {}
}

export default connect(mapStateToProps,{
  interFlowList,
  replyOrder,
  downloadFile
})(CommentWorkOrder);
