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
  createAccountButtonView: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#000000',
    width: 200,
  },
  createaAccountButtonText: {
    fontSize: 15,
    alignSelf: 'center',
  }
});

class CreateAccountContainer extends Component {
  state = {
    username: '',
    password: '',
  }

  createAccount() {
    fetch('http://45.33.83.217/harambe/create_account', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.auth_token != '') {
        AsyncStorage.setItem('auth_token', responseJson.auth_token);
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
            onPress={() => this.createAccount()}
          >
            <View style={styles.createAccountButtonView}>
              <Text style={styles.createaAccountButtonText}>Create Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CreateAccountContainer;
