/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 6/6/2021
 */

import React, {Component} from 'react';
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Typography variant="h1" style={{color: "#ffffff"}}>
                    Dashboard
                    | {this.props.Username}
                    <Link to="/login">Login</Link>
                </Typography>
            </div>
        );
    }
}

export default Dashboard;
