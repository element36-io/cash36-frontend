import API from '../../config/api';
import { handleError } from '../error.helpers';

export const addContract = async ({ formData }) => {
  try {
    await API.post('compliance/external-contract/add', {
      ...formData
    });
  } catch (error) {
    return handleError(error);
  }
};
