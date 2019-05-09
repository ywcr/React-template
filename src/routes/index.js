import React, { Component } from 'react';
import { Router, Route, Link,withRouter,Switch } from 'react-router-dom'

import WorkOrder from '../components/WorkOrder'
import WorkOrderDetail from '../components/WorkOrder/Detail'
import SubmitWorkOrder from '../components/WorkOrder/Submit'
import Login from '../components/Login'


export const Contents = ()=>(
    <Switch>
        <Route exact path='/' component={WorkOrder}/>
        <Route path="/detail/:id" component={WorkOrderDetail}/>
        <Route path="/submit/:type" component={SubmitWorkOrder}/>
    </Switch>
)
export const Overall = ()=>(
    <Switch>
        <Route path="/login" component={Login}></Route>
    </Switch>
)