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
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
  }

  pollMatchStarted() {
    setTimeout(() => {
      this.setState(function(previousState) {
        return {timer: previousState.timer + 1};
      });
      fetch('http://45.33.83.217/harambe/poll_match', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'match_id': this.state.match_id,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (!responseJson['status']) {
          this.pollMatchStarted();
        } else {
          Actions.game();
          console.log('match can start now');
        }
      });
    }, 1000);
  }

  joinQueue() {
    fetch('http://45.33.83.217/harambe/enter_match_queue', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': AsyncStorage.getItem('username'),
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.match_id != '') {
        this.state.match_id = responseJson.match_id;
        this.pollMatchStarted();
      } else {
        console.log('something gone wrong');
      }
    });
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

export default MatchQueueContainer;
