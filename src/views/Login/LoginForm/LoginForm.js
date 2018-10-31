import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MNID } from 'uport-connect';
import { withStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import LoginUsername from '../LoginUsername';
import LoginField from '../LoginField';
import { login, clearErrors } from '../../../store/auth/auth.actions';
import styles from './MuiStyles';

class LoginForm extends Component {
  state = { password: '' };

  componentWillUnmount () {
    this.props.clearErrors();
  }

  handleInputChange = evt => {
    const { name, value } = evt.target;

    if (this.props.errorMessage) {
      this.props.clearErrors();
    }
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = MNID.decode(this.props.uportCreds.networkAddress).address;
    const { password } = this.state;
    const user = {
      username,
      name: this.props.uportCreds.name,
      avatarUri: this.props.uportCreds.avatar ? this.props.uportCreds.avatar.uri : null,
      lastLoggedIn: new Date().getTime()
    };
    this.props.login(username, password, user);
  };

  render () {
    const { classes, errorMessage, uportCreds } = this.props;
    const { password } = this.state;
    const firstName = uportCreds.name.split(' ')[0];
    return (
      <div className='login__form'>
        <form
          onSubmit={this.handleFormSubmit}
        >
          <h2>Welcome</h2>
          <p>
            Welcome back, {firstName}<br />
            Please, enter your password
          </p>
          <div className='login__field-wrapper'>
            <LoginUsername networkAddress={uportCreds.networkAddress} />
            <LoginField name='password' value={password} placeholder='Password' changeHandler={this.handleInputChange} label='Password' />
          </div>
          <p className='login__form__error'>
            {errorMessage}
          </p>
          <DefaultButton
            variant='raised'
            color='primary'
            type='submit'
            size='large'
            fullWidth
            className={classes.button}
          >
            <span>Log in</span>
            <ArrowForwardIcon />
          </DefaultButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.errorMessage });

LoginForm.propTypes = {
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  uportCreds: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { login, clearErrors })(withStyles(styles)(LoginForm));
