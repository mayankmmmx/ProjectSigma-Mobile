import * as ActionTypes from '../ActionType';

const initialState = {
  roundQuestions: {},
  index: 0,
  matchUsers: {},
  matchId: '',
  leaderboard: {},
  gameResults: {},
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
    case ActionTypes.GET_MATCH_USERS:
      return Object.assign({}, state, {
        matchUsers: action.users,
      })
    case ActionTypes.SET_MATCH_ID:
      return Object.assign({}, state, {
        matchId: action.id,
      })
    case ActionTypes.SET_LEADERBOARD:
      return Object.assign({}, state, {
        leaderboard: action.users,
      })
    case ActionTypes.SET_SUBMIT_MATCH_RESULTS:
      return Object.assign({}, state, {
        gameResults: action.results,
      })
    default:
      return state
  }
}

export default gameReducers;
