/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 8/6/2021
 */

import React, {Component} from 'react';
import './signup.css'
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
import {AuthConsumer} from "./Contexts/auth";
import {FirebaseAuth} from "../firebaseInit";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfRef = React.createRef();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.state = {
            loading: false,
            showPassword: false,
            emailNotValid: false,
            passwordNotValid: false,
            firstNameEmpty: false,
            lastNameEmpty: false,
            signUpError: false
        }
    }
    signOutHandler = () => {
        FirebaseAuth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }
    handleSubmit =async (e) => {
        e.preventDefault();
        // hack for Validating on focus. Too Bad
        this.emailRef.current.children[0].focus();
        this.firstName.current.children[0].focus();
        this.lastName.current.children[0].focus();
        this.passwordRef.current.children[0].focus();
        if (this.state.emailNotValid) {
            this.emailRef.current.children[0].focus();
        } else if (this.state.firstNameEmpty) {
            this.firstName.current.children[0].focus();
        } else if (this.state.lastNameEmpty) {
            this.lastName.current.children[0].focus();
        } else if (this.state.passwordNotValid) {
            this.passwordRef.current.children[0].focus();
        } else {
            this.setState({
                loading: true
            })
            let email = this.emailRef.current.children[0].value;
            let password = this.passwordRef.current.children[0].value;
            let newDisplayName = this.firstName.current.children[0].value + " " + this.lastName.current.children[0].value
            await FirebaseAuth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    let success = false;
                    user.updateProfile({
                        displayName: newDisplayName,
                    }).then(function () {
                        console.log("SignUp Successful");
                        success = true;
                    }).catch(function (error) {
                        console.log("error in setting up User");
                        console.log(error);
                        success = false;
                    });
                    this.setState({
                        signUpError: !success
                    });
                    this.signOutHandler();
                })
                .catch((error) => {
                    let errorCode = error.code;
                    if (errorCode === "auth/email-already-exists") {
                        this.setState({
                            signUpError: true
                        })
                    } else if (errorCode === "auth/email-already-in-use") {
                        this.setState({
                            signUpError: true
                        })
                    } else if (errorCode === "auth/invalid-email") {
                        this.setState({
                            signUpError: true
                        })
                    } else {
                        alert(`Something went wrong : ${errorCode}`)
                        console.log(error);
                    }
                });
        }
    }


    handleClickShowPassword = () => {
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
    validatePassword = () => {
        if (this.passwordRef.current.children[0].value) {
            if (this.passwordRef.current.children[0].value === this.passwordConfRef.current.children[0].value) {
                this.setState({
                    passwordNotValid: false
                });
            } else {
                this.setState({
                    passwordNotValid: true
                });
            }
        } else {
            this.setState({
                passwordNotValid: true
            });
        }
    }
    isNameEmpty = () => {
        if (this.firstName.current.children[0].value) {
            this.setState({
                firstNameEmpty: false
            });
        } else {
            this.setState({
                firstNameEmpty: true
            });
        }
        if (this.lastName.current.children[0].value) {
            this.setState({
                lastNameEmpty: false
            });
        } else {
            this.setState({
                lastNameEmpty: true
            });
        }

    }

    componentWillUnmount() {
        this.handleSubmit = undefined;
        this.signOutHandler = undefined;
    }

    render() {
        return (
            <AuthConsumer>
                {(val) => {
                    if (val) {
                        return (
                            <Redirect to="/"/>
                        );
                    } else {
                        return (
                            <div className="signup-container">
                                <Paper elevation={3} className="w-100 signup-Paper">
                                    {this.state.loading ? <LinearProgress className="w-100"/> : ""}
                                    <div className="signup-form-Logo"><img src={logo} alt="logo"/></div>
                                    <Typography variant="h4">
                                        Create New Account
                                    </Typography>
                                    <form className="signup-form" autoComplete="off" onSubmit={this.handleSubmit}>
                                        <div className="nameDiv">
                                            <FormControl className="signup-items lastName"
                                                         disabled={this.state.loading}
                                                         error={this.state.firstNameEmpty}>
                                                <InputLabel htmlFor="email">First Name *</InputLabel>
                                                <Input onBlur={this.isNameEmpty}
                                                       id="firstName" type="text" ref={this.firstName}
                                                       autoFocus/>

                                            </FormControl>
                                            <FormControl className="signup-items lastName"
                                                         disabled={this.state.loading}
                                                         error={this.state.lastNameEmpty}>
                                                <InputLabel htmlFor="email">Last Name *</InputLabel>
                                                <Input onBlur={this.isNameEmpty}
                                                       id="lastName" type="text" ref={this.lastName}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormControl className="signup-items"
                                                     fullWidth={true}
                                                     disabled={this.state.loading}
                                                     error={this.state.emailNotValid}>
                                            <InputLabel htmlFor="email">Email *</InputLabel>
                                            <Input onBlur={this.emailValidator} id="email" type="email"
                                                   ref={this.emailRef}/>
                                        </FormControl>
                                        <FormControl className="signup-items"
                                                     fullWidth={true}
                                                     disabled={this.state.loading}
                                                     error={this.state.passwordNotValid}>
                                            <InputLabel htmlFor="email">Password *</InputLabel>
                                            <Input id="password"
                                                   ref={this.passwordRef}
                                                   onBlur={this.validatePassword}
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
                                        <FormControl className="signup-items"
                                                     fullWidth={true}
                                                     disabled={this.state.loading}
                                                     error={this.state.passwordNotValid}>
                                            <InputLabel htmlFor="email">Confirm Password *</InputLabel>
                                            <Input id="confirmPassword"
                                                   ref={this.passwordConfRef}
                                                   onBlur={this.validatePassword}
                                                   type={this.state.showPassword ? "text" : "password"}
                                            />
                                            <FormHelperText
                                                id="my-helper-text">{this.state.passwordNotValid ? "Please enter valid Email Address" : ""}
                                            </FormHelperText>
                                        </FormControl>
                                        {this.state.signUpError ?
                                            <div className="signupError"> User with this E-mail id Already
                                                Exists</div> : ""}
                                        <Button className="signup-items" disabled={this.state.loading}
                                                type="submit" variant="contained"
                                                size="large" color="primary">
                                            signup
                                        </Button>
                                    </form>
                                    <div className="Signup-link-parent">
                                        Already Have Account?&nbsp;
                                        <Link to="/login">Login</Link>
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

export default Signup;

