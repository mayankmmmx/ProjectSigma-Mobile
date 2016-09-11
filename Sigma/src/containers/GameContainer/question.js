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
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as GameActions from '../../store/actions/gameActions';
import * as CountdownActions from '../../store/actions/countdownActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
  },
  questionView: {
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderBottomColor: '#0f0f0f',
    fontSize: 25,
    padding: 4,
    marginBottom: 235,
    textAlign: 'center',
  },
  submitView: {
    backgroundColor: '#4BB543',
    height: 50,
    justifyContent: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 25,
    alignSelf: 'center',
  },
  timerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -45,
  },
  timerText: {
    fontSize: 30,
  },
});

class Question extends Component {
  state = {
    timer: 15,
    answer: '',
  };

  async getToken() {
    const value = await AsyncStorage.getItem('auth_token');
    console.log(value);
  }

  decrement() {
    let currentTime = this.state.timer;
    if(currentTime > 0) {
      setTimeout(() => {
        currentTime--;
        this.setState({ timer: currentTime });
      }, 1000);
    }
    else {
      Alert.alert(
        'Times up!',
        'Get ready for the next question!',
        [
          { text: 'OK',
            onPress: () => {
              this.props.dispatch(GameActions.setIndex(this.props.index + 1));
              this.props.dispatch(CountdownActions.setReady(false));
              this.submitToApi(-1);
            }
          },
        ]
      );
    }
  }

  checkAnswer() {
    let score = -1;
    let alertTitle = '';
    console.log(this.state.answer);
    console.log(this.props.currentQuestion);
    if(this.state.answer == this.props.currentQuestion.question_answer) {
      alertTitle = 'Correct!';
      score = 1;
    } else {
      alertTitle = 'Incorrect!';
    }

    Alert.alert(
      alertTitle,
      'Get ready for the next question!',
      [
        { text: 'OK',
          onPress: () => {
            this.props.dispatch(GameActions.setIndex(this.props.index + 1));
            this.props.dispatch(CountdownActions.setReady(false));
            this.submitToApi(score);
          }
        },
      ]
    );
  }

  submitToApi(score) {
    fetch('http://hackforharambe.me/harambe/poll_match', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.user1,
        status: score,
        match_id: this.props.matchId,
      })
    })
    .then((response) => response.json())
    .then((responseJSON) => console.log(responseJSON))
  }

  pollMatch() {
    setTimeout(() => {
      this.setState(function(previousState) {
        return {timer: previousState.timer + 1};
      });
      fetch('http://hackforharambe.me/harambe/poll_match', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          match_id: this.prop.matchId,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        const currentQuestionNumber = this.props.index + 1;
        if(responseJson.cur_question > currentQuestionNumber) {
          Alert.alert(
            'Too slow!',
            'Get ready for the next question!',
            [
              { text: 'OK',
                onPress: () => {
                  this.props.dispatch(GameActions.setIndex(this.props.index + 1));
                  this.props.dispatch(CountdownActions.setReady(false));
                }
              },
            ]
          );
        } else {
          this.pollMatch();
        }
      });
    }, 500)
  }

  render() {
    if(this.state.timer > 0) {
      this.decrement();
    }
    return (
      <View style={styles.container}>
        <View style={styles.scoreView}>
          <Text>{this.props.user1}</Text>
          <Text>{this.props.user2}</Text>
        </View>
        <View style={styles.timerView}>
          <Text style={styles.timerText}>{this.state.timer}</Text>
        </View>
        <View style={styles.questionView}>
          <Text style={styles.textStyle}>{this.props.currentQuestion.question_english}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.checkAnswer()}
        >
          <View style={styles.submitView}>
            <Text style={styles.submitText}>Submit</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          keyboardType={'numeric'}
          multiline={false}
          maxLength={10}
          style={styles.textInput}
          autoFocus={true}
          onChangeText={(answer) => this.setState({answer})}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user1: state.gameReducers.matchUsers.user1,
    user2: state.gameReducers.matchUsers.user2,
    matchId: state.gameReducers.matchId,
  }
}

export default connect(mapStateToProps)(Question);
