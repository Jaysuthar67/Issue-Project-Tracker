/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 5/6/2021
 */

import './App.css';
import React, {Component} from 'react';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import muiThemeConfig from "./components/muiThemeConfig";
import Dashboard from "./components/dashboard";

class App extends Component {

    render() {
        const theme = createMuiTheme(muiThemeConfig)
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Dashboard Username="Jay"/>
                    {/*<Login/>*/}
                    {/*<Signup/>*/}
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
