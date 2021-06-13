/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 14/6/2021
 */

import React from 'react';
import {IconButton} from "@material-ui/core";
import {Clear} from "@material-ui/icons";

function UserArrayRender(props) {
    let usersItemRender = []
    for (let projectUsersKey in props.projectUsers) {
        usersItemRender.push(<UserItemsRender key={projectUsersKey}
                                              projectUsers={props.projectUsers[projectUsersKey]}
                                              index={projectUsersKey}
                                              removeUserHandler={props.removeUserHandler}/>);
    }
    return (<>
            {usersItemRender}
            <div className="usersArray-Placeholder"/>
        </>
    );
}

function UserItemsRender(props) {
    return (
        <div className="individual-Users">
            <div className="UserEmail">
                {props.projectUsers}
            </div>
            <IconButton className="deleteUser-Button" size="small" color="secondary" onClick={()=>props.removeUserHandler(props.index)}><Clear/> </IconButton>
        </div>
    );
}


export default UserArrayRender;
