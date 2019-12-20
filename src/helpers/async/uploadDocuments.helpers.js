import API, { API_ROOT } from '../../config/api';
import axios from 'axios';
import { handleError } from '../error.helpers';

// const websiteUrl = process.env.REACT_APP_APP_URL;

export const sendUploadUrl = async (websiteUrl, selfieCode) => {
  try {
    await API.put(
      `/compliance/directupload/send-kyc-link`,
      `${websiteUrl}/upload-documents?selfieCode=${selfieCode}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    return handleError(error);
  }
};

export const uploadDocumentsViaMobile = async (formData, code, selfieCode) => {
  try {
    await axios.post(
      `${API_ROOT}/compliance/directupload/public/upload/${code}?selfieCode=${selfieCode}`,
      formData
    );
  } catch (error) {
    return handleError(error);
  }
};
