/* @flow */

import React, { Component } from 'react'
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderBottomColor: '#0f0f0f',
    fontSize: 15,
    padding: 4,
    width: 300,
  },
  loginText: {
    alignSelf: 'center',
  },
  usernameView: {
    marginBottom: 50,
  },
  passwordView: {
    marginBottom: 30,
  },
  loginButtonView: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#000000',
    width: 100,
  },
  loginButtonText: {
    fontSize: 15,
    alignSelf: 'center',
  }
});

class LoginContainer extends Component {
  state = {
    username: '',
    password: '',
  };

  login() {
    const url = `http://45.33.83.217/harambe/login?username=${this.state.username}&password=${this.state.password}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.auth_token != '') {
        AsyncStorage.setItem('auth_token', responseJson.auth_token);
        AsyncStorage.setItem('username', state.username)
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <View style={styles.usernameView}>
            <Text style={styles.loginText}>User Name</Text>
            <TextInput
              multiline={false}
              style={styles.textInput}
              autoFocus={true}
              autoCorrect={false}
              onChangeText={(username) => this.setState({username})}
            />
          </View>
          <View style={styles.passwordView}>
            <Text style={styles.loginText}>Password</Text>
            <TextInput
              multiline={false}
              style={styles.textInput}
              autoFocus={false}
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.login()}
          >
            <View style={styles.loginButtonView}>
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginContainer;
