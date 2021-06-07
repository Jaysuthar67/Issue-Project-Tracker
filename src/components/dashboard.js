/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 7/6/2021
 */

import React, {Component} from 'react';
import {AuthConsumer} from "./Contexts/auth";
import {Redirect} from "react-router-dom";
import './dashboard.css'
class Dashboard extends Component {
    render() {
        return (
            <AuthConsumer>
                {(val)=>{
                    console.log(`From Dashboard`);
                    console.log(val)
                    if(val){
                        return (
                            <div className="dashboard-Container">
                                <h1>{val.displayName}</h1>
                                <button onClick={this.props.signOutHandler}>SignOut</button>
                            </div>
                        );
                    }else {
                        return (
                            <Redirect to="/"/>
                        );
                    }
                }}
            </AuthConsumer>
        );
    }
}

export default Dashboard;
