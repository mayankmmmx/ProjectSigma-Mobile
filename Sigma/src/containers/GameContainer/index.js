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
    return (
      <Question
        currentQuestion={this.props.questions[this.props.index]}
        index={this.props.index}
      />
    );
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
  return {
    isReady: state.countdownReducer.isReady,
    questions: state.gameReducers.roundQuestions.questions,
    index: state.gameReducers.index,
  };
}

export default connect(mapStateToProps)(GameContainer);
