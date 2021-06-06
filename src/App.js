/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 7/6/2021
 */

import './App.css';
import React, {Component} from 'react';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import muiThemeConfig from "./components/muiThemeConfig";
import Dashboard from "./components/dashboard";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "null"
            }
        }
    }

    render() {
        const theme = createMuiTheme(muiThemeConfig)
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <div className="App">
                        <Route exact path="/">
                            {this.state.user.username ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
                        </Route>
                        <Route exact path="/dashboard">
                            <Dashboard Username="Jay"/>
                        </Route>

                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/signup">
                            <Signup/>
                        </Route>
                    </div>
                </Router>

            </ThemeProvider>
        );
    }
}

export default App;
