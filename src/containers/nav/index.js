import React,{Component} from 'react'
import { Router, Route, Link } from 'react-router-dom'

import './style/index.less'

class nav extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return (
            <div className="nav">
                <ul>
                    <li><Link to="/" >文件夹</Link></li>
                    <li><Link to="/list" >最近文档</Link></li>
                    <li><Link to="/create" >添加笔记</Link></li>
                </ul>
            </div>
        )
    }
}
export default nav