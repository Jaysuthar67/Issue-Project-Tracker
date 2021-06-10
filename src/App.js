/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 11/6/2021
 */

import './App.css';
import React, {Component} from 'react';
import {createMuiTheme, LinearProgress, ThemeProvider} from "@material-ui/core";
import muiThemeConfig from "./components/muiThemeConfig";
import Dashboard from "./components/dashboard";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import {AuthProvider} from "./components/Contexts/auth";
import "firebase/auth";
import {FirebaseAuth} from "./firebaseInit";

class App extends Component {
    authStateListener;

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            appLoading: true,

        }
    }


    componentDidMount() {
        this.authStateListener = FirebaseAuth.onAuthStateChanged((currentUser) => {
            this.setState({
                user: currentUser,
                appLoading: false
            });
        });
    }

    componentWillUnmount() {
        this.authStateListener = undefined;
    }

    handler = () => {
        console.log("handlerCalled");
    }

    render() {
        const theme = createMuiTheme(muiThemeConfig)
        if (this.state.appLoading) {
            return (
                <ThemeProvider theme={theme}>
                    <div className="appLoading">Please Wait Loading ...<LinearProgress className="appLoading-Progress"/>
                    </div>
                </ThemeProvider>
            );
        } else {
            return (
                <ThemeProvider theme={theme}>
                    <Router>
                        <AuthProvider value={this.state.user}>
                            <div className="App">
                                <Route exact path="/">
                                    {this.state.user ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
                                </Route>
                                <Route exact path="/dashboard">
                                    <Dashboard parentHandler={this.handler}/>
                                </Route>
                                <Route path="/login">
                                    <Login/>
                                </Route>
                                <Route path="/signup">
                                    <Signup/>
                                </Route>
                            </div>

                        </AuthProvider>
                    </Router>
                </ThemeProvider>
            );
        }
    }

}

export default App;
