/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */

import React, {Component} from 'react';
import {AuthConsumer} from "../Contexts/auth";
import './activeElement.css';
import DataContext from "../Contexts/data";
import ActiveIssueTitle from "./activeIssueTitle";
import firebase from "firebase/app";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ActiveIssueLifeCycle from "./activeIssueLifeCycle";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectUsersRender from "./projectUsersRender";

class ActiveElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueLifecycle: null,
            deleteIssueDialog: false,
            deleteProjectDialog: false
        }
    }
//Delete Issue
    openDeleteIssueDialogHandler = () => {
        this.setState({
            deleteIssueDialog: true
        })
    }
    ondeleteIssueDialogClosed = () => {
        this.setState({
            deleteIssueDialog: false
        })
    }
    ondeleteIssueDialogConfirmed = (projectID, issueID) => {
        this.setState({
            deleteIssueDialog: false
        });
        this.props.deleteIssueConfirmHandler(projectID, issueID);
    }
    // DeleteProject
    openDeleteProjectDialogHandler = () => {
        this.setState({
            deleteProjectDialog: true
        })
    }
    ondeleteProjectDialogClosed = () => {
        this.setState({
            deleteProjectDialog: false
        })
    }
    ondeleteProjectDialogConfirmed = (projectID) => {
        this.setState({
            deleteProjectDialog: false
        });
        this.props.deleteProjectHandler(projectID);
    }

    render() {
        let value = this.context;
        if (value.length === 0) {
            return (
                <div className="no-projects-found">Nothing Selected</div>
            );
        } else {
            if (this.props.selectedItem.itemType === "project") {
                let project = null;
                for (let valkey in value) {
                    let val = value[valkey];
                    let projectId = Object.keys(val)[0];
                    const {users, issues, description, title, createdOn, owner} = val[projectId][0];
                    let issueCount = 0
                    if (issues) {
                        let issuesKeys = Object.keys(issues);
                        issueCount = issuesKeys.length;
                    }
                    if (projectId === this.props.selectedItem.projectId[0][0]) {
                        let projectCreatedOn = new firebase.firestore.Timestamp(createdOn.seconds, 0).toDate();
                        project = {
                            projectID: this.props.selectedItem.projectId[0][0],
                            projectTitle: title,
                            projectDescription: description,
                            projectOwner: owner,
                            projectUsers: users,
                            projectCreatedOn: projectCreatedOn,
                            issueCount1: issueCount
                        }
                        break;
                    }
                }
                return (
                    <div className="activeElement-Container">
                        <div className="activeElement-BreadCrumbs">
                            Project / {project.projectTitle}
                            <Button className="active-New-issue" variant="contained" color="primary" size="small"
                                    startIcon={<AddIcon/>}
                                    onClick={() => this.props.newIssueHandler([project.projectID])}>Create New
                                Issue / Task</Button>
                        </div>
                        <div className="activeElement-Title">
                            {project.projectTitle}
                        </div>
                        <div className="activeElement-Meta">
                            <div className="mate-Date">
                                Project Created On
                                : {project.projectCreatedOn.toDateString()} | {project.projectCreatedOn.toLocaleTimeString()}
                                <br/> <b> Project Owner: {project.projectOwner}</b>
                                <br/> No. of Issues in this project : <b>{project.issueCount1}</b>
                            </div>
                            <div className="mate-Left">
                                <AuthConsumer>
                                    {(value1) => {
                                        if (project.projectOwner === value1.email) {
                                            return (
                                                <>
                                                    <Button className="edit-IssueButton" variant="contained"
                                                            color="primary" size="small"
                                                            startIcon={<EditIcon/>}>Edit</Button>
                                                    <Button className="edit-IssueButton" variant="contained"
                                                            color="secondary" size="small"
                                                            onClick={this.openDeleteProjectDialogHandler}
                                                            startIcon={<DeleteIcon/>}>Delete</Button>
                                                    <Dialog open={this.state.deleteProjectDialog}
                                                            disableBackdropClick
                                                            disableEscapeKeyDown
                                                            maxWidth="xs">
                                                        <DialogTitle>Delete this Project ? </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Are You Sure?
                                                                <br/> "{project.projectTitle}" will Be Deleted.
                                                            </DialogContentText>
                                                            <DialogActions>
                                                                <Button onClick={this.ondeleteProjectDialogClosed}
                                                                        color="secondary" autoFocus>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="contained"
                                                                        onClick={() => this.ondeleteProjectDialogConfirmed(project.projectID)}
                                                                        color="secondary">
                                                                    Delete
                                                                </Button>
                                                            </DialogActions>
                                                        </DialogContent>
                                                    </Dialog>
                                                </>
                                            );
                                        } else {
                                        }
                                    }}
                                </AuthConsumer>
                            </div>
                        </div>
                        <Grid className="activeElement-Project-Grid" container spacing={0}>
                            <Grid item xs={9}>
                                <div className="activeElement-projectDescription custom-Scrollbar">
                                    {project.projectDescription}
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div className="activeElement-Users custom-Scrollbar">
                                    <AuthConsumer>
                                        {() => {
                                            let usersRender = []
                                            for (const userKey in project.projectUsers) {
                                                usersRender.push(<ProjectUsersRender
                                                    key={userKey}
                                                    user={project.projectUsers[userKey]}/>)
                                            }
                                            return (<>
                                                    {usersRender}
                                                    <div className="projectsListPlaceHolder"/>
                                                </>
                                            );
                                        }}
                                    </AuthConsumer>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                );
            } else if (this.props.selectedItem.itemType === "issue") {
                let issue = null
                for (let valkey in value) {
                    let val = value[valkey];
                    let projectId = Object.keys(val)[0];
                    const {issues, title} = val[projectId][0];
                    if (projectId === this.props.selectedItem.projectId[0][0]) {
                        for (let issuesKey in issues) {
                            if (issuesKey === this.props.selectedItem.issueId) {
                                let {
                                    issueCreatedOn, issue_description, issue_lifecycle,
                                    issue_priority, issue_title, createdBy
                                } = issues[issuesKey];
                                let issueCreatedOn1 = new firebase.firestore.Timestamp(issueCreatedOn.seconds, 0).toDate();
                                issue = {
                                    issueId: issuesKey,
                                    issueCreatedOn: issueCreatedOn1,
                                    issue_description: issue_description,
                                    issue_lifecycle: issue_lifecycle,
                                    issue_priority: issue_priority,
                                    issue_title: issue_title,
                                    createdBy: createdBy,
                                    projectTitle: title
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                return (
                    <div className="activeElement-Container">
                        <div className="activeElement-BreadCrumbs">
                            Project / {issue.projectTitle} / {issue.issue_title}
                        </div>
                        <ActiveIssueTitle issue={issue}/>
                        <div className="activeElement-Meta">
                            <div className="mate-Date">
                                Created On
                                : {issue.issueCreatedOn.toDateString()} | {issue.issueCreatedOn.toLocaleTimeString()}
                                <br/>
                                <b> Created By : {issue.createdBy}</b>
                            </div>
                            <div className="mate-LifeCycle">
                                <AuthConsumer>
                                    {(value1) => {
                                        if (issue.createdBy === value1.email) {
                                            return (
                                                <>
                                                    <Button className="edit-IssueButton" variant="contained"
                                                            color="primary" size="small"
                                                            startIcon={<EditIcon/>}>Edit</Button>
                                                    <Button className="delete-IssueButton" variant="contained"
                                                            color="secondary" size="small"
                                                            onClick={this.openDeleteIssueDialogHandler}
                                                            startIcon={<DeleteIcon/>}>Delete</Button>
                                                    <Dialog open={this.state.deleteIssueDialog}
                                                            disableBackdropClick
                                                            disableEscapeKeyDown
                                                            maxWidth="xs">
                                                        <DialogTitle>Delete this Issue ? </DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Are You Sure?
                                                                <br/> "{issue.issue_title}" will Be Deleted.
                                                            </DialogContentText>
                                                            <DialogActions>
                                                                <Button onClick={this.ondeleteIssueDialogClosed}
                                                                        color="secondary" autoFocus>
                                                                    Cancel
                                                                </Button>
                                                                <Button variant="contained"
                                                                        onClick={() => this.ondeleteIssueDialogConfirmed(this.props.selectedItem.projectId[0][0], issue.issueId)}
                                                                        color="secondary">
                                                                    Delete
                                                                </Button>
                                                            </DialogActions>
                                                        </DialogContent>
                                                    </Dialog>
                                                </>
                                            );
                                        }
                                    }}
                                </AuthConsumer>
                                <ActiveIssueLifeCycle issue_lifecycle={issue.issue_lifecycle} issueId={issue.issueId}
                                                      projctId={this.props.selectedItem.projectId[0][0]}/>
                            </div>
                        </div>
                        <div className="activeIssue-issue_description custom-Scrollbar">
                            {issue.issue_description}
                        </div>
                    </div>
                );
            } else if (this.props.selectedItem.itemType === "newProject") {
                return (
                    <div className="activeElement-Container">
                        <h3> New Project </h3>
                        <br/>
                        <br/>
                        <br/>
                        <button onClick={this.props.newRandomProjectHandler}>New Random Project</button>
                    </div>
                );
            } else if (this.props.selectedItem.itemType === "newIssue") {
                return (
                    <div className="activeElement-Container">
                        <h3>New Issue</h3>{this.props.selectedItem.projectId}
                        <br/>
                        <br/>
                        <br/>
                        <button
                            onClick={() => this.props.newRandomIssueHandler(this.props.selectedItem.projectId[0][0])}>Add
                            New Random Issue
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="no-projects-found">Nothing Selected</div>
                );
            }
        }
    }
}

ActiveElement.contextType = DataContext;
export default ActiveElement;
