/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Login from '@containers/LoginContainer';
import * as LoginActions from '../../store/actions/loginActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
  },
  buttonHolder: {
    marginBottom: 50,
  },
  textStyle: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#494949',
  },
  imageStyle: {
    height: 200,
    width: 200,
    marginBottom: 60,
  },
  button: {
    width: 300,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#EFEFEF',
    borderColor: '#009aa6',
    justifyContent: 'center',
    marginBottom: 25,
  },
});

class LauchContainer extends Component<void, void, void> {
  state = {
    loggedIn: false,
  }

  componentWillMount() {
    this.checkLoggedIn();
  }

  logout() {
    AsyncStorage.clear((key) => {
      this.props.dispatch(LoginActions.loginAction(false));
      this.setState({ loggedIn: false });
    });
  }

  async checkLoggedIn() {
    const token = await AsyncStorage.getItem('auth_token');
    if(token != null) {
      this.setState({ loggedIn: true });
    }
  }

  renderLogin() {
    return (
      <Login />
    );
  }

  renderMenu() {
    return (
      <View style={styles.container}>
        <Image source={require('../../img/sigma.png') } style={styles.imageStyle} />
        <View style={styles.buttonHolder}>
          <TouchableOpacity
            onPress={Actions.matchQueue}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>PLAY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Actions.leaderboard}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>LEADERBOARD</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.logout()}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>LOG OUT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    if(this.props.isLoggedIn || this.state.loggedIn) {
      return this.renderMenu();
    } else {
      return this.renderLogin();
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.loginReducers.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LauchContainer);
