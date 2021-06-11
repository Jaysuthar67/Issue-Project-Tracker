/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import React, {Component} from 'react';
import {AuthConsumer} from "../Contexts/auth";
import './activeElement.css';
import DataContext from "../Contexts/data";
import ActiveIssueTitle from "./activeIssueTitle";
import firebase from "firebase/app";
import {Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class ActiveElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editProject: false,
            editIssue: false
        }
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
                        project = {
                            projectID: this.props.selectedItem.projectId[0][0],
                            projectTitle: title,
                            projectDescription: description,
                            projectOwner: owner,
                            projectUsers: users,
                            projectCreatedOn: createdOn,
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
                                    startIcon={<AddIcon/>} onClick={()=> this.props.newIssueHandler([project.projectID])}>Create New Issue</Button>
                        </div>
                        <div className="activeElement-Title">
                            {project.projectTitle}
                        </div>
                        <AuthConsumer>
                            {(value1) => {
                                if (project.projectOwner === value1.email) {
                                    return "Editable";
                                } else {
                                    return "Not-Editable";
                                }
                            }}
                        </AuthConsumer>
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
                                    issueCreatedOn,
                                    issue_description,
                                    issue_lifecycle,
                                    issue_priority,
                                    issue_title,
                                    createdBy
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
                            </div>
                        </div>
                    </div>
                );
            } else if (this.props.selectedItem.itemType === "newProject") {
                return (
                    <div className="activeElement-Container">
                        <h3>New Project</h3>{}
                    </div>
                );
            } else if (this.props.selectedItem.itemType === "newIssue") {
                return (
                    <div className="activeElement-Container">
                        <h3>New Issue</h3>{this.props.selectedItem.projectId}
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
