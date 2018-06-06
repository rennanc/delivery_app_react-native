import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather'

import NumericInput from 'react-native-numeric-input'

export default class PackageDetails extends Component {

    constructor(props) {
        super(props);
    }
    
    render(){
        return(
            <View style={styles.container}>
              <View>
                <Icon name="box" size={100} color="#900" />
              </View>
              <View>
                <Text>Height</Text>
                <NumericInput onChange={value => console.log(value)} rounded 
                textColor='#59656F'
                initValue={1}
                minValue={1}
                iconStyle={{ color: 'white' }}
                leftButtonBackgroundColor={leftButtonBackgroundColor}
                rightButtonBackgroundColor={rightButtonBackgroundColor}
                />
                <Text>Weight</Text>
                <NumericInput onChange={value => console.log(value)} rounded 
                textColor='#59656F'
                initValue={1}
                minValue={1}
                iconStyle={{ color: 'white' }}
                leftButtonBackgroundColor={leftButtonBackgroundColor}
                rightButtonBackgroundColor={rightButtonBackgroundColor}
                />
                <Text>Length</Text>
                <NumericInput onChange={value => console.log(value)} rounded 
                textColor='#59656F'
                initValue={1}
                minValue={1} 
                iconStyle={{ color: 'white' }}
                leftButtonBackgroundColor={leftButtonBackgroundColor}
                rightButtonBackgroundColor={rightButtonBackgroundColor}
                />
              </View>
            </View>
        );
    }
}


const rightButtonBackgroundColor = "#AC9FBB";
const leftButtonBackgroundColor = "#DDBDD5";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width - 20,
    marginTop: 100,
    borderRadius: 10,
  }
});

