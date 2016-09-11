/* @flow */

import React, { Component } from 'react'
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Container from '@components/Container'
import Title from '@components/Title'

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
    width: 250,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#EFEFEF',
    borderColor: '#494949',
    justifyContent: 'center',
    marginBottom: 25,
  },
});

class LauchContainer extends Component<void, void, void> {
  render() {
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
            onPress={console.log("yay")}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>LEADERBOARD</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={console.log("Yay")}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>SETTINGS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
/*

<View style={styles.buttonHolder}>
  <TouchableOpacity
    onPress={Actions.matchQueue}
  >
    <Text style={styles.textStyle}>Play</Text>
  </TouchableOpacity>
</View>
*/


export default LauchContainer;

/*
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
*/

/*
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
*/
