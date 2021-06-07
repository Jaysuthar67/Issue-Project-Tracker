/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 8/6/2021
 */
import logo from '../assets/AppIcon.svg';
import React, {Component} from 'react';
import {AuthConsumer} from "./Contexts/auth";
import {Link, Redirect} from "react-router-dom";
import './dashboard.css'
import {FirebaseAuth} from "../firebaseInit";
import {AppBar, Grid, IconButton, Paper, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Dashboard extends Component {

    sendPasswordReset = () => {
        let currentEmail = FirebaseAuth.currentUser.email;
        FirebaseAuth.sendPasswordResetEmail(currentEmail).then(() => {
            alert(`Password Reset Link Was Sent to :\n${currentEmail}`);
            this.props.signOutHandler();
        }).catch(function (error) {
        });
    }
    signOutHandler = () => {
        FirebaseAuth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }

    componentWillUnmount() {
        this.signOutHandler = undefined;
        this.sendPasswordReset = undefined;
    }

    render() {
        return (
            <AuthConsumer>
                {(val) => {
                    if (val) {
                        return (
                            <div className="dashboard-Container">
                                {/* -------------------- AppBar --------------------*/}
                                <AppBar className="appbar" position="static">
                                    <Paper square>
                                        <Toolbar>
                                            <div className="appbar-left">
                                                <img className="appbar-logo" src={logo} alt="Error"/>
                                                <Typography variant="h5" className="appbar-title">
                                                    Simple Issue & Project Tracker
                                                </Typography>
                                            </div>
                                            <div className="appbar-right">
                                                <div className="userName">Welcome, {val.displayName}</div>
                                                <Link to="/profile">
                                                    <Tooltip title="User Profile">
                                                        <IconButton>
                                                            <AccountCircle/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Link>
                                                <Tooltip title="Logout">
                                                    <IconButton onClick={this.signOutHandler}>
                                                        <ExitToAppIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </Toolbar>
                                    </Paper>
                                </AppBar>
                                {/* -------------------- AppBar --------------------*/}
                                <div className="mainApp-Container">
                                    <Grid className="h-100" container spacing={0}>
                                        <Grid className="projects-Container" item xs={3}>
                                            Projects
                                        </Grid>
                                        {/*<Divider orientation="vertical" flexItem/>*/}
                                        <Grid className="issue-Container" item xs={3}>
                                            Issues
                                        </Grid>
                                        {/*<Divider orientation="vertical" flexItem/>*/}
                                        <Grid className="active-Element" item xs={6}>
                                            Active Element
                                        </Grid>
                                    </Grid>
                                </div>
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

export default Dashboard;
