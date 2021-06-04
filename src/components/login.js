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
    Link,
    Paper,
    Typography
} from "@material-ui/core";
import logo from '../assets/AppIcon.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {validateEmail} from "./helperFunctions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            loading: false,
            showPassword: false,
            emailNotValid: false
        }
    }

    loginClickHandler = () => {
        if (this.state.emailNotValid) {
            this.emailRef.current.children[0].focus()
        } else {
            this.setState({
                loading: true
            })
            setTimeout(()=>{
                this.setState({
                    loading: false
                })
            }, 2000);
            // alert(`Email : ${this.emailRef.current.children[0].value}\nPassword : ${this.passwordRef.current.children[0].value}`)
        }
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    handleMouseDownPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    emailValidator = (e) => {
        if (validateEmail(e.target.value)) {
            this.setState({
                emailNotValid: false
            })
        } else {
            this.setState({
                emailNotValid: true
            })
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="login-container">
                <Paper elevation={3} className="w-100 login-Paper">
                    {this.state.loading ? <LinearProgress className="w-100"/> : ""}
                    {/*TODO Setup wrong password alert*/}
                    <div className="login-form-Logo"><img src={logo} alt="logo"/></div>
                    <Typography variant="h3">
                        Login
                    </Typography>
                    <form className="login-form" autoComplete="off">
                        <FormControl className="login-items" fullWidth={true} error={this.state.emailNotValid}
                                     disabled={this.state.loading}>
                            <InputLabel htmlFor="email">Email *</InputLabel>
                            <Input onBlur={this.emailValidator} id="email" type="email" ref={this.emailRef} autoFocus/>
                            <FormHelperText
                                id="my-helper-text">{this.state.emailNotValid ? "Please enter valid Email Address" : ""}</FormHelperText>
                        </FormControl>
                        <FormControl className="login-items" fullWidth={true} disabled={this.state.loading}>
                            <InputLabel htmlFor="email">Password *</InputLabel>
                            <Input id="password" ref={this.passwordRef}
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
                        <Button className="login-items" disabled={this.state.loading}
                                onClick={this.loginClickHandler} variant="contained"
                                size="large" color="primary">
                            Login
                        </Button>
                    </form>
                    <div className="Signup-link-parent">
                        Don’t Have Account?&nbsp;
                        <Link>Create New</Link>
                    </div>

                </Paper>
            </div>
        );
    }
}

export default Login;
