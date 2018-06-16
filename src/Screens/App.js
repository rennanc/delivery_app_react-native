/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Map from '../Components/Map'
import InputSearch from '../Components/InputSearch'
import PackageDetails from '../Components/PackageDetails'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      placeDestiny: {},
      boxMeasures: {
        width: 0,
        height: 0,
        length: 0,
      } 
    }
  }

  inputSearchCallBack(placeDestiny){
    this.setState({
      placeDestiny
    })
  }

  packageDetailsCallBack(boxMeasures){
    this.setState({
      boxMeasures
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
        <InputSearch inputSearchCallBack={this.inputSearchCallBack.bind(this)}  />
        <PackageDetails packageDetailsCallBack={this.packageDetailsCallBack.bind(this)}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});
