import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import firebase from 'firebase'

import { Scene, Router } from 'react-native-router-flux';

import SourcesComponent from '../Sources';
import NewsComponent from '../News';
import LoginComponent from '../Login'

class AppComponent extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDoKdX3eOby7-tBBb83Snr79VAhiCwdyLs',
      authDomain: 'newsreader-36d43.firebaseapp.com',
      databaseURL: 'https://newsreader-36d43.firebaseio.com',
      storageBucket: 'newsreader-36d43.appspot.com',
      messagingSenderId: '344145757407'
    });
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={LoginComponent} title="Login" initial={true} />
          <Scene key="sources" component={SourcesComponent} title="Sources" />
          <Scene key="news" component={NewsComponent} title="News" />
        </Scene>
      </Router>
    );
  }
}

module.exports = AppComponent;