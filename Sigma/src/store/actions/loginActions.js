import { AsyncStorage, Alert } from 'react-native';
import * as ActionTypes from '../ActionType';

export function login(username, password) {
  const url = `http://hackforharambe.me/harambe/login?username=${username}&password=${password}`;
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
      if(responseJson.auth_token != '') {
        AsyncStorage.setItem('auth_token', responseJson.auth_token);
        AsyncStorage.setItem('username', username)
        dispatch(loginAction(true));
      } else {
        Alert.alert(
          'Incorrect Credentials',
          'Please re-try to log in.'
        );
      }
    });
  };
}

export function loginAction(loggedIn) {
  return {
    type: ActionTypes.LOGIN,
    loggedIn,
  };
}
