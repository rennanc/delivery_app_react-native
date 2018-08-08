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
import PaymentDetails from '../Components/PaymentDetails'
import firebase from 'react-native-firebase';

export default class App extends Component {

  

  constructor(props) {
    super(props);

    this.firebaseAccess()

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

  firebaseAccess(){
    this.ref = firebase.firestore().collection('requests')
    this.unsubscribe = null
  }

  addRequestCallBack(){
    this.ref.add({
      driver: 'teste2',
      requester: 'testeRequester',
      height: this.state.boxMeasures.height,
      length: this.state.boxMeasures.length,
      width: this.state.boxMeasures.width,
      requestDate: new firebase.firestore.FieldValue.serverTimestamp(),
      startDirection: new firebase.firestore.GeoPoint(1, 2),
      endDirection: new firebase.firestore.GeoPoint(this.state.destinationCoordinate.latitude, this.state.destinationCoordinate.longitude),
    })
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
    this.setState({
      pathDetails
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
        <Map 
            showPath={this.state.showPath}
            destinationCoordinate={this.state.destinationCoordinate}
            pathDetailsCallback={this.pathDetailsCallback.bind(this)} />
        <InputSearch inputSearchCallBack={this.inputSearchCallBack.bind(this)}  />
        <PaymentDetails pathDetails={this.state.pathDetails} />
        <PackageDetails addRequestCallBack={this.addRequestCallBack.bind(this)} packageDetailsCallBack={this.packageDetailsCallBack.bind(this)}  />
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
