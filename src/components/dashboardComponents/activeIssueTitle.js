/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import React from 'react';

function ActiveIssueTitle(props) {
    if (props.issue.issue_priority === "urgent") {
        return (
            <>
                <div className="activeElement-Title urgent">
                    {props.issue.issue_title}
                </div>
            </>
        );
    } else if (props.issue.issue_priority === "high") {
        return (
            <>
                <div className="activeElement-Title high">
                    {props.issue.issue_title}
                </div>
            </>
        );
    } else if (props.issue.issue_priority === "normal") {
        return (
            <>
                <div className="activeElement-Title normal">
                    {props.issue.issue_title}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="activeElement-Title low">
                    {props.issue.issue_title}
                </div>
            </>
        );
    }
}

export default ActiveIssueTitle;
