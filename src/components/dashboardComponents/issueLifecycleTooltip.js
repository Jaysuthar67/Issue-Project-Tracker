/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import React from 'react';
import {Tooltip} from "@material-ui/core";

const IssueLifecycleTooltip = (props) => {
    if (props.lifecycle === "new") {
        return (
            <Tooltip title={"New"}>
                {props.children}
            </Tooltip>
        )
    }else if (props.lifecycle === "inProgress"){
        return (
            <Tooltip title={"In-Progress"}>
                {props.children}
            </Tooltip>
        )
    }
};

export default IssueLifecycleTooltip;
