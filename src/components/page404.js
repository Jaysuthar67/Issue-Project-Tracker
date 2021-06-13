/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 14/6/2021
 */
import React from 'react';
import {Link} from "react-router-dom";
import './page404.css'
import {Button} from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function Page404() {
    return (
        <div className="container-404">
            <div className="txt404">404</div>
            <div className="notFound">PAGE NOT FOUND</div>
            <div className="backLink">
                <Link to="/">
                    <Button className="backButton" variant="outlined" size="large" startIcon={<ChevronLeftIcon/>}>Go
                        Back</Button>
                </Link>
            </div>
        </div>
    );
}

export default Page404;
