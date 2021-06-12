/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */
import logo from '../assets/AppIcon.svg';
import React, {Component} from 'react';
import AuthContext, {AuthConsumer} from "./Contexts/auth";
import {Redirect} from "react-router-dom";
import './dashboard.css'
import {FirebaseAuth, Firestore} from "../firebaseInit";
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {DataProvider} from "./Contexts/data";
import AddIcon from '@material-ui/icons/Add';
import ProjectsDisplay from "./dashboardComponents/projectsDisplay";
import IssuesDisplay from "./dashboardComponents/issuesDisplay";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActiveElement from "./dashboardComponents/activeElement";
import {addNewRandomIssue, createNewProject, deleteIssueHandler, deletePoject} from "../firebaseHelperFunctions";

class Dashboard extends Component {

    firebaseRealtimeListener;

    constructor(props) {
        super(props);
        this.state = {
            dataLoading: true,
            data: null,
            userMenuButtonAnchor: null,
            selectedItem: {
                itemType: null,
                projectId: null,
                issueId: null
            }
        }
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
    userMenuOpenHandler = (e) => {
        this.setState({
            userMenuButtonAnchor: e.target
        });
    }
    userMenuCloseHandler = () => {
        this.setState({
            userMenuButtonAnchor: null
        });
    }
    passwordResetHandler = () => {
        FirebaseAuth.sendPasswordResetEmail(this.context.email)
            .then(() => {
                alert(`Password Reset Link was sent to : \n ${this.context.email}`);
                FirebaseAuth.signOut().then(() => {
                    // Sign-out successful.
                    this.firebaseRealtimeListener = undefined;
                }).catch((error) => {
                    console.log(error);
                    // An error happened.
                });
                this.setState({
                    userMenuButtonAnchor: null
                })
            })
            .catch((err) => {
                console.log(err);
                alert("Something Went Wrong !")
            });
    }

    componentDidMount() {
        this.firebaseRealtimeListener = Firestore.collection("test_colloection")
            .where("users", "array-contains", this.context.email)
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
        this.userMenuOpenHandler = undefined;
        this.userMenuCloseHandler = undefined;
        this.passwordResetHandler = undefined;
        this.firebaseRealtimeListener = undefined;
    }

    selectProjectHandler = (projectId) => {
        this.setState({
            selectedItem: {
                itemType: "project",
                projectId: [projectId],
                issueId: null
            }
        })
    }
    selectIssueHandler = (projectId, issueId) => {
        this.setState({
            selectedItem: {
                itemType: "issue",
                projectId: [[projectId]],
                issueId: issueId
            }
        });
    }
    newProjectHandler = () => {
        this.setState({
            selectedItem: {
                itemType: "newProject",
                projectId: null,
                issueId: null
            }
        });
    }
    deleteIssueConfirmHandler = (projectId, issueID) => {
        this.setState({
            selectedItem: {
                itemType: "project",
                projectId: [[projectId]],
                issueId: null
            }
        });
        deleteIssueHandler(projectId, issueID);
    }
    newIssueHandler = (projectId) => {
        this.setState({
            selectedItem: {
                itemType: "newIssue",
                projectId: [projectId],
                issueId: null
            }
        })
    }

    deleteProjectHandler = (projectId)=>{
        deletePoject(projectId)
        this.setState({
            selectedItem: {
                itemType: null,
                projectId: null,
                issueId: null
            }
        });
    }

    newRandomIssueHandler = (projectId) => {
        addNewRandomIssue(projectId);
        this.setState({
            selectedItem: {
                itemType: null,
                projectId: null,
                issueId: null
            }
        });
        setTimeout(() => {
            this.setState({
                dataLoading:false,
                selectedItem: {
                    itemType: "project",
                    projectId: [[projectId]],
                    issueId: null
                }
            });
        }, 1000)
    }

    newRandomProjectHandler =()=>{
        this.setState({
            selectedItem: {
                itemType: null,
                projectId: null,
                issueId: null
            }
        });
        createNewProject();
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
                                                <IconButton onClick={this.userMenuOpenHandler}>
                                                    <MoreVertIcon/>
                                                </IconButton>
                                                <Menu anchorEl={this.state.userMenuButtonAnchor}
                                                      keepMounted open={Boolean(this.state.userMenuButtonAnchor)}
                                                      onClose={this.userMenuCloseHandler}>
                                                    <MenuItem onClick={this.passwordResetHandler}>Reset
                                                        Password</MenuItem>
                                                    <MenuItem onClick={this.signOutHandler}>Logout</MenuItem>
                                                </Menu>
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
                                                            onClick={this.newProjectHandler}
                                                            startIcon={<AddIcon/>}>New Project</Button></div>
                                                {!this.state.dataLoading ? <ProjectsDisplay
                                                        selectProjectHandler={this.selectProjectHandler}
                                                        newIssueHandler={this.newIssueHandler}
                                                    /> :
                                                    <></>}
                                            </Grid>
                                            <Grid className="issue-Container" item xs={3}>
                                                {!this.state.dataLoading ?
                                                    <IssuesDisplay selectedItem={this.state.selectedItem}
                                                                   selectIssueHandler={this.selectIssueHandler}
                                                    /> :
                                                    <></>}
                                            </Grid>
                                            <Grid className="active-Element" item xs={6}>
                                                {!this.state.dataLoading ?
                                                    <ActiveElement selectedItem={this.state.selectedItem}
                                                                   newIssueHandler={this.newIssueHandler}
                                                                   deleteIssueConfirmHandler={this.deleteIssueConfirmHandler}
                                                                   newRandomIssueHandler={this.newRandomIssueHandler}
                                                                   newRandomProjectHandler={this.newRandomProjectHandler}
                                                                   deleteProjectHandler={this.deleteProjectHandler}/> :
                                                    <></>}
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="my-Name">Designed & Developed by Jay Suthar</div>
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
