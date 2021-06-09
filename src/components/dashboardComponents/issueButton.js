/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 10/6/2021
 */

import React from 'react';
import {ButtonBase} from "@material-ui/core";
import './issueButton.css';
import firebase from "firebase/app";

function IssueButton(props) {
    let timestamp = new firebase.firestore.Timestamp(props.issueCreatedOn, 0);
    if (props.issue_priority === "urgent") {
        return (
            <ButtonBase className="issueButton-Container-Urgent">
                <div className='issueButton-InnerDiv'>
                    <div className="issueButton-Title-Urgent"> {props.issue_title}</div>
                    <div className="issueButton-Description-Low">{props.issue_description.substring(0, 135)} ...</div>
                    <div className="issueButton-issueCreatedOn">
                        Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                    </div>
                </div>
            </ButtonBase>
        );
    } else if (props.issue_priority === "high") {
        return (
            <ButtonBase className="issueButton-Container-High">
                <div className='issueButton-InnerDiv'>
                    <div className="issueButton-Title-High"> {props.issue_title}</div>
                    <div className="issueButton-Description-Low">{props.issue_description.substring(0, 135)} ...</div>
                    <div className="issueButton-issueCreatedOn">
                        Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                    </div>
                </div>
            </ButtonBase>
        );
    } else if (props.issue_priority === "normal") {
        return (
            <ButtonBase className="issueButton-Container-Normal">
                <div className='issueButton-InnerDiv'>
                    <div className="issueButton-Title-Normal"> {props.issue_title}</div>
                    <div className="issueButton-Description-Low">{props.issue_description.substring(0, 135)} ...</div>
                    <div className="issueButton-issueCreatedOn">
                        Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                    </div>
                </div>
            </ButtonBase>
        );
    } else {
        return (
            <ButtonBase className="issueButton-Container-Low">
                <div className='issueButton-InnerDiv'>
                    <div className="issueButton-Title-Low"> {props.issue_title}</div>
                    <div className="issueButton-Description-Low">{props.issue_description.substring(0, 135)} ...</div>
                    <div className="issueButton-issueCreatedOn">
                        Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                    </div>
                </div>
            </ButtonBase>
        );
    }
}

export default IssueButton;
