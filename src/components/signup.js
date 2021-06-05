/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 5/6/2021
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
    Link,
    Paper,
    Typography
} from "@material-ui/core";
import logo from '../assets/AppIcon.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {validateEmail} from "./helperFunctions";

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
            lastNameEmpty: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
            //TODO : CAll Firebase SignUp With Email_Password And Set Display_Name;
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 2000);
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

    render() {
        return (
            <div className="signup-container">
                <Paper elevation={3} className="w-100 signup-Paper">
                    {this.state.loading ? <LinearProgress className="w-100"/> : ""}
                    {/*TODO Setup wrong password alert*/}
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
                            <Input onBlur={this.emailValidator} id="email" type="email" ref={this.emailRef}/>
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
                                               {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
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
                            <Input id="password"
                                   ref={this.passwordConfRef}
                                   onBlur={this.validatePassword}
                                   type={this.state.showPassword ? "text" : "password"}
                            />
                            <FormHelperText
                                id="my-helper-text">{this.state.passwordNotValid ? "Please enter valid Email Address" : ""}
                            </FormHelperText>
                        </FormControl>
                        <Button className="signup-items" disabled={this.state.loading}
                                type="submit" variant="contained"
                                size="large" color="primary">
                            signup
                        </Button>
                    </form>
                    <div className="Signup-link-parent">
                        Already Have Account?&nbsp;
                        <Link href="">Login</Link>
                    </div>

                </Paper>
            </div>
        );
    }
}

export default Signup;
