import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

const basePrice = 5;
const valueMille = 1.041;
const valueTime = 1.041;

export default class PaymentDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
          priceTotal: 0
          
        }
        
    }

    componentDidMount(){
      console.warn(this.props.pathDetails)
      //this.calculateService(this.props.pathDetails)
    }

    calculateService(pathDetails){
      var priceTotal
      if(pathDetails.distance){
        var valueMilleTotal = pathDetails.distance * valueMille
        var valueTimeTotal = pathDetails.duration * valueTime

        priceTotal = basePrice + valueTimeTotal + valueMilleTotal
        console.warn("valueMilesTotal: "+ valueMilleTotal + "\n valueTimeTotal" + valueTimeTotal + "\n priceTotal" + priceTotal)
      }
      return priceTotal
    }

    getTime(pathDetails){
      var duration
      if(pathDetails.duration){
        duration = pathDetails.duration + " min"
      }
      return duration
    }

    getDistance(pathDetails){
      var distance
      if(pathDetails.distance){
        distance = pathDetails.distance + " miles"
      }
      return distance
    }
    
    render(){
      const {pathDetails} = this.props;


        return(
            <View style={styles.container}>
              <Text style={styles.block}>Price: {this.calculateService(pathDetails)}</Text>
              <Text style={styles.block}>Time left: {this.getTime(pathDetails)}</Text>
              <Text style={styles.block}>Distance: {this.getDistance(pathDetails)}</Text>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width - 30,
    height: 50,
    borderRadius: 10,
    bottom: 220,
  },
  block:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

