/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 14/6/2021
 */

import React, {Component} from 'react';
import {Button, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import UserArrayRender from "./userArrayRender";
import {validateEmail} from "../helperFunctions";
import firebase from "firebase/app";

class NewOrEditProject extends Component {
    usersArrayTextField;

    constructor(props) {
        super(props);
        this.usersArrayTextField = React.createRef();
        if (this.props.type === "new") {
            this.state = {
                titleElement: "Create New Project",
                projectTitleError: false,
                projectTitleVal: undefined,
                projectDescVal: undefined,
                projectUsers: [],
                saveDisabled: true,
                nonValidUserEmail: false
            }
        } else {
            let project = null;
            for (let valkey in props.value) {
                let val = props.value[valkey];
                let projectId = Object.keys(val)[0];
                const {users, issues, description, title, createdOn, owner} = val[projectId][0];
                let issueCount = 0
                if (issues) {
                    let issuesKeys = Object.keys(issues);
                    issueCount = issuesKeys.length;
                }
                if (projectId === this.props.projectId) {
                    let projectCreatedOn = new firebase.firestore.Timestamp(createdOn.seconds, 0).toDate();
                    project = {
                        projectID: this.props.projectId,
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
            this.state = {
                titleElement: "Edit Project",
                projectTitleError: false,
                projectTitleVal: project.projectTitle,
                projectDescVal: project.projectDescription,
                projectUsers: project.projectUsers,
                saveDisabled: false,
                nonValidUserEmail: false
            }
        }
    }

    handleSaveProject = () => {
        if (this.props.type === "new") {
            this.props.newProjectAddHandler(this.state.projectTitleVal,this.state.projectDescVal,this.state.projectUsers);
        }else {
            this.props.editProjectConfirmHandler(this.props.projectId,this.state.projectTitleVal,this.state.projectDescVal,this.state.projectUsers);
        }
    }
    projectTitleValHandler = (e) => {
        this.setState({
            projectTitleVal: e.target.value
        });
    }
    projectDescValHandler = (e)=>{
        this.setState({
            projectDescVal: e.target.value
        });
    }
    isTitleEmpty = (e) => {
        if (e.target.value) {
            this.setState({
                projectTitleError: false,
                saveDisabled: false
            });
        } else {
            this.setState({
                projectTitleError: true,
                saveDisabled: true
            });
        }
    }
    addUserHandler = () => {
        console.log(this.usersArrayTextField);
        let newUser = this.usersArrayTextField.current.children[1].children[0].value;
        if (validateEmail(newUser)) {
            if (!this.state.projectUsers.includes(newUser)) {
                let newArray = this.state.projectUsers;
                newArray.push(newUser);
                this.setState({
                    projectUsers: newArray,
                    nonValidUserEmail: false
                });
            }else {
                this.setState({
                    nonValidUserEmail: false
                })
            }
        } else {
            this.setState({
                nonValidUserEmail: true
            })
        }
        this.usersArrayTextField.current.children[1].children[0].value = "";
    }
    removeUserHandler = (index) => {
        let newArray = []
        for (let projectUsersKey in this.state.projectUsers) {
            if (projectUsersKey !== index) {
                newArray.push(this.state.projectUsers[projectUsersKey]);
            }
        }
        this.setState({
            projectUsers: newArray
        });
    }

    render() {
        return (
            <div className="new-or-edit-project">
                <div className="newProject-Title">{this.state.titleElement}</div>
                <form className="Project-Form custom-Scrollbar" autoComplete="off">
                    <TextField className="newProjectTextField-Title" type="text" label="Project Title"
                               error={this.state.projectTitleError} onBlur={this.isTitleEmpty}
                               onChange={this.projectTitleValHandler} value={this.state.projectTitleVal}/>
                    <TextField className="newProjectTextField-Desc" type="text" multiline variant="outlined"
                               label="Project Description"
                               onChange={this.projectDescValHandler} value={this.state.projectDescVal}/>
                </form>
                <div className="project-Bottom">
                    <div className="usersArray">
                        <div className="usersArray-top">
                            <TextField type="email" className="usersArray-TextField" label="User Email-Id"
                                       helperText={this.state.nonValidUserEmail? "Please Enter Valid Email-ID":"Enter Email-Id to add user to this Project"}
                                       error={this.state.nonValidUserEmail} ref={this.usersArrayTextField}/>
                            <Button className="userArray-Add" variant="contained" color="primary"
                                    onClick={this.addUserHandler}>Add</Button>
                        </div>
                        <div className="usersArray-bottom custom-Scrollbar">
                            <UserArrayRender projectUsers={this.state.projectUsers}
                                             removeUserHandler={this.removeUserHandler}/>
                        </div>
                    </div>
                    <div className="confirm-buttons">
                        <Button className="button-rl-m05" variant="contained" color="primary"
                                onClick={this.handleSaveProject}
                                startIcon={<SaveIcon/>} disabled={this.state.saveDisabled}>Save Changes</Button>
                        <Button className="button-rl-m05" color="secondary" size="small"
                                onClick={this.props.generalCancelHandler}>Cancel</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewOrEditProject;
