import { CALL_API } from '../middleware/api'

import {
  UPDATE_TOKENS_REQUEST,
  UPDATE_TOKENS_SUCCESS,
  UPDATE_TOKENS_ERROR
} from './types'

export function updatePublic () {
  return async (dispatch) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `/public/tokens`,
        authenticated: false,
        method: 'GET',
        types: [UPDATE_TOKENS_REQUEST, UPDATE_TOKENS_SUCCESS, UPDATE_TOKENS_ERROR]
      }
    })

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse)
    }
    return actionResponse
  }
}

export function update () {
  return async (dispatch) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        endpoint: `/cash36/tokens`,
        authenticated: true,
        method: 'GET',
        types: [UPDATE_TOKENS_REQUEST, UPDATE_TOKENS_SUCCESS, UPDATE_TOKENS_ERROR]
      }
    })

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse)
    }
    return actionResponse
  }
}
