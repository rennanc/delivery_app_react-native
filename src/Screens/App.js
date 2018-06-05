/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Picker,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';

import RNGooglePlaces from 'react-native-google-places';

import Map from '../Components/Map'

const { width, height } = Dimensions.get('window');


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //PLACES
      showInput: false,
      addressQuery: '',
      predictions: [],
      textDestiny: '',

      //Map

      coordinates: [
        {
            latitude: 37.3317876,
            longitude: -122.0054812,
        },
        {
            latitude: 37.771707,
            longitude: -122.4053769,
        },
      ],
    }
  }

  

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal(
      {
        country: 'US',
        latitude: 53.544389,
        longitude: -113.490927,
        useOverlay: true,
      }
    )
    .then((place) => {
    console.log(place);
    this.setState({
      textDestiny: place.address,
    })
		// place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
        <View style={styles.infoContainer} >
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => this.openSearchModal()}
          >
            <TextInput style={styles.input}
            underlineColorAndroid={'transparent'}
            value={this.state.textDestiny}
            editable={false} selectTextOnFocus={false}
            placeholder="Where to?"
            />
          </TouchableOpacity>
        </View>

            
          {/*
          <TextInput 
            style={styles.input}
            placeholder="Where to?"
          />
          <TextInput 
            style={styles.input}
            placeholder="Height"
            keyboardType='numeric'
          />
          <TextInput 
            style={styles.input}
            placeholder="Weight"
            keyboardType='numeric'
          />
          <TextInput 
            style={styles.input}
            placeholder="Length"
            keyboardType='numeric'
            />*/}
          {/*<Picker
            selectedValue={this.state.language}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Box 1" value="1" />
            <Picker.Item label="Box 2" value="2" />
            <Picker.Item label="Box 2" value="2" />
          </Picker>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  //info container
  infoContainer:{
    height: 60,
    width: width - 20,
    marginTop: 20,
    position: 'absolute',
    flexDirection: 'column',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
    /*position: 'absolute',
    height: 200,
    backgroundColor: 'white',
    width: width - 20,*/
  },
  TouchableOpacity:{
    flex:1,
    backgroundColor: '#fff',
  },
  input:{
    flex:1,
    paddingLeft: 10,
    fontSize: 20,
  }
  
});
