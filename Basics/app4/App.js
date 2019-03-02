/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export class ChildComponent extends Component{
  render () {
    //Show data
    if(this.props.result){
      var res = this.props.result.map((item, i) => {
        return (
          <Text key={i}>{item.title}</Text>
        )
      })
    }
    return (
      //code here 
      <View>
        {res}
        <View style={this.props.status ? styles.on : styles.off}/>
      </View>
    )
  }
}

export default class App extends Component<Props> {
  
  constructor(){
    super() //Super constructor
    this.state = {
      status: false,
      data: null 
    }
  }
  //Function to fetch data when the application is mounted
  componentDidMount(){
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.movies
        })
      })
  }

  //Function to get the click confirmation
  clicked(){
    this.setState({
      status: !this.state.status
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! TEST</Text>
        <ChildComponent status={this.state.status} result={this.state.data}/>        
        <Button 
          onPress={this.clicked.bind(this)}
          title="Click here"
          color = 'red'
        />
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  on:{
    width:100,
    height: 100,
    backgroundColor: 'yellow'
  },
  off:{
    width:100,
    height: 100,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
