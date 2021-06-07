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
import {AuthProvider} from "./components/Contexts/auth";
import "firebase/auth";
import {FirebaseAuth} from "./firebaseInit";

class App extends Component {
    authStateListener;

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        this.authStateListener =  FirebaseAuth.onAuthStateChanged((currentUser) => {
            this.setState({
                user: currentUser
            });
        });
    }

    componentWillUnmount() {
        // alert("App Unmount");
        this.authStateListener = undefined;
    }

    handler = () => {
        console.log("handlerCalled");
    }
    signOutHandler = () => {
        FirebaseAuth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }

    render() {
        const theme = createMuiTheme(muiThemeConfig)
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <AuthProvider value={this.state.user}>
                        <div className="App">
                            <button onClick={this.handler}>handler</button>
                            <Route exact path="/">
                                {this.state.user ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>}
                            </Route>
                            <Route exact path="/dashboard">
                                <Dashboard signOutHandler={this.signOutHandler}/>
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

export default App;
