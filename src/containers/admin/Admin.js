import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SubheaderEmpty from "../../components/SubheaderEmpty";
import AdminLogin from "./AdminLogin";
import AdminSettings from "./AdminSettings";

const styles = {
    root: {
        flexGrow: 1,
    },
};

class Admin extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080'
            : 'https://cash36-backend.herokuapp.com';

        this.state = {
            backendUrl: url,
            loggedIn: false,
        };
    }

    componentDidMount() {
        if (localStorage.getItem('access_token') !== null) {
            this.setState({ loggedIn: true })
        }
    }

    handleLogin = (username, password) => {
        fetch(`${this.state.backendUrl}/public/users/login?username=${username}&password=${password}`, {
            method: "POST",
        }).then((response) => {
            return response.text();
        }).then((token) => {
            localStorage.setItem('access_token', token);
            this.setState({ loggedIn: true })
        });
    };

    handleLogout = () => {
        this.setState({ loggedIn: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <SubheaderEmpty/>
                {this.state.loggedIn && <AdminSettings handleLogout={this.handleLogout.bind(this)}/>}
                {!this.state.loggedIn && <AdminLogin handleLogin={this.handleLogin.bind(this)}/>}
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
