import { GET_CONTRACTS } from './contracts.types';

export const getContractsAction = contracts => {
  return {
    type: GET_CONTRACTS,
    payload: {
      contracts
    }
  };
};
