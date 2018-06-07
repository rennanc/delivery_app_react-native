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
import InputSearchPlace from '../Components/InputSearchPlace'
import PackageDetails from '../Components/PackageDetails'

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
        <InputSearchPlace  />
        <PackageDetails  />
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
