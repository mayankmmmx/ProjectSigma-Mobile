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
    height: 30,
    borderWidth: 1,
    borderBottomColor: '#0f0f0f',
    fontSize: 15,
    padding: 4,
    marginBottom: 235,
    textAlign: 'center',
  },
  submitView: {
    backgroundColor: '#4BB543',
    height: 40,
    justifyContent: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
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
            }
          },
        ]
      );
    }
  }

  checkAnswer() {
    let alertTitle = '';
    console.log(this.state.answer);
    console.log(this.props.currentQuestion);
    if(this.state.answer == this.props.currentQuestion.question_answer) {
      alertTitle = 'Correct!';
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
          }
        },
      ]
    );

  }

  render() {
    this.decrement();
    return (
      <View style={styles.container}>
        <View style={styles.scoreView}>
          <Text>User 1 Score</Text>
          <Text>User 2 Score</Text>
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

export default connect()(Question);
