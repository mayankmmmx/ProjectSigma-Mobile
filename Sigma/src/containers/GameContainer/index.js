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

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 20,
    },
});

class GameContainer extends Component<void, void, void> {
  render() {
    return (
      <Container>
        <Text style={styles.textStyle}> Hello world </Text>
      </Container>
    );
  }
}

export default GameContainer;
