import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
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

export default class Map extends Component {

    constructor(props) {
        super(props);

        // AirBnB's Office, and Apple Park
        this.state = {
            initialPlace:{
                latitude: 37.3317876,
                longitude: -122.0054812,
            },
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

    componentDidMount() {
        this.getCurrentPlace()
    }

    onMapPress = (e) => {
        this.setState({
          coordinates: [
            ...this.state.coordinates,
            e.nativeEvent.coordinate,
          ],
        });
    }

    async  getCurrentPlace(){

        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Cool Photo App Camera Permission',
                'message': 'Cool Photo App needs access to your camera ' +
                           'so you can take awesome pictures.'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                RNGooglePlaces.getCurrentPlace()
                    .then((results) => {
                    this.setState({
                        initialPlace:{
                            latitude: results.latitude,
                            longitude: results.longitude,
                        }
                    })
                    return results
                    })
                    .catch((error) => console.log(error.message))
            } else {
              console.log("access fine location permission denied")
            }
          } catch (err) {
            console.warn(err)
          }
      }

    
    render(){
        return(
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
                        right: (width / 120),
                        bottom: (height / 120) + 600,
                        left: (width / 120),
                        top: (height / 120) + 300,
                    }
                    });

                }}
                onError={(errorMessage) => {
                    // console.log('GOT AN ERROR');
                }}
                />
            )}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    mapContainer:{
      flex: 1,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
});