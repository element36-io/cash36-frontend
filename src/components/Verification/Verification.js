import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DefaultButton from '../Buttons/DefaultButton';
import Tier1Form from './Tier1Form';
import Tier2Form from './Tier2Form';
import VerificationProgress from './VerificationProgress';

import './Verification.scss';

class Verification extends Component {
    state = {
      step: 0,
      blockModal: false
    };

    componentDidMount () {
      this.getCurrentStep();
    }

    componentDidUpdate (prevProps) {
      if (this.props.isVisible !== prevProps.isVisible && this.props.isVisible) {
        this.getCurrentStep();
      }
    }

    getCurrentStep () {
      const { user: { kycProcessStatus } } = this.props;
      let step;

      switch (kycProcessStatus) {
        case 'REGISTERED':
          step = 1;
          break;
        case 'AWAITING_VERIFICATION':
          step = 2;
          break;
        default:
          step = 0;
      }

      this.setState({
        step, blockingModal: false
      });
    }

    nextStep = () => {
      this.setState({ step: this.state.step + 1 });
    };

    toggleModalBlock = () => {
      this.setState({ blockModal: !this.state.blockModal });
    };

    steps = [
      <Tier1Form close={this.props.close} nextStep={this.nextStep} toggleModalBlock={this.toggleModalBlock} />,
      <Tier2Form close={this.props.close} successCallback={this.nextStep} />,
      <VerificationProgress tier='Tier 2'>
        <DefaultButton onClick={this.props.close} fullWidth color='primary' variant='raised'>
                Finish
        </DefaultButton>
      </VerificationProgress>
    ];

    render () {
      const { isVisible, close } = this.props;
      const { step, blockModal } = this.state;

      return (
        <Dialog onClose={close} open={isVisible} maxWidth={false} disableBackdropClick={blockModal}
          disableEscapeKeyDown={blockModal}>
          <div className='verification-form'>
            {step !== 0 && <CloseIcon onClick={close} className='verification-form__close' />}
            {this.steps[step]}
          </div>
        </Dialog>
      );
    }
}

Verification.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired

};

export default Verification;
