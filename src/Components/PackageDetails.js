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

const measureEnum = { 
  HEIGHT: 'height',
  WIDTH: 'width',
  LENGTH: 'length',
};

export default class PackageDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
          measures: {
            height: 1,
            width: 1,
            length: 1,
          },
        }
    }

    changeMeasures(value,measureEnum){
      var height = this.state.measures.height
      var width = this.state.measures.width
      var length = this.state.measures.length

      this.setState({
        measures:{
          height,
          width,
          length,
          [measureEnum]: value
        },
      })
      this.props.packageDetailsCallBack(this.state.measures)
    }
    
    render(){
        return(
            <View style={styles.container}>
              <View style={styles.block} >
                <Icon name="box" size={100} color="#900" />
              </View>
              <View style={styles.block}>
                <Text>Height</Text>
                <NumericInput onChange={value => this.changeMeasures(value, measureEnum.HEIGHT)} rounded 
                textColor='#59656F'
                initValue={1}
                minValue={1}
                iconStyle={{ color: 'white' }}
                leftButtonBackgroundColor={leftButtonBackgroundColor}
                rightButtonBackgroundColor={rightButtonBackgroundColor}
                />
                <Text>Width</Text>
                <NumericInput onChange={value => this.changeMeasures(value, measureEnum.WIDTH)} rounded 
                textColor='#59656F'
                initValue={1}
                minValue={1}
                iconStyle={{ color: 'white' }}
                leftButtonBackgroundColor={leftButtonBackgroundColor}
                rightButtonBackgroundColor={rightButtonBackgroundColor}
                />
                <Text>Length</Text>
                <NumericInput onChange={value => this.changeMeasures(value, measureEnum.LENGTH)} rounded 
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
    width: width - 30,
    borderRadius: 10,
    bottom: 25,
  },
  block:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

