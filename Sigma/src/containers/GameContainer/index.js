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
import Results from './results';
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

  renderResults() {
    this.props.dispatch(GameActions.submitMatchResults(this.props.matchUsers.user1, this.props.matchUsers.user2));
    return (
      <Results />
    );
  }

  render() {
    if(this.props.isReady && this.props.index < 9) {
      return this.renderGame();
    } else if(this.props.index > 8) {
      return this.renderResults();
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
    matchUsers: state.gameReducers.matchUsers,
    results: state.gameReducers.gameResults,
  };
}

export default connect(mapStateToProps)(GameContainer);
