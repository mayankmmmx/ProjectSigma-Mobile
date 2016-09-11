/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  AsyncStorage,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as LoginActions from '../../store/actions/loginActions';

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
    borderColor: '#494949',
    fontSize: 15,
    padding: 4,
    width: 300,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  loginText: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 20,
  },
  usernameView: {
    marginBottom: 50,
  },
  passwordView: {
    marginBottom: 30,
  },
  loginButtonView: {
    width: 125,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#EFEFEF',
    borderColor: '#494949',
    justifyContent: 'center',
    marginBottom: 300,
  },
  loginButtonText: {
    fontSize: 15,
    alignSelf: 'center',
  },
  image: {
    marginLeft: 10,
    marginTop: 80,
    width: 300,
    height: 200,
  },
});

class LoginContainer extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.login}>
          <Image source={require('../../img/login.png')} style={styles.image}/>
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
            onPress={() => this.props.dispatch(LoginActions.login(this.state.username, this.state.password))}
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

export default connect ()(LoginContainer);
