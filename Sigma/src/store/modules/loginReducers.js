import * as ActionTypes from '../ActionType';

const initialState = {
  isLoggedIn: false,
}

function loginReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: action.loggedIn,
      })
    default:
      return state
  }
}

export default loginReducers;
