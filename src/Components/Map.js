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
       // this.getCurrentPlace()

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
            ],
            pathResult: {
                distance: '',
                duration: '',
                fare: {},
                coordinates: [],
            }
        };

        this.mapView = null;
    }

    componentDidMount() {
        this.loadCoordinates()
    }

    onMapPress = (e) => {
        this.setState({
          coordinates: [
            ...this.state.coordinates,
            e.nativeEvent.coordinate,
          ],
        });
    }

    loadCoordinates(){
        this.setState({
            coordinates: [
              ...this.state.coordinates,
              this.props.destinationCoordinate,
            ],
        });
    }

    adjustZoomMap(){
        this.mapView.fitToCoordinates(this.state.pathResult.coordinates, {
            edgePadding: {
                right: (width / 120),
                bottom: (height / 120) + 600,
                left: (width / 120),
                top: (height / 120) + 300,
            }
        });
    }

    async getCurrentPlace(){

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

        const { pathDetailsCallback } = this.props;

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
                {
                    <MapView.Marker key={'coordinate_1'} coordinate={this.props.destinationCoordinate} />
                    /*this.state.coordinates.map((coordinate, index) =>
                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                    )*/
                }
                {(this.props.showPath) && (
                    <MapViewDirections
                    origin={this.state.coordinates[0] != null ? this.state.coordinates[0] : null}
                    waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
                    destination={this.props.destinationCoordinate}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onStart={(params) => {
                        //console.warn(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={(result) => {
                        this.setState({
                            pathResult: result
                        })
                        pathDetailsCallback(this.state.pathResult)
                        this.adjustZoomMap()

                    }}
                    onError={(errorMessage) => {
                        console.warn('deu ruim')
                        console.log('GOT AN ERROR');
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