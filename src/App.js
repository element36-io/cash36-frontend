import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Header from './Header';
import { Connect, MNID } from 'uport-connect'
import Subheader from './Subheader';
import Main from './Main';
import Footer from './Footer';
import Wallet from './Wallet';


const theme = createMuiTheme({
    palette: {
        type: 'dark'
    },
    overrides: {
        MuiButton: {
            root: {
                background: 'linear-gradient(110deg, rgba(185,62,79,0.4), rgba(246,186,57,0.4))',
                borderRadius: 7,
                border: '1px solid #F4E05F',
                color: 'white',
                height: 30,
            },
        },
    },
});

class App extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            tokens: {},
            loggedInAddress: '',
            name: '',
            avatar: '',
            verified: false,
            tabIndex: 0,
            backendUrl: url
        }
    }

    componentDidMount() {
        this.updateTokens();
    }

    handleLogin() {
        const uport = new Connect('cash36', { clientId: '2oriBCK1qJEBWZnE9L1ib3jkSZ7fzWuKLGR' });
        uport.requestCredentials().then((credentials) => {
            let userAddress = MNID.decode(credentials.address).address;

            let name = credentials.name;
            let avatar = '';
            if (name.indexOf(' ') > 0) {
                let parts = name.split(' ');
                avatar = parts[0].substr(0, 1) + parts[1].substr(0, 1);
                console.log(avatar.toUpperCase());
            }

            console.log(userAddress);
            this.setState({ loggedInAddress: userAddress, name: name, avatar: avatar });
            this.checkUser(userAddress);
            this.updateTokens();
        });
    }

    checkUser(userAddress) {
        // Check if User is verified
        fetch(`${this.state.backendUrl}/kyc/user/?userAddress=${userAddress}`).then(results => {
            return results.json();
        }).then(verified => {
            console.log(verified);
            this.setState({ verified: verified });
        });
    }

    updateTokens() {
        fetch(`${this.state.backendUrl}/token`).then(results => {
            return results.json();
        }).then(data => {
            if (this.state.loggedInAddress !== '') {
                for (let i = 0; i < data.length; i++) {
                    fetch(`${this.state.backendUrl}/token/${data[ i ].symbol}/balance?userAddress=${this.state.loggedInAddress}`).then(results => {
                        return results.json();
                    }).then(balance => {
                        data[ i ].balance = balance;
                        this.setState({ tokens: data });
                    });
                }
            } else {
                this.setState({ tokens: data });
            }
        });
    }

    changeTab = (event, value) => {
        this.setState({ tabIndex: value});
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div style={{backgroundColor: '#191B2A'}}>
                    <Header handleLogin={this.handleLogin.bind(this)} changeTab={this.changeTab.bind(this)}
                            tabIndex={this.state.tabIndex} loggedInAddress={this.state.loggedInAddress}
                            avatar={this.state.avatar} verified={this.state.verified} />
                    <Subheader/>
                    {this.state.tabIndex === 0 &&
                    <Main tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}
                          loggedInAddress={this.state.loggedInAddress}/>
                    }
                    {this.state.tabIndex === 1 &&
                    <Wallet tokens={this.state.tokens} updateTokens={this.updateTokens.bind(this)}
                            loggedInAddress={this.state.loggedInAddress}/>
                    }
                    {this.state.tabIndex === 2 &&
                    <div>Settings</div>
                    }
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
