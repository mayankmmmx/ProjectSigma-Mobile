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
  statusView: {
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
});

class MatchQueueContainer extends Component {
  state = {
    match_id: 0
  }

  pollMatchStarted() {
    setTimeout(() => {
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
          <Text style={styles.textStyle}>Waiting for a game</Text>
        </View>
      </View>
    );
  }
}

export default MatchQueueContainer;
