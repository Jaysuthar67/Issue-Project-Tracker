/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import React from 'react';
import {ButtonBase, IconButton, Tooltip} from "@material-ui/core";
import './ProjectButton.css'
import AddIcon from "@material-ui/icons/Add";

function ProjectButton(props) {
    return (
        <div className="projectButton-Container">
            <ButtonBase className="project-buttonBase" onClick={()=>props.selectProjectHandler(props.projectID)}>
                <div className="buttonContent">{props.projectTitle}</div>
            </ButtonBase>
            <Tooltip title="No. Of Issues">
                <div className="issue-Count">{props.issueCount}</div>
            </Tooltip>
            <Tooltip title="Add New Issue" onClick={()=>props.newIssueHandler(props.projectID)}>
                <IconButton size="small">
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default ProjectButton;
