import API from '../../config/api';
import { handleError } from '../error.helpers';

export const addContract = async formData => {
  try {
    await API.post('compliance/external-contract/add', formData);
  } catch (error) {
    return handleError(error);
  }
};

export const getUserContracts = async () => {
  try {
    const { data } = await API.get('compliance/external-contract/list');

    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getPublicContracts = async () => {
  try {
    const { data } = await API.get('compliance/external-contract/listPublic/');

    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllContracts = async () => {
  try {
    const { data } = await API.get('compliance/external-contract/listAll/');

    return data;
  } catch (error) {
    return handleError(error);
  }
};
