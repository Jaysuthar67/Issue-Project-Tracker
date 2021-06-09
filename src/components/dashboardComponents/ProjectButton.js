/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 9/6/2021
 */

import React from 'react';
import {ButtonBase, IconButton, Tooltip} from "@material-ui/core";
import './ProjectButton.css'
import AddIcon from "@material-ui/icons/Add";

function ProjectButton(props) {
    return (
        <div className="projectButton-Container">
            <ButtonBase className="project-buttonBase">
                <div className="buttonContent">{props.projectTitle}</div>
            </ButtonBase>
            <Tooltip title="No. Of Issues">
                <div className="issue-Count">{props.issueCount}</div>
            </Tooltip>
            <Tooltip title="Add New Issue">
                <IconButton size="small">
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default ProjectButton;
