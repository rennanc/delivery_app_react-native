import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

export default class InputSearchPlace extends Component {

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
    
    render(){
        return(
            <View style={styles.infoContainer}>
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
        );
    }
}


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        elevation: 1,
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