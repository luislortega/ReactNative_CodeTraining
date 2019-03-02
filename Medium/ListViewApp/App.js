/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View, 
        ListView, 
        TouchableHighlight, 
        Alert} from 'react-native';

type Props = {};

export default class App extends Component<Props> { 

  constructor(){
    super()
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }

  componentDidMount(){
    let titles = []
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let movies = responseJson.movies
        for (let i = 0; i < movies.length; i++) {
          titles.push(movies[i].title)
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(titles)
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }


  pressCell(dataRow){
    Alert.alert(
      'Pelicula',
      `Titulo ${dataRow}`,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    )
  } 

  renderRow(dataRow){
    return(
      <TouchableHighlight onPress={() => this.pressCell(dataRow)}> 
        <View style={styles.cell}>
          <Text>{dataRow}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  cell:{
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingTop: 20,
    paddingBottom: 20, 
    alignItems: 'center'
  }
});
