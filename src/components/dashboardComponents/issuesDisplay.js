/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 14/6/2021
 */
import React, {Component} from 'react';
import './issueDisplay.css'
import {ButtonBase, InputBase, Menu, MenuItem, Tooltip} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import DataContext, {DataConsumer} from "../Contexts/data";
import IssueButton from "./issueButton";
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';

class IssuesDisplay extends Component {
    searchInputRef;

    constructor(props) {
        super(props);
        this.searchInputRef = React.createRef();
        this.state = {
            search: false,
            searchTerm: null,
            filterMenuAnchor: null
        }
        // let value = this.context;

    }

    filterMenuOpenHandler = (e) => {
        this.setState({
            filterMenuAnchor: e.target
        });
    }
    onFilterUrgentHandler = () => {
        this.searchInputRef.current.children[0].value = "urgent"
        this.setState({
            search: true,
            searchTerm: "urgent",
            filterMenuAnchor: null
        });
    }
    onFilterFinishedHandler = () => {
        this.searchInputRef.current.children[0].value = "finished"
        this.setState({
            search: true,
            searchTerm: "finished",
            filterMenuAnchor: null
        });
    }
    filterMenuCloseHandler = () => {
        this.searchInputRef.current.children[0].value = ""
        this.setState({
            filterMenuAnchor: null,
            search: false
        });
    }

    issuesSearchHandler = (e) => {
        if (e.target.value) {
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

    componentWillUnmount() {
        this.onFilterFinishedHandler = undefined;
        this.issuesSearchHandler = undefined;
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
                                   placeholder="Search…" type="search" ref={this.searchInputRef}/>
                    </div>
                    <Tooltip title="Filters">
                        <ButtonBase className="issues-Filter-Button" onClick={this.filterMenuOpenHandler}>
                            <FilterListRoundedIcon/>
                        </ButtonBase>
                    </Tooltip>
                    <Menu anchorEl={this.state.filterMenuAnchor}
                          keepMounted open={Boolean(this.state.filterMenuAnchor)}
                          onClose={this.filterMenuCloseHandler}>
                        <MenuItem onClick={this.onFilterUrgentHandler}>Urgent</MenuItem>
                        <MenuItem onClick={this.onFilterFinishedHandler}>Finished</MenuItem>
                    </Menu>
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
                                        let issue_lifecycle = issues[issueId].issue_lifecycle;
                                        let singleIssue = {
                                            issueId: issueId,
                                            issue_title: issue_title,
                                            issueCreatedOn: issueCreatedOn,
                                            issue_priority: issue_priority,
                                            issue_description: issue_description,
                                            issue_lifecycle: issue_lifecycle
                                        }
                                        if (this.state.searchTerm.toLowerCase() === "finished") {
                                            if (issues[issueId].issue_lifecycle === "finished") {
                                                newIssues.push(singleIssue);
                                            }
                                        } else if (this.state.searchTerm.toLowerCase() === "urgent") {
                                            if (issues[issueId].issue_priority === "urgent") {
                                                newIssues.push(singleIssue);
                                            }
                                        } else if (issue_title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                                            newIssues.push(singleIssue);
                                        }
                                    }
                                } else {
                                    for (let issueId in issues) {
                                        let issue_title = issues[issueId].issue_title;
                                        let issueCreatedOn = issues[issueId].issueCreatedOn.seconds;
                                        let issue_priority = issues[issueId].issue_priority;
                                        let issue_description = issues[issueId].issue_description;
                                        let issue_lifecycle = issues[issueId].issue_lifecycle
                                        let singleIssue = {
                                            issueId: issueId,
                                            issue_title: issue_title,
                                            issueCreatedOn: issueCreatedOn,
                                            issue_priority: issue_priority,
                                            issue_description: issue_description,
                                            issue_lifecycle: issue_lifecycle
                                        }
                                        if (issues[issueId].issue_lifecycle !== "finished") {
                                            newIssues.push(singleIssue);
                                        }
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
                                                                                            projectId={this.props.selectedItem.projectId[0][0]}
                                                                                            selectIssueHandler={this.props.selectIssueHandler}
                                                                                            issueId={newIssue.issueId}
                                                                                            issue_title={newIssue.issue_title}
                                                                                            issueCreatedOn={newIssue.issueCreatedOn}
                                                                                            issue_priority={newIssue.issue_priority}
                                                                                            issue_lifecycle={newIssue.issue_lifecycle}
                                                                                            issue_description={newIssue.issue_description}/>);
                                return (issuesRender);
                            } else {
                                return (
                                    <div className="no-projects-found">Nothing Selected</div>
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
