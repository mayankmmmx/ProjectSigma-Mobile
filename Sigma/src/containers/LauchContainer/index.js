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
import Link from '@components/Link'

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
          onPress={Actions.game}
        >
          <Text style={styles.textStyle}>Question</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={Actions.countdown}
        >
          <Text style={styles.textStyle}>CountDown</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default LauchContainer;
