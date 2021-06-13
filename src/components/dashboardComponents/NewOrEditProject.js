/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 13/6/2021
 */

import React, {Component} from 'react';
import {Button, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

class NewOrEditProject extends Component {
    constructor(props) {
        super(props);
        if (this.props.type === "new") {
            this.state = {
                titleElement: "Create New Project",
                projectTitleError: false,
                projectTitleVal: undefined,
                projectDescVal: undefined,
                projectUsers: [],
                saveDisabled: true
            }
        } else {
            this.state = {
                titleElement: "Edit Project",
                projectTitleError: false,
                projectTitleVal: undefined,
                projectDescVal: undefined,
                projectUsers: [],
                saveDisabled: false
            }
        }
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

    render() {
        return (
            <div className="new-or-edit-project">
                <div className="newProject-Title">{this.state.titleElement}</div>
                <form className="Project-Form custom-Scrollbar" autoComplete="off">
                    <TextField className="newProjectTextField-Title" type="text" label="Project Title"
                               error={this.state.projectTitleError} onBlur={this.isTitleEmpty}/>
                    <TextField className="newProjectTextField-Desc" type="text" multiline variant="outlined"
                               label="Project Description"/>
                </form>
                <div className="project-Bottom">
                    <div className="usersArray">
                        <div className="usersArray-top">
                            <TextField className="usersArray-TextField" label="User Email-Id"
                                       helperText="Enter Email-Id to add user to this Project"/>
                            <Button className="userArray-Add" variant="contained" color="primary">Add</Button>
                        </div>
                        <div className="usersArray-bottom custom-Scrollbar">

                        </div>
                    </div>
                    <div className="confirm-buttons">
                        <Button className="button-rl-m05" variant="contained" color="primary"
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
