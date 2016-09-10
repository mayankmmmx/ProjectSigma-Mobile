/* @flow */

import React, { Component } from 'react'
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'
import Title from '@components/Title'

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 20,
    },
});

class LauchContainer extends Component<void, void, void> {

  render() {
    return (
      <Container>
        <TouchableOpacity
          onPress={Actions.createAccount}
        >
          <Text style={styles.textStyle}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Actions.login}
        >
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.matchQueue}
        >
          <Text style={styles.textStyle}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={Actions.game}
        >
          <Text style={styles.textStyle}>Question</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Actions.countdown}
        >
          <Text style={styles.textStyle}>CountDown</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Actions.socketIo}
        >
          <Text style={styles.textStyle}>Socket IO</Text>
        </TouchableOpacity>

      </Container>
    );
  }
}

export default LauchContainer;
