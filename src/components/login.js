/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 7/6/2021
 */

import React, {Component} from 'react';
import './login.css'
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    LinearProgress,
    Paper,
    Typography
} from "@material-ui/core";
import logo from '../assets/AppIcon.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {validateEmail} from "./helperFunctions";
import {Link, Redirect} from "react-router-dom";
import {FirebaseAuth} from "../firebaseInit";
import {AuthConsumer} from "./Contexts/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            loading: false,
            showPassword: false,
            emailNotValid: false,
            passwordEmpty: false,
            signInError: false,
            userCredential: null
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.emailNotValid) {
            this.emailRef.current.children[0].focus();
        } else if (this.state.passwordEmpty) {
            this.passwordRef.current.children[0].focus();
        } else {
            this.setState({
                loading: true
            });
            let email = this.emailRef.current.children[0].value
            let password = this.passwordRef.current.children[0].value
            await FirebaseAuth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    this.setState({
                        userCredential: userCredential,
                        signInError: false
                    });
                })
                .catch((error) => {
                    let errorCode = error.code;
                    if (errorCode === 'auth/user-not-found') {
                        this.setState({
                            signInError: true
                        });
                    } else if (errorCode === 'auth/invalid-email') {
                        this.setState({
                            signInError: true
                        });
                    } else if (errorCode === 'auth/wrong-password') {
                        this.setState({
                            signInError: true
                        });
                    } else {
                        alert(`Something went wrong : ${errorCode}`)
                        console.log(error);
                    }
                });
            this.setState({
                loading: false
            });
        }
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    handleMouseDownPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    emailValidator = (e) => {
        if (validateEmail(e.target.value)) {
            this.setState({
                emailNotValid: false
            });
        } else {
            this.setState({
                emailNotValid: true
            });
        }
    }
    isPasswordEmpty = (e) => {
        if (e.target.value) {
            this.setState({
                passwordEmpty: false
            });
        } else {
            this.setState({
                passwordEmpty: true
            });
        }
    }

    componentDidMount() {
    }

    render() {
        console.log("login Rendered");
        console.log("User from Login");
        console.log(this.state.userCredential);
        return (
            <AuthConsumer>
                {(val) => {
                    if (val) {
                        return (
                            <Redirect to="/dashboard"/>
                        );
                    } else {
                        return (
                            <div className="login-container">
                                <Paper elevation={3} className="w-100 login-Paper">
                                    {this.state.loading ? <LinearProgress className="w-100"/> : ""}
                                    {/*TODO Setup wrong password alert*/}
                                    <div className="login-form-Logo"><img src={logo} alt="logo"/></div>
                                    <Typography variant="h3">
                                        Login
                                    </Typography>
                                    <form className="login-form" autoComplete="off" onSubmit={this.handleSubmit}>
                                        <FormControl className="login-items"
                                                     fullWidth={true}
                                                     disabled={this.state.loading}
                                                     error={this.state.emailNotValid}>
                                            <InputLabel htmlFor="email">Email *</InputLabel>
                                            <Input onBlur={this.emailValidator} id="email" type="email"
                                                   ref={this.emailRef}
                                                   autoFocus/>
                                            <FormHelperText
                                                id="my-helper-text">{this.state.emailNotValid ? "Please enter valid Email Address" : ""}</FormHelperText>
                                        </FormControl>
                                        <FormControl className="login-items"
                                                     fullWidth={true}
                                                     disabled={this.state.loading}
                                                     error={this.state.passwordEmpty}>
                                            <InputLabel htmlFor="email">Password *</InputLabel>
                                            <Input id="password"
                                                   ref={this.passwordRef}
                                                   onBlur={this.isPasswordEmpty}
                                                   type={this.state.showPassword ? "text" : "password"}
                                                   endAdornment={
                                                       <InputAdornment position="end">
                                                           <IconButton disabled={this.state.loading}
                                                                       aria-label="toggle password visibility"
                                                                       onClick={this.handleClickShowPassword}
                                                           >
                                                               {this.state.showPassword ? <VisibilityOff/> :
                                                                   <Visibility/>}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   }
                                            />
                                        </FormControl>

                                        {this.state.signInError ?
                                            <div className="loginError"> E-mail id or Password invalid</div> : ""}
                                        <Button className="login-items" disabled={this.state.loading}
                                                type="submit" variant="contained"
                                                size="large" color="primary">
                                            Login
                                        </Button>
                                    </form>
                                    <div className="Signup-link-parent">
                                        Don’t Have Account?&nbsp;
                                        {!this.state.loading ? <Link to="/signup">Create New</Link> : "Create New"}
                                    </div>
                                </Paper>
                            </div>
                        );
                    }

                }}
            </AuthConsumer>

        );
    }
}

export default Login;

// let errorCode = error.code;
// if (errorCode === 'auth/user-not-found') {
//     this.setState({
//         signInError: true
//     });
// } else if (errorCode === 'auth/invalid-email') {
//     this.setState({
//         signInError: true
//     });
// } else if (errorCode === 'auth/wrong-password') {
//     this.setState({
//         signInError: true
//     });
// } else {
//     console.log(errorCode);
// }
