import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import SourcesComponent from './app/components/Sources';
import NewsComponent from './app/components/News';

export default class NewsReader extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="sources" component={SourcesComponent} title="Sources" initial={true} />
          <Scene key="news" component={NewsComponent} title="News" />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('NewsReader', () => NewsReader);