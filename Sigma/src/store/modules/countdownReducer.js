import * as ActionTypes from '../ActionType';

const initialState = {
  isReady: false,
}

function countdownReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.IS_READY:
      return Object.assign({}, state, {
        isReady: action.ready
      })
    default:
      return state
  }
}

export default countdownReducer;
