import API, { API_ROOT } from '../../config/api';
import axios from 'axios';
import { handleError } from '../error.helpers';

export const sendUploadUrl = async () => {
  try {
    await API.put(
      `/compliance/directupload/send-kyc-link`,
      `http://localhost:3000/upload-documents`,
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

export const uploadDocumentsViaMobile = async (formData, code) => {
  try {
    await axios.post(
      `${API_ROOT}/compliance/directupload/public/upload/${code}`,
      formData
    );
  } catch (error) {
    return handleError(error);
  }
};
