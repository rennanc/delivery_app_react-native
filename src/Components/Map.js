import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Alert,
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

const initialRegion = {
    latitude: -37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

const GOOGLE_MAPS_APIKEY = 'AIzaSyCECNQxQ6pwCZZ42iIOCRBfRulCH6yYWsI';

export default class Map extends Component {

    constructor(props) {
        super(props);
       
        // AirBnB's Office, and Apple Park
        this.state = {
            region: {
                latitude: -37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            ready: true,
            //MAP
            coordinates: [
                {
                    latitude: 40.233845,
                    longitude:-111.658531,
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
        this.getCurrentPosition()
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

    getCurrentPosition() {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
              this.setRegion(region);
            },
            (error) => {
              //TODO: better design
              switch (error.code) {
                case 1:
                  if (Platform.OS === "ios") {
                    Alert.alert("", "To identify your location, enable permission for the Application under Settings - Privacy - Location");
                  } else {
                    Alert.alert("", "To identify your location, enable Application permission in Settings - Apps - DeliveryApp - Location");
                  }
                  break;
                default:
                  Alert.alert("", "Error detecting your location");
              }
            }
          );
        } catch(e) {
          alert(e.message || "");
        }
      };

    setRegion(region) {
        if(this.state.ready) {
            setTimeout(() => this.map.animateToRegion(region), 10);
        }
        this.setState({ region });
    }

    onRegionChange = (region) => {
        console.log('onRegionChange', region);
    };
    
    onRegionChangeComplete = (region) => {
        console.log('onRegionChangeComplete', region);
    };
    
    //TODO Use PermissionsAndroid.RESULTS.GRANTED to getCurrentPosition
    /*async getCurrentPlace(){

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
                            initialRegion:{                                
                                latitude: results.latitude,
                                longitude: results.longitude,
                            }
                        })
                        this.setRegion(this.state.initialRegion);
                        return results
                    })
                    .catch((error) => console.error(error.message))
            } else {
              console.error("access fine location permission denied")
            }
          } catch (err) {
            console.warn(err)
          }
      }*/

    
    render(){
        const { pathDetailsCallback } = this.props;

        return(
            <MapView
            showsUserLocation
            initialRegion={initialRegion}
            loadingEnabled
            style={styles.mapContainer}
            ref={ map => { this.map = map }}
            onRegionChange={this.onRegionChange}
            onRegionChangeComplete={this.onRegionChangeComplete}
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