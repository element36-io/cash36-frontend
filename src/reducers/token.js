import {
  UPDATE_TOKENS_REQUEST,
  UPDATE_TOKENS_SUCCESS,
  UPDATE_TOKENS_ERROR
} from '../actions/types'

const initialState = {
  tokens: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKENS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case UPDATE_TOKENS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tokens: action.payload
      }

    case UPDATE_TOKENS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}
