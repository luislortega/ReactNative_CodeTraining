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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(){
    super()
    
    this.state = {
      customStyle: {
        color:'red'
      }
    }

    setInterval(() => {
      if (this.state.customStyle.color == 'red') {
        this.setState({
          customStyle:{
            color: 'green'
          }
        })
      }else{
        this.setState({
          customStyle:{
            color: 'red'
          }
        })
      }
    }, 1000);
  } 

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.half}>
        
        </View>
        <View style={styles.half2}>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  half:{
    flex: 1,
    backgroundColor: 'red'
  },
  half2:{
    flex: 1,
    backgroundColor: 'blue'
  }
});
