/* @flow */

import React, { Component } from 'react'
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client/socket.io';
import './UserAgent';


class SocketIOContainer extends Component {
  state = {
    text: '',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({text: "TIMEOUT COMPLETE"});
    }, 1000)	;
  }

  render() {
    var ws = new WebSocket('ws://45.33.83.217/');
    ws.onopen = () => {
      console.log("Opened successfully");
      ws.send('something'); // send a message
    };
    return (
      <View style={{ margin: 100 }}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

export default SocketIOContainer;
