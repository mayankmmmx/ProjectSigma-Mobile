/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as GameActions from '../../store/actions/gameActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 40,
    marginTop: 60,
  },
  resultTypeText: {
    fontSize: 60,
    marginBottom: 20,
  },
  eloText: {
    fontSize: 30,
    marginBottom: 100,
  },
  textStyle: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#494949',
  },
  button: {
    width: 250,
    height: 70,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#EFEFEF',
    borderColor: '#494949',
    justifyContent: 'center',
    marginBottom: 150,
  },
});

class Results extends Component<void, void, void> {
  render() {
    let finalResult = '';
    let elo = 'New ELO: ';
    if(this.props.result != null) {
      if(this.props.result.currentUserOld > this.props.result.currentUserNew) {
        finalResult = 'You lose!';
      } else if(this.props.result.currentUserOld < this.props.result.currentUserNew) {
        finalResult = 'You win!';
      } else {
        finalResult = 'You tied!';
      }
      elo += this.props.result.currentUserNew;
    }

    return (
      <View style={styles.container}>
      <Text style={styles.resultsText}>Results</Text>
        <View style={styles.subContainer}>
          <Text style={styles.resultTypeText}>{finalResult}</Text>
          <Text style={styles.eloText}>{elo}</Text>
          <TouchableOpacity
            onPress={Actions.welcome}
          >
            <View style={styles.button}>
              <Text style={styles.textStyle}>MENU</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    result: state.gameReducers.gameResults,
  };
}

export default connect(mapStateToProps)(Results);
