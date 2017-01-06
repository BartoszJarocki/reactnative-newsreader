import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { InputGroup, Input, Button } from 'native-base';
import firebase from 'firebase'

class LoginComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      error: '',
      loading: false,
    }

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    this.setState({ loading: true });

    const { login, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(login, password)
      .then(() => {
        this.setState({ loading: false })
        console.log(this.state)
      })
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(login, password)
          .then(() => {
            this.setState({ loading: false })
            console.log(this.state)
          })
          .catch((error) => {
            console.log(error)

            this.setState({ error: error.message, loading: false })
          });
      });
  }

  renderLoadingView() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.centering, { height: 80 }]}
        size="large"
        />
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <InputGroup>
          <Input
            inlineLabel
            placeholder="Login"
            value={this.state.login}
            onChangeText={login => this.setState({ login })} />
        </InputGroup>

        <InputGroup>
          <Input
            inlineLabel
            secureTextEntry
            placeholder="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })} />
        </InputGroup>

        <Text>{this.state.error}</Text>

        <Button
          style={styles.signUpButtonStyle}
          onPress={this.onButtonPress}>
          Sign Up or Log In
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    justifyContent: 'center',
  },
  signUpButtonStyle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
  },
});

module.exports = LoginComponent;