import API from '../../config/api';
import { handleError } from '../error.helpers';

export const addContract = async formData => {
  try {
    await API.post('compliance/external-contract/add', formData);
  } catch (error) {
    return handleError(error);
  }
};

export const editContract = async (contractAddress, formData) => {
  try {
    await API.put(
      `compliance/external-contract/update/${contractAddress}`,
      formData
    );
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

export const deleteContract = async contractAddress => {
  try {
    await API.delete(`compliance/external-contract/delete/${contractAddress}`);
  } catch (error) {
    return handleError(error);
  }
};
