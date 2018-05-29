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
    }
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

  onSelectSuggestion(placeID) {
    console.log(placeID);
    // getPlaceByID call here
    RNGooglePlaces.lookUpPlaceByID(placeID)
    .then((results) => console.log(results))
    .catch((error) => console.log(error.message));

    this.setState({
      showInput: false,
      predictions: []
    });
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItemWrapper}>
          <TouchableOpacity style={styles.listItem}
              onPress={() => this.onSelectSuggestion(item.placeID)}>
              <View style={styles.placeMeta}>
                  <Text style={styles.primaryText}>{item.primaryText}</Text>
                  <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.divider} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Map />
        <View style={styles.infoContainer} >

          <FlatList style={styles.input}
              data={this.state.predictions}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{flexGrow: 1}}
              />
          <TextInput
            ref={input => this.pickUpInput = input}
            style={styles.input}
            value={this.props.addressQuery}
            onChangeText={this.onQueryChange}
            placeholder={'Current Location'}
            placeholderTextColor='#9BABB4'
            underlineColorAndroid={'transparent'}
            
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
    height:200,
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
  },
  listItemWrapper: {
    backgroundColor: 'transparent',
    height: 56
  },
});
