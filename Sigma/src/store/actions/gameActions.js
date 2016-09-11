import * as ActionTypes from '../ActionType';

export function getQuestions(averageElo) {
  const url = `http://45.33.83.217/harambe/get_questions?elo=${averageElo}`;
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

function setRoundQuestions(roundQuestions) {
  return {
    type: ActionTypes.GET_ROUND_QUESTIONS,
    roundQuestions,
  };
}
