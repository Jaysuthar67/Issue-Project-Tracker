/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */

import React, {useEffect, useState} from 'react';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {updateIssueLifecycle} from "../../firebaseHelperFunctions";

function ActiveIssueLifeCycle(props) {
    const [lifeCycle,setLifeCycle] = useState(props.issue_lifecycle);
    const lifeCycleHandler = (event) => {
        updateIssueLifecycle(props.projctId, props.issueId, event.target.value);
        setLifeCycle(event.target.value);
    };
    useEffect(()=>{
        setLifeCycle(props.issue_lifecycle);
    },[props.issue_lifecycle])

    return (
        <FormControl variant="outlined" size="small">
            <Select value={lifeCycle} onChange={lifeCycleHandler}>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="inProgress">In-Progress</MenuItem>
                <MenuItem value="finished">Finished</MenuItem>
            </Select>
        </FormControl>
    );

}

export default ActiveIssueLifeCycle;
