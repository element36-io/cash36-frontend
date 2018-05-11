import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Header from './components/Header';
import Main from './containers/Main';
import Footer from './components/Footer';


const theme = createMuiTheme({
    palette: {
        type: 'light'
    },
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: '#67B6F4',
                borderRadius: 30,
                height: 30,
                color: 'black',
                '&:hover': {
                    backgroundColor: '#67B6F4',
                    color: 'white'
                }
            },
        },
    },
});

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
