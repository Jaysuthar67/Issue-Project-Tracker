/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 13/6/2021
 */

import React, {Component} from 'react';
import {FirebaseAuth} from "../../firebaseInit";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import firebase from "firebase/app";

class NewOrEditIssue extends Component {
    issueTitleRef;
    issueDescRef;

    constructor(props) {
        super(props);
        this.issueTitleRef = React.createRef();
        this.issueDescRef = React.createRef();
        if (props.type === "new") {
            this.state = {
                titleNotValid: false,
                issuePriority: "normal",
                issueTitleValue: undefined,
                issueDescValue: undefined,
                saveButtonDisable: true
            }
        } else {
            let value = props.valuex;
            let issue = null
            for (let valkey in value) {
                let val = value[valkey];
                let projectId = Object.keys(val)[0];
                const {issues, title} = val[projectId][0];
                if (projectId === this.props.projectId) {
                    for (let issuesKey in issues) {
                        if (issuesKey === this.props.issueId) {
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
            this.state = {
                titleNotValid: false,
                issuePriority: issue.issue_priority,
                issueTitleValue: issue.issue_title,
                issueDescValue: issue.issue_description,
                saveButtonDisable: false
            }
        }
    }

    selectNext = (e) => {
        e.preventDefault();
        let nextNode = this.issueDescRef.current.children[1].children[0];
        nextNode.focus();
    }
    titleValidator = (e) => {
        if (e.target.value) {
            this.setState({
                titleNotValid: false,
                saveButtonDisable: false
            });
        } else {
            this.setState({
                titleNotValid: true,
                saveButtonDisable: true
            });
        }
    }
    titleChange = (e) => {
        this.setState({
            issueTitleValue: e.target.value
        })
    }
    descChange = (e) => {
        this.setState({
            issueDescValue: e.target.value
        })
    }
    priorityChangeHandler = (e) => {
        this.setState({
            issuePriority: e.target.value
        })
    }
    onSaveClickHandler = () => {
        if (this.props.type === "new") {
            this.props.newIssueAddHandler(this.props.projectId,
                this.state.issueTitleValue,
                this.state.issueDescValue,
                this.state.issuePriority);
        } else {
            this.props.editIssueAddHandler(this.props.projectId, this.props.issueId, this.state.issueTitleValue,this.state.issueDescValue, this.state.issuePriority);
        }
        // console.log(this.props.newIssueAddHandler)
    }

    render() {
        return (
            <div className="new-or-edit-issue">
                <div className="issue-title">
                    User : {FirebaseAuth.currentUser.email}
                </div>
                <form className="Issue-Form custom-Scrollbar" autoComplete="off" onSubmit={this.selectNext}>
                    <TextField className="issueTextField-title" label="Issue Title" ref={this.issueTitleRef}
                               variant="outlined" error={this.state.titleNotValid}
                               value={this.state.issueTitleValue}
                               onBlur={this.titleValidator}
                               onChange={this.titleChange}/>
                    <FormControl className="issueSelect-Priority">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={this.state.issuePriority}
                            onChange={this.priorityChangeHandler}>
                            <MenuItem value="urgent">Urgent</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="normal">Normal</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className="issueTextField-description custom-Scrollbar" ref={this.issueDescRef}
                               label="Issue Description" value={this.state.issueDescValue} multiline
                               variant="outlined"
                               onChange={this.descChange}/>
                    <div className="placeholder-Div-5vh"/>
                </form>
                <div className="confirm-buttons">
                    <Button className="button-rl-m05" variant="contained" color="primary"
                            startIcon={<SaveIcon/>} onClick={this.onSaveClickHandler}
                            disabled={this.state.saveButtonDisable}>Save</Button>
                    <Button className="button-rl-m05" color="secondary" size="small"
                            onClick={this.props.generalCancelHandler}>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default NewOrEditIssue;
