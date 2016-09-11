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
import * as GameActions from '../../store/actions/gameActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  loading: {
    height: 50,
    width: 50,
  }
});

class MatchQueueContainer extends Component {
  state = {
    match_id: 0,
    username: '',
  }

  async getUserName() {
    const username = await AsyncStorage.getItem('username').then( (content) => {
      this.setState({ username: content });
    })
  }

  pollMatchStarted() {
    setTimeout(() => {
      this.setState(function(previousState) {
        return {timer: previousState.timer + 1};
      });
      fetch('http://hackforharambe.me/harambe/poll_match', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          match_id: this.state.match_id,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson['status']) {
          this.pollMatchStarted();
        } else {
          const users = {
            user1: responseJson.p_one_id,
            user2: responseJson.p_two_id,
          };
          this.props.dispatch(GameActions.setMatchUsers(users));
          Actions.game();
        }
      });
    }, 1000);
  }

  joinQueue() {
    AsyncStorage.getItem('username').then((username) => {
      fetch('http://hackforharambe.me/harambe/enter_match_queue', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': username,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.match_id != '') {
          this.state.match_id = responseJson.match_id;
          this.props.dispatch(GameActions.setMatchId(responseJson.match_id));
          this.pollMatchStarted();
        } else {
          console.log('something gone wrong');
        }
      });
    })
  }

  componentWillMount() {
    this.joinQueue();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusView}>
          <Text style={styles.textStyle}>Waiting for a game...</Text>
          <Image source={require('../../img/ring-alt.gif')} style={styles.loading}/>
        </View>
      </View>
    );
  }
}

export default connect()(MatchQueueContainer);
