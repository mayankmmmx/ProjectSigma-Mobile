/* @flow */

import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import LauchContainer from '@containers/LauchContainer'
import Game from '@containers/GameContainer';
import Login from '@containers/LoginContainer';
import CreateAccount from '@containers/CreateAccountContainer';
import MatchQueue from '@containers/MatchQueueContainer';
import Leaderboard from '@containers/LeaderboardContainer';

const scenes = Actions.create(
  <Scene key="app">
    <Scene key="welcome" component={LauchContainer} title="Welcome" initial={true}/>
    <Scene key="game" component={Game} title="Game" />
    <Scene key="login" component={Login} title="Login" />
    <Scene key="createAccount" component={CreateAccount} title="Create Account" />
    <Scene key="matchQueue" component={MatchQueue} title="Match Queue" />
    <Scene key="leaderboard" component={Leaderboard} title="Leaderboard" />
  </Scene>
);

export default scenes;
