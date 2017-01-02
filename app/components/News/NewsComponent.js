import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';

var REQUEST_URL = 'https://newsapi.org/v1/articles'
var API_KEY = '385b7bcbb0dd423d878786ca79738424'

class NewsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.id !== row2.id,
      }),
      loaded: false,
    };

    this._renderArticle = this._renderArticle.bind(this);
  }

  componentDidMount() {
    this._fetchData(this.props.id);
  }

  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderArticle}
        renderSeparator={this._renderSeparator}
        />
    );
  }

  _fetchData(id) {
    const requestUrl = `${REQUEST_URL}?source=${id}&apiKey=${API_KEY}`

    console.log(requestUrl)

    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.articles),
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
    );
  }

  _renderArticle(article) {
    const onArticleSelected = (article) => { Linking.openURL(article.url) }

    return (
      <TouchableOpacity
        key={article.id}
        onPress={() => onArticleSelected(article)}>
        <View style={styles.container}>
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.thumbnail}
            resizeMode={Image.resizeMode.contain}
            />
          <View style={styles.bottomContainer}>
            <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
            <Text numberOfLines={3}>{article.description}</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bottomContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  centering: {
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
});

module.exports = NewsComponent;