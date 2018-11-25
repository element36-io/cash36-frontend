import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import StepButton from '../../../components/Buttons/StepButton';
import './TransferAddress.scss';

class TransferAddress extends Component {

  state = {
    address: ''
  };

  handleChange = evt => {
    const {name, value} = evt.target;
    this.setState({[name]: value});
  };

  onSubmit = evt => {
    const isAddressValid = this.props.utils.isAddress(this.state.address);

    if (isAddressValid) {
    } else {
    }
  };

  render() {
    const {address} = this.state;

    return (
      <div className='transfer-address'>
        <h2>Transfer Tokens</h2>
        <h4>Transfer tokens to</h4>
        <div className='transfer-address__input-wrapper'>
          <TextField
            name='address'
            type='text'
            onChange={this.handleChange}
            placeholder='Address'
            value={address}
            autoComplete='off'
            fullWidth
            className='transfer-address__input'
            InputProps={{
              disableUnderline: true
            }}
          />
          {/*<span>{inputError}</span>*/}
        </div>
        <StepButton text={'Next Step'} onClick={this.onSubmit} disabled={!address}/>
      </div>
    );
  }
}

TransferAddress.propTypes = {
  submitCallback: PropTypes.func,
  utils: PropTypes.object.isRequired
};

export default TransferAddress;
