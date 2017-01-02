import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

var REQUEST_URL = 'https://newsapi.org/v1/sources?language=en'

class SourcesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }),
      loaded: false,
    };

    this._renderSource = this._renderSource.bind(this);
  }

  componentDidMount() {
    this._fetchData();
  }

  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderSource}
        renderSeparator={this._renderSeparator}
        />
    );
  }

  _fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.sources),
          loaded: true,
        });
      })
      .done();
  }

  _renderLoadingView() {
    return (
      <ActivityIndicator
        animating={true}
        style={[styles.centering, { height: 80 }]}
        size="large"
        />
    )
  }

  _renderSource(source) {
    const onSourceSelected = (source) => { Actions.news({ id: source.id }) }

    return (
      <TouchableOpacity
        key={source.id} style={styles.container}
        onPress={() => onSourceSelected(source)}>
        <View>
          <Image
            source={{ uri: source.urlsToLogos.medium }}
            style={styles.thumbnail}
            resizeMode={Image.resizeMode.contain}
            />
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>{source.name}</Text>
            <Text style={styles.year}>{source.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View style={styles.separator} key={`${sectionID}-${rowID}`} />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 20,
  },
  bottomContainer: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  thumbnail: {
    flex: 1,
    width: null,
    height: 100,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  centering: {
    flex: 1,
    alignItems: 'center',
  },
});

module.exports = SourcesComponent;
