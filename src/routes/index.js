import React, { Component } from 'react';
import { Router, Route, Link,withRouter,Switch } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import AppList from '../components/AppManage/AppList'
import ServiceList from '../components/AppManage/ServiceList'
import vessel from '../components/AppManage/vessel'
import storage from '../components/AppManage/storage'
import Snapshot from '../components/AppManage/Snapshot'
import ServiceConfig from '../components/AppManage/ServiceConfig'
import NetworkIsolation from '../components/AppManage/NetworkIsolation'

export const Contents = ()=>(
    <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/application' component={AppList}/>
        <Route path='/service' component={ServiceList}/>
        <Route path='/vessel' component={vessel}/>
        <Route path='/storage' component={storage}/>
        <Route path='/snapshot' component={Snapshot}/>
        <Route path='/service_config' component={ServiceConfig}/>
        <Route path='/network_isolation' component={NetworkIsolation}/>
    </Switch>
)
export const Overall = ()=>(
    <Switch>
        {/* <Route exact path='/' component={Home}/>
        <Route path='/roster' component={Roster}/>
        <Route path='/schedule' component={Schedule}/> */}
    </Switch>
)