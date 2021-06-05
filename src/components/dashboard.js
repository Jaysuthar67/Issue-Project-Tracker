/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 5/6/2021
 */

import React, {Component} from 'react';
import {Typography} from "@material-ui/core";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Typography variant="h1" style={{color: "#ffffff"}}>
                    Dashboard
                    | {this.props.Username}
                </Typography>
            </div>
        );
    }
}

export default Dashboard;
