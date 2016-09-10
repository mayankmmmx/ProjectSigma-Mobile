/**
 * Load the App component.
 *  (All the fun stuff happens in "/ReactApp/containers/index.js")
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import AppContainer from './js/containers/';

AppRegistry.registerComponent('Sigma', () => AppContainer);
