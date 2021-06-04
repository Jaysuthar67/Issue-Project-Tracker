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
    Link,
    Paper,
    Typography
} from "@material-ui/core";
import logo from '../assets/AppIcon.svg';
import {Visibility, VisibilityOff} from "@material-ui/icons";

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
        this.setState({
            loading: !this.state.loading
        })
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
        console.log(e.target.value)
        console.log(this.emailRef.current.children[0].value)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="login-container">
                <Paper elevation={3} className="w-100 login-Paper">
                    <div className="login-form-Logo"><img src={logo} alt="logo"/></div>
                    <Typography variant="h3">
                        Login
                    </Typography>
                    <form className="login-form" autoComplete="off">
                        <FormControl className="login-items" fullWidth={true} error={this.state.emailNotValid}>
                            <InputLabel htmlFor="email">Email *</InputLabel>
                            <Input onBlur={this.emailValidator} id="email" type="email" ref={this.emailRef}/>
                            <FormHelperText
                                id="my-helper-text">{this.state.emailNotValid ? "Email Invalid" : ""}</FormHelperText>
                        </FormControl>
                        <FormControl className="login-items" fullWidth={true}>
                            <InputLabel htmlFor="email">Password *</InputLabel>
                            <Input id="password" ref={this.passwordRef}
                                   type={this.state.showPassword ? "text" : "password"}
                                   endAdornment={
                                       <InputAdornment position="end">
                                           <IconButton
                                               aria-label="toggle password visibility"
                                               onClick={this.handleClickShowPassword}
                                           >
                                               {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                           </IconButton>
                                       </InputAdornment>
                                   }
                            />
                        </FormControl>
                        <Button className="login-items" onClick={this.loginClickHandler} variant="contained"
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
