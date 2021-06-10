/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import React, {Component} from 'react';
import DataContext from "../Contexts/data";
import './activeElement.css';
class ActiveElement extends Component {
    constructor(props) {
        super(props);
        this.state={
            editProject:false,
            editIssue:false
        }
    }

    render() {
        if (this.props.selectedItem.itemType === "project"){

            return (
                <div className="activeElement-Container">
                    <h3>Project:</h3>
                    {this.props.selectedItem.projectId}
                </div>
            );
        }else if (this.props.selectedItem.itemType === "issue"){

        }
        else {
            return (
                <div className="no-projects-found">Nothing Selected</div>
            );
        }

    }
}
ActiveElement.contextType = DataContext;
export default ActiveElement;
