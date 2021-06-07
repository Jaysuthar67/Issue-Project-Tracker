/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 8/6/2021
 */
import './userProfle.css';
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {AuthConsumer} from "./Contexts/auth";

class UserProfile extends Component {
    render() {
        return (
            <AuthConsumer>
                {(val) => {
                    if (val) {
                        return (
                            <div className="userprofile-container">
                                <h1>userProfile</h1>
                            </div>
                        );
                    } else {
                        return (
                            <Redirect to="/"/>
                        );
                    }
                }}
            </AuthConsumer>
        );
    }
}

export default UserProfile;
