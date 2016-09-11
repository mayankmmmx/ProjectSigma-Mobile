import * as ActionTypes from '../ActionType';

const initialState = {
  roundQuestions: {},
  index: 0,
}

function gameReducers(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ROUND_QUESTIONS:
      return Object.assign({}, state, {
        roundQuestions: action.roundQuestions,
      })
    case ActionTypes.SET_INDEX:
      return Object.assign({}, state, {
        index: action.index,
      })
    default:
      return state
  }
}

export default gameReducers;
