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
} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import RNGooglePlaces from 'react-native-google-places';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCECNQxQ6pwCZZ42iIOCRBfRulCH6yYWsI';

export default class App extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      //PLACES
      showInput: false,
      addressQuery: '',
      predictions: [],

      //MAP
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
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  onQueryChange = (text) => {
    this.setState({addressQuery: text});
    RNGooglePlaces.getAutocompletePredictions(this.state.addressQuery, {
      country: 'BR'
    })
    .then((places) => {
      console.log(places);
      this.setState({predictions: places});
    })
    .catch(error => console.log(error.message));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={styles.mapContainer}
          ref={c => this.mapView = c}
          onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
              destination={this.state.coordinates[this.state.coordinates.length-1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={(result) => {



                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });

              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View style={styles.infoContainer}>

          <TextInput
            ref={input => this.pickUpInput = input}
            style={styles.input}
            value={this.props.addressQuery}
            onChangeText={this.onQueryChange}
            placeholder={'Current Location'}
            placeholderTextColor='#9BABB4'
            underlineColorAndroid={'transparent'}
            autoFocus
            />
            
            <View style={styles.list}>
              <FlatList
              data={this.state.predictions}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    flex: 1
  },
  mapContainer:{
    flex: 3,
    width: width,
  },
  //info container
  infoContainer:{
    flex:1,
    flexDirection: 'column',
    /*position: 'absolute',
    height: 200,
    backgroundColor: 'white',
    width: width - 20,*/
  },
  input:{
    flex:1,
    height: 60,
    width: width,
  }
});
