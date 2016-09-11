/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import * as CountdownActions from '../../store/actions/countdownActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
  },
});

class Countdown extends Component {
  state = {
    timer: 5,
  };

  decrement() {
    let currentTime = this.state.timer;
    if(currentTime > 0) {
      setTimeout(() => {
        currentTime--;
        this.setState({ timer: currentTime });
      }, 1000);
    } else {
      this.props.dispatch(CountdownActions.setReady(true));
    }
  }

  render() {
    this.decrement();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Get Ready...</Text>
        <Text style={styles.text}>{this.state.timer}</Text>
      </View>
    );
  }
}

export default connect()(Countdown);
