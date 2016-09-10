/* @flow */

import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import { styles } from '@components/NavigationBar'
import LauchContainer from '@containers/LauchContainer'
import CounterContainer from '@containers/CounterContainer'
import Game from '@containers/GameContainer';
import Countdown from '@containers/CountdownContainer';
import Login from '@containers/LoginContainer';
import CreateAccount from '@containers/CreateAccountContainer';
import MatchQueue from '@containers/MatchQueueContainer';
import SocketIO from '@containers/SocketIOContainer';

const scenes = Actions.create(
  <Scene key="app" navigationBarStyle={styles.container}>
    <Scene key="welcome" component={LauchContainer} title="Welcome" />
    <Scene key="game" component={Game} title="Game" />
    <Scene key="countdown" component={Countdown} title="Countdown" />
    <Scene key="login" component={Login} title="Login" />
    <Scene key="createAccount" component={CreateAccount} title="Create Account" />
    <Scene key="matchQueue" component={MatchQueue} title="Match Queue" />
    <Scene key="socketIo" component={SocketIO} title="Socket IO" />
  </Scene>
);

export default scenes;
