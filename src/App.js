/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 6/6/2021
 */

import './App.css';
import React, {Component} from 'react';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import muiThemeConfig from "./components/muiThemeConfig";
import Dashboard from "./components/dashboard";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";

class App extends Component {

    render() {
        const theme = createMuiTheme(muiThemeConfig)
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <div className="App">

                            <Route exact path="/">
                                <Dashboard Username="Jay"/>
                            </Route>
                            <Route path="/login" >
                                <Login/>
                            </Route>
                            <Route path="/signup" >
                                <Signup/>
                            </Route>
                    </div>
                </Router>

            </ThemeProvider>
        );
    }
}

export default App;
