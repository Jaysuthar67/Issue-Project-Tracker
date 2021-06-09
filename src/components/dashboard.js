/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 9/6/2021
 */
import logo from '../assets/AppIcon.svg';
import React, {Component} from 'react';
import AuthContext, {AuthConsumer} from "./Contexts/auth";
import {Link, Redirect} from "react-router-dom";
import './dashboard.css'
import {FirebaseAuth, Firestore} from "../firebaseInit";
import {AppBar, Button, Grid, IconButton, LinearProgress, Paper, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {DataProvider} from "./Contexts/data";
import AddIcon from '@material-ui/icons/Add';
import ProjectsDisplay from "./dashboardComponents/projectsDisplay";

class Dashboard extends Component {

    firebaseRealtimeListener;
    registerfirebaseRealtimeListener;

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            data: null
        }
    }

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
            this.firebaseRealtimeListener = undefined;
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }

    componentDidMount() {
        this.firebaseRealtimeListener = Firestore.collection("test_colloection")
            .where("users", "array-contains", this.context.uid)
            .onSnapshot((querySnapshot) => {
                let dataObject = [];
                querySnapshot.forEach((doc) => {
                    let singleObject = {
                        [doc.id]: [doc.data()]
                    }
                    dataObject.push(singleObject);
                });

                this.setState({
                    dataLoading: false,
                    data: dataObject
                });
            });
    }

    componentWillUnmount() {
        this.signOutHandler = undefined;
        this.sendPasswordReset = undefined;
        this.firebaseRealtimeListener = undefined;
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
                                {this.state.dataLoading ? <LinearProgress/> : <div/>}
                                <DataProvider value={this.state.data}>
                                    <div className="mainApp-Container">
                                        <Grid className="h-100" container spacing={0}>
                                            <Grid className="projects-Container custom-Scrollbar" item xs={3}>
                                                <div className="new-Project-container">
                                                    <Button className="new-Project-button" variant="contained"
                                                            color="primary" size="small"
                                                            startIcon={<AddIcon/>}>New Project</Button></div>

                                                {!this.state.dataLoading ? <ProjectsDisplay/> : ""}
                                            </Grid>
                                            <Grid className="issue-Container" item xs={3}>
                                                Issues
                                            </Grid>
                                            <Grid className="active-Element" item xs={6}>
                                                Active Element
                                            </Grid>
                                        </Grid>
                                        <div className="my-Name">Designed & Developed by Jay Suthar</div>
                                    </div>
                                </DataProvider>
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

Dashboard.contextType = AuthContext;
export default Dashboard;
