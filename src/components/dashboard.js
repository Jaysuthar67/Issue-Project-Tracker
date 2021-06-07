/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 7/6/2021
 */

import React, {Component} from 'react';
import {AuthConsumer} from "./Contexts/auth";
import {Redirect} from "react-router-dom";
import './dashboard.css'
import {FirebaseAuth} from "../firebaseInit";
class Dashboard extends Component {

    sendPasswordReset = () => {
        let currentEmail = FirebaseAuth.currentUser.email;
        FirebaseAuth.sendPasswordResetEmail(currentEmail).then(() => {
            alert(`Password Reset Link Was Sent to :\n${currentEmail}`);
            this.props.signOutHandler();
        }).catch(function (error) {
        });
    }
    render() {
        return (
            <AuthConsumer>
                {(val)=>{
                    if(val){
                        return (
                            <div className="dashboard-Container">
                                <h1>{val.displayName}</h1>
                                <button onClick={this.props.signOutHandler}>SignOut</button>
                                <button onClick={this.sendPasswordReset}>Reset Password</button>
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
