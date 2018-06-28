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
      showPath: false,
      destinationCoordinate: {
        latitude: 0.0,
        longitude: 0.0,
      },
      boxMeasures: {
        width: 0,
        height: 0,
        length: 0,
      },
      pathDetails:{
        distance: '',
        duration: '',
        fare: {},
        coordinates: [],
      }
    }
  }

  inputSearchCallBack(destinationCoordinate){
    this.setState({
      destinationCoordinate: {
          latitude: destinationCoordinate.latitude,
          longitude: destinationCoordinate.longitude,
      },
      showPath: true,
    })
  }

  pathDetailsCallback(pathDetails){
    console.warn("distance "+pathDetails.distance+ "\n duration " + pathDetails.duration + "\n fare "+ pathDetails.fare)
  }

  packageDetailsCallBack(boxMeasures){
    this.setState({
      boxMeasures
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Map 
            showPath={this.state.showPath}
            destinationCoordinate={this.state.destinationCoordinate}
            pathDetailsCallback={this.pathDetailsCallback.bind(this)} />
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
