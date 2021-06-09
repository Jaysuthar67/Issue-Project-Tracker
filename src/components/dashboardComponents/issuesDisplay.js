/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 10/6/2021
 */
import React, {Component} from 'react';
import './issueDisplay.css'
import {InputBase} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import DataContext, {DataConsumer} from "../Contexts/data";
import IssueButton from "./issueButton";

class IssuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            searchTerm: null
        }
        // let value = this.context;

    }

    issuesSearchHandler = (e) => {
        if (e.target.value) {
            console.log(e.target.value);
            this.setState({
                search: true,
                searchTerm: e.target.value
            })
        } else {
            this.setState({
                search: false,
                searchTerm: null
            })
        }
    }

    render() {
        let value = this.context;
        let issues = null;
        if (value.length !== 0 && this.props.selectedItem.projectId) {
            for (let valKey in value) {
                let val = value[valKey];
                let projectID = Object.keys(val)[0];
                if (projectID === this.props.selectedItem.projectId[0][0]) {
                    const {issues: issues1} = val[projectID][0];
                    issues = issues1;
                    break;
                } else {

                }
            }
        }
        return (
            <div className="issuesDisplayContainer">
                <div className="issues-filter-Area">
                    <div className="issues-search">
                        <SearchIcon/>
                        <InputBase className="issues-search-input" onChange={this.issuesSearchHandler}
                                   placeholder="Search…"/>
                    </div>
                </div>
                <div className="issueItemsContainer custom-Scrollbar">
                    <DataConsumer>
                        {() => {
                            if (issues) {
                                let newIssues = [];
                                if (this.state.search) {
                                    for (let issueId in issues) {
                                        let issue_title = issues[issueId].issue_title;
                                        let issueCreatedOn = issues[issueId].issueCreatedOn.seconds;
                                        let issue_priority = issues[issueId].issue_priority;
                                        let issue_description = issues[issueId].issue_description;
                                        let singleIssue = {
                                            issueId: issueId,
                                            issue_title: issue_title,
                                            issueCreatedOn: issueCreatedOn,
                                            issue_priority: issue_priority,
                                            issue_description: issue_description,
                                        }
                                        if (issue_title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                            newIssues.push(singleIssue);
                                        } else {
                                            continue;
                                        }
                                    }
                                } else {
                                    for (let issueId in issues) {
                                        let issue_title = issues[issueId].issue_title;
                                        let issueCreatedOn = issues[issueId].issueCreatedOn.seconds;
                                        let issue_priority = issues[issueId].issue_priority;
                                        let issue_description = issues[issueId].issue_description;
                                        let singleIssue = {
                                            issueId: issueId,
                                            issue_title: issue_title,
                                            issueCreatedOn: issueCreatedOn,
                                            issue_priority: issue_priority,
                                            issue_description: issue_description,
                                        }
                                        newIssues.push(singleIssue);
                                    }
                                }
                                newIssues.sort(function (a, b) {
                                    let numA = a.issueCreatedOn;
                                    let numB = b.issueCreatedOn;
                                    if (numA > numB) {
                                        return -1;
                                    } else {
                                        if (numA < numB) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    }
                                });
                                let issuesRender = newIssues.map((newIssue) => <IssueButton key={newIssue.issueId}
                                                                                            issue_title={newIssue.issue_title}
                                                                                            issueCreatedOn={newIssue.issueCreatedOn}
                                                                                            issue_priority={newIssue.issue_priority}
                                                                                            issue_description={newIssue.issue_description}/>);
                                return (issuesRender);
                            } else {
                                return (
                                    <div className="no-projects-found">No Issues Found </div>
                                );
                            }
                        }}
                    </DataConsumer>
                    <div className="issuesListPlaceholder">
                    </div>
                </div>
            </div>
        );
    }
}

IssuesDisplay.contextType = DataContext;
export default IssuesDisplay;
