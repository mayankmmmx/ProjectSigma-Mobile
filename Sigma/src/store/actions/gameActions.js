import * as ActionTypes from '../ActionType';

export function getQuestions(averageElo) {
  const url = `http://hackforharambe.me/harambe/get_questions?elo=${averageElo}`;
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch(setRoundQuestions(responseJson));
    });
  };
}

export function setIndex(index) {
  return {
    type: ActionTypes.SET_INDEX,
    index,
  };
}

export function setLeaderboard(users) {
  return {
     type: ActionTypes.SET_LEADERBOARD,
     users,
  }
}

function setRoundQuestions(roundQuestions) {
  return {
    type: ActionTypes.GET_ROUND_QUESTIONS,
    roundQuestions,
  };
}

export function setMatchUsers(users) {
  return {
      type: ActionTypes.GET_MATCH_USERS,
      users,
  }
}

export function setMatchId(id) {
  return {
      type: ActionTypes.SET_MATCH_ID,
      id,
  }
}
