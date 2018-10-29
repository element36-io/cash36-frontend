import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VerificationHeader from '../VerificationHeader';
import VerificationActions from '../VerificationActions';
import FileInput from '../FileInput';
import API from '../../../config/api';
import './Tier2Form.scss';
import { getKyc } from '../../../store/auth/auth.actions';

// TODO: add file validation
class Tier2Form extends Component {
    state = {
      types: {
        ID_Front: {
          title: 'Government Issued ID (Front)',
          documentType: 'ID_Front',
          documentName: null,
          file: null
        },
        ID_Back: {
          title: 'Government Issued ID (Back)',
          documentType: 'ID_Back',
          documentName: null,
          file: null
        },
        Utility_Bill: {
          title: 'Verified Proof of Residence',
          documentType: 'Utility_Bill',
          documentName: null,
          file: null
        },
        ID_Selfie: {
          title: 'ID Confirmation Photo',
          documentType: 'ID_Selfie',
          documentName: null,
          file: null
        }
      },
      submitting: false
    };

    changeCallback = (file, documentType) => {
      this.setState({
        types: {
          ...this.state.types,
          [documentType]: {
            ...this.state.types[documentType],
            documentName: file.name,
            file
          }
        }
      });
    };

    removeItem = documentType => {
      this.setState({
        types: {
          ...this.state.types,
          [documentType]: {
            ...this.state.types[documentType],
            documentName: null
          }
        }
      });
    };

    submitFiles = async () => {
      let formData = new FormData();
      const { types } = this.state;
      const { getKyc, successCallback } = this.props;

      Object.keys(types).forEach(type => {
        formData.append(`files`, types[type].file);
        formData.append(`documentTypes`, types[type].documentType);
      });

      try {
        this.setState({ submitting: true });
        await API.post('/cash36/user/tier-2', formData);
        successCallback();
        getKyc();
      } catch (error) {
        console.log(error);
      }
    };

    render () {
      const { types, submitting } = this.state;
      const { close } = this.props;

      return (
        <div className='verification-form__tier2'>
          <VerificationHeader title='Tier 2 Verification'
            subtitle='Please, upload the following information to be able to use most of your account' />
          <h3>
                    Please, upload the following
          </h3>
          <div className='verification-form__file-wrapper'>
            {Object.keys(types).map(type => (
              <FileInput changeCallback={this.changeCallback} removeCallback={this.removeItem}
                title={types[type].title}
                documentType={types[type].documentType}
                documentName={types[type].documentName}
                key={types[type].documentType}
              />
            ))}
          </div>
          <VerificationActions close={close} buttonCallback={this.submitFiles} isSubmitting={submitting} buttonText={'Submit & Continue'} />
        </div>
      );
    }
}

Tier2Form.propTypes = {
  close: PropTypes.func.isRequired,
  getKyc: PropTypes.func.isRequired,
  successCallback: PropTypes.func.isRequired
};

export default connect(null, { getKyc })(Tier2Form);
