/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};

export class Loading extends Component{
  render () {
    return ( 
      <Text>Loading...</Text>
    )
  }
}

export class ChildComponent extends Component{
  render(){

    if(this.props.result){
      var res = this.props.result.map((item, i) => {
        return (
          <Text key={i}>{item.title}</Text>
        )
      })
    }

    return(
      //We return the view 
      <View>
        {this.props.result ? res : <Loading/> }
      </View>
    )
  }
}


export default class App extends Component<Props> {
  
  constructor(){
    super()
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.movies
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
          <ChildComponent result={this.state.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
