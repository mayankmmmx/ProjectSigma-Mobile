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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Countdown from './countdown';
import Question from './question';
import * as GameActions from '../../store/actions/gameActions';

class GameContainer extends Component {

  componentDidMount() {
    this.props.dispatch(GameActions.getQuestions(1200));
  }

  renderLoading() {
    return (
      <Countdown />
    );
  }

  renderGame() {
    if(this.props.index > 9) {
      const url = `http://hackforharambe.me/harambe/submit_match?p_one_id=${this.props.matchUsers.user1}&p_two_id=${this.props.matchUsers.user2}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      });

      return (
        <View>
        </View>
      );
    }
    else {

      return (
        <Question
          currentQuestion={this.props.questions[this.props.index]}
          index={this.props.index}
        />
      );
    }
  }

  render() {
    if(this.props.isReady) {
      return this.renderGame();
    } else {
      return this.renderLoading();
    }
  }

}

function mapStateToProps(state) {
  console.log(state);
  return {
    isReady: state.countdownReducer.isReady,
    questions: state.gameReducers.roundQuestions.questions,
    index: state.gameReducers.index,
    matchUsers: state.gameReducers.matchUsers,
  };
}

export default connect(mapStateToProps)(GameContainer);
