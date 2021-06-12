/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 12/6/2021
 */

import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
function ProjectUsersRender(props) {
    let styles = {
        width: "95%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        msTextOverflow: "ellipsis",
        fontFamily: '"Roboto Light", sans-serif',
        fontSize: "0.8rem",
        display:"flex",
        alignItems:"center",
        marginLeft:"0.5rem"
    }
    let styles2={
        marginRight:"0.2rem"
    }
    return (
        <div style={styles}>
            <AccountCircleIcon style={styles2}/>
            {props.user.substring(0,15)} ...
        </div>
    );
}

export default ProjectUsersRender;
