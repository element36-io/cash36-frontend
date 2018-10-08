import {
  INIT_NOTIFICATIONS_REQUEST,
  INIT_NOTIFICATIONS_SUCCESS,
  INIT_NOTIFICATIONS_ERROR,
  NEW_NOTIFICATION,
  UPDATE_BADGE_COUNT
} from '../actions/types'

const initialState = {
  notifications: [],
  isFetching: false,
  error: '',
  badgeCount: 0,
  lastRead: new Date()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case INIT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.payload
      }

    case INIT_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case NEW_NOTIFICATION:

      let newNotification = {
        header: action.title,
        message: action.message,
        type: action.transferType,
        creationDate: action.creationDate,
        new: action.new
      }

      let notifications = state.notifications
      notifications.push(newNotification)

      let badgeCount = state.badgeCount

      return {
        ...state,
        notifications,
        badgeCount: badgeCount + 1
      }

    case UPDATE_BADGE_COUNT:

      let all = state.notifications
      // if (action.badgeCount === 0) {
      //   all.map(n => n.new = false)
      // }
      // milos - I would remove remove this. map method should always be an expression and arrow functions should not return assignment

      return {
        ...state,
        notifications: all,
        badgeCount: action.badgeCount,
        lastRead: new Date()
      }

    default:
      return state
  }
}
