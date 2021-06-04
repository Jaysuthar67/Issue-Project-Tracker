import './App.css';

import React, {Component} from 'react';
import Login from "./components/login";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";


class App extends Component {

    render() {
        const theme = createMuiTheme({
            palette: {
                type: 'dark',
                primary: {
                    main: '#39796B',
                },
                secondary: {
                    main: '#E74C3C',
                },
                background: {
                    paper: '#3d3d3d',
                    default: '#191919',
                },
                error: {
                    main: '#f44336',
                },
                divider: 'rgba(255,255,255,0.31)',
                typography: {
                    fontFamily: 'Open Sans',
                },
            },
        })
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Login/>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
