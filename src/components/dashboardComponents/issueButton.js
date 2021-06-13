/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 14/6/2021
 */

import React from 'react';
import {ButtonBase, Tooltip} from "@material-ui/core";
import './issueButton.css';
import firebase from "firebase/app";
import IssueLifecycleTooltip from "./issueLifecycleTooltip";

function IssueButton(props) {
    let timestamp = new firebase.firestore.Timestamp(props.issueCreatedOn, 0);
    if (props.issue_lifecycle === "finished") {
        return (
            <ButtonBase className="issueButton-Container-Normal"
                        onClick={() => props.selectIssueHandler(props.projectId, props.issueId)}>
                <div className='issueButton-InnerDiv'>
                    <div className="issueButton-Title-Normal"> {props.issue_title}</div>
                    <div className="issueButton-Description-Low">{props.issue_description.substring(0, 125)} ...</div>
                    <Tooltip
                        title={`Created On: ${timestamp.toDate().toLocaleDateString()} | ${timestamp.toDate().toLocaleTimeString()}`}>
                        <div className="issueButton-issueCreatedOn">
                            <b>Finished</b>
                        </div>
                    </Tooltip>
                </div>
            </ButtonBase>
        );
    }
    if (props.issue_priority === "urgent") {
        return (
            <IssueLifecycleTooltip lifecycle={props.issue_lifecycle}>
                <ButtonBase className="issueButton-Container-Urgent"
                            onClick={() => props.selectIssueHandler(props.projectId, props.issueId)}>
                    <div className='issueButton-InnerDiv'>
                        <div className="issueButton-Title-Urgent"> {props.issue_title}</div>
                        <div className="issueButton-Description-Low">{props.issue_description.substring(0, 125)} ... </div>
                        <div className="issueButton-issueCreatedOn">
                            Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                        </div>
                    </div>
                </ButtonBase>
            </IssueLifecycleTooltip>
        );
    } else if (props.issue_priority === "high") {
        return (
            <IssueLifecycleTooltip lifecycle={props.issue_lifecycle}>
                <ButtonBase className="issueButton-Container-High"
                            onClick={() => props.selectIssueHandler(props.projectId, props.issueId)}>
                    <div className='issueButton-InnerDiv'>
                        <div className="issueButton-Title-High"> {props.issue_title}</div>
                        <div className="issueButton-Description-Low">{props.issue_description.substring(0, 125)} ...
                        </div>
                        <div className="issueButton-issueCreatedOn">
                            Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                        </div>
                    </div>
                </ButtonBase>
            </IssueLifecycleTooltip>
        );
    } else if (props.issue_priority === "normal") {
        return (
            <IssueLifecycleTooltip lifecycle={props.issue_lifecycle}>
                <ButtonBase className="issueButton-Container-Normal"
                            onClick={() => props.selectIssueHandler(props.projectId, props.issueId)}>
                    <div className='issueButton-InnerDiv'>
                        <div className="issueButton-Title-Normal"> {props.issue_title}</div>
                        <div className="issueButton-Description-Low">{props.issue_description.substring(0, 125)} ...
                        </div>
                        <div className="issueButton-issueCreatedOn">
                            Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                        </div>
                    </div>
                </ButtonBase>
            </IssueLifecycleTooltip>
        );
    } else {
        return (
            <IssueLifecycleTooltip lifecycle={props.issue_lifecycle}>
                <ButtonBase className="issueButton-Container-Low"
                            onClick={() => props.selectIssueHandler(props.projectId, props.issueId)}>
                    <div className='issueButton-InnerDiv'>
                        <div className="issueButton-Title-Low"> {props.issue_title}</div>
                        <div className="issueButton-Description-Low">{props.issue_description.substring(0, 125)} ...
                        </div>
                        <div className="issueButton-issueCreatedOn">
                            Created On : {timestamp.toDate().toDateString()} | {timestamp.toDate().toLocaleTimeString()}
                        </div>
                    </div>
                </ButtonBase>
            </IssueLifecycleTooltip>
        );
    }
}

export default IssueButton;
