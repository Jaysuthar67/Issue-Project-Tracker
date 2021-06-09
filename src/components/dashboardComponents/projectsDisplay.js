/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 9/6/2021
 */
import React, {Component} from 'react';
import './projectDisplay.css'
import {DataConsumer} from "../Contexts/data";
import ProjectButton from "./ProjectButton";

class ProjectsDisplay extends Component {

    render() {
        return (
            <div className="projectsDisplayContainer">
                <DataConsumer>
                    {(value) => {
                        if (value) {
                            let projects = value.map((val) => {
                                let projectID = Object.keys(val)[0];
                                let projectTitle = val[projectID][0].title;
                                let issueCount = 0
                                if (val[projectID][0].issues) {
                                    let issuesKeys = Object.keys(val[projectID][0].issues);
                                    issueCount = issuesKeys.length;
                                }

                                return {
                                    projectID: [projectID],
                                    projectTitle: [projectTitle],
                                    issueCount: [issueCount]
                                }
                            });
                            projects.sort(function (a, b) {
                                let textA = a.projectTitle.toString().toUpperCase();
                                let textB = b.projectTitle.toString().toUpperCase();
                                if (textA < textB) {
                                    return -1;
                                } else {
                                    if (textA > textB) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }
                            });
                            let projectRender = projects.map(project => <ProjectButton
                                key={project.projectID} projectTitle={project.projectTitle}
                                issueCount={project.issueCount} projectID={project.projectID}
                            />);
                            return (projectRender);
                        }else {
                            console.log("No projects Found for Current User");
                            return (
                                <div>
                                    No Projects Found
                                </div>
                            );
                        }
                    }}
                </DataConsumer>
            </div>
        );
    }

}

export default ProjectsDisplay;
