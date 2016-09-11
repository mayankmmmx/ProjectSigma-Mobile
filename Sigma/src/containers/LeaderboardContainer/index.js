/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  ListView,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Login from '@containers/LoginContainer';
import * as LoginActions from '../../store/actions/loginActions';
import * as GameActions from '../../store/actions/gameActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  rowTextName: {
    fontSize: 20,
  },
  title: {
    alignSelf: 'center',
    marginTop: 10,
  },
  titleText: {
    fontSize: 40,
  },
  userRankTitle: {
    marginLeft: 70,
    fontSize: 20,
    marginTop: 10,
  },
  backButton: {
    marginTop: 30,
    marginLeft: 10,
    color: '#1e90ff',
    fontSize: 20,
  }
});

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class LeaderboardContainer extends Component<void, void, void> {
  state = {
    dataSource: ds.cloneWithRows(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']),
  };
  componentWillMount() {
    this.getLeaderboard();
  }

  getLeaderboard() {
    fetch('http://hackforharambe.me/harambe/get_leaderboard', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.dispatch(GameActions.setLeaderboard(responseJson));
    })

  }

  renderRow(rowData) {
    let currentIndex = '';
    let name = '';
    let elo = '';
    if(this.props.leaderboard.top_users != null) {
      currentIndex = this.props.leaderboard.top_users[rowData];
      name = currentIndex.username;
      elo = currentIndex.elo;
    }
    return(
      <View style={styles.row}>
        <Text style={styles.rowTextName}>{name}</Text>
        <Text>{elo}</Text>
      </View>
    );
  }

  render() {
    let back = '< Back';
    let userRank = 'User Rank: ';
    if(this.props.leaderboard.user_rank != null) {
      userRank += this.props.leaderboard.user_rank;
    }
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={Actions.welcome}
        >
        <Text style={styles.backButton}>{back}</Text>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>LEADERBOARD</Text>
          <Text style={styles.userRankTitle}>{userRank}</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    leaderboard: state.gameReducers.leaderboard,
  }
}

export default connect(mapStateToProps)(LeaderboardContainer);
