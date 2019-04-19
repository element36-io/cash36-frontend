import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileInput from '../FileInput';
import API from '../../../config/api';
import './Tier2Form.scss';
import { getUserInfo } from '../../../store/auth/auth.actions';

class Tier2Form extends Component {
  state = {
    types: {
      ID_Front: {
        title: 'Government Issued ID (Front)',
        documentType: 'ID_Front',
        file: null
      },
      ID_Back: {
        title: 'Government Issued ID (Back)',
        documentType: 'ID_Back',
        file: null
      },
      Utility_Bill: {
        title: 'Verified Proof of Residence',
        documentType: 'Utility_Bill',
        file: null
      },
      ID_Selfie: {
        title: 'ID Confirmation Photo',
        documentType: 'ID_Selfie',
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
          file: null
        }
      }
    });
  };

  submitFiles = async () => {
    let formData = new FormData();
    const { types } = this.state;
    const { getUserInfo, successCallback } = this.props;

    Object.keys(types).forEach(type => {
      formData.append(`files`, types[type].file);
      formData.append(`documentTypes`, types[type].documentType);
    });

    try {
      this.setState({ submitting: true });
      await API.post('/cash36/user/tier-2', formData);
      successCallback();
      getUserInfo();
    } catch (error) {
      console.log(error);
    }
  };

  render () {
    const { types } = this.state;
    // const { close } = this.props;
    // const disabled = Object.values(types).some(t => !t.file);

    return (
      <div className="verification-form__tier2">
        <h3>Please, upload the following</h3>
        <div className="verification-form__file-wrapper">
          {Object.keys(types).map(type => (
            <FileInput
              changeCallback={this.changeCallback}
              removeCallback={this.removeItem}
              title={types[type].title}
              documentType={types[type].documentType}
              key={types[type].documentType}
            />
          ))}
        </div>
      </div>
    );
  }
}

Tier2Form.propTypes = {
  close: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  successCallback: PropTypes.func.isRequired
};

export default connect(
  null,
  { getUserInfo }
)(Tier2Form);
