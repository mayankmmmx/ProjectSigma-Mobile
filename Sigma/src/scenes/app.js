/* @flow */

import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import { styles } from '@components/NavigationBar'
import LauchContainer from '@containers/LauchContainer'
import CounterContainer from '@containers/CounterContainer'
import Game from '@containers/GameContainer';
import Countdown from '@containers/CountdownContainer';

const scenes = Actions.create(
  <Scene key="app" navigationBarStyle={styles.container}>
    <Scene key="welcome" component={LauchContainer} title="Welcome" />
    <Scene key="game" component={Game} title="Game" />
    <Scene key="countdown" component={Countdown} title="Countdown" />
  </Scene>
);

export default scenes;
