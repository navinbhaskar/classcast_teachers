import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3 } from 'native-base';
import {View, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import axios from "axios";
import {NavigationActions} from 'react-navigation';

const screen = Dimensions.get('window'),
 vh = screen.height / 100,
 vw = screen.width / 100;


const USER_DP_MALE = require('./images/user-hp.png');
const USER_DP_FEMALE = require('./images/user-student.png');

export default class studentDetails extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
    super(props);
    this.state = {
      name: null,
      gender: '',
      standard: null,
      phone: '',
      attendance_data: [],
      photo: '',
      teacher_id: 0,
      isReady: false
      }
  }


   componentDidMount() {
    axios.get(`https://classcast-198812.appspot.com/teachersapp/student_attendance_data/`+this.props.navigation.state.params.username+'/'+this.props.navigation.state.params.standard+'/'+this.props.navigation.state.params.batch_id)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            this.setState({name: response.data.name});
            if(response.data.gender == '2') {
                this.setState({gender: 'F'})
              }
              else {
                this.setState({gender: 'M'})
              }
            this.setState({standard: response.data.standard});
            this.setState({photo: response.data.photo});
            this.setState({phone: response.data.phone});
            this.setState({attendance_data: response.data.attendance_data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
   }

    render() {
        console.log(JSON.stringify(this.props.navigation.state.params))
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.aboutUserSection}>
            <View style={styles.userImageContainer}>
              <Image 
                source={ this.state.gender == 'M' ? USER_DP_MALE: USER_DP_FEMALE}
                style={styles.userImage}/>
            </View>
            <Text style={{paddingTop: 5 * vw, alignSelf: 'center'}}>Name: {this.state.name}</Text>
            <Text style={{ alignSelf: 'center'}}>Class: {this.state.standard}</Text>
            <Text style={{ alignSelf: 'center'}}>Phone Number: +91 {this.state.phone}</Text>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   paddingTop: 2.5 * vh,
   flex: 1,
   backgroundColor: '#f0f3fa'
 },
 userImageContainer: {
  height: 30 * vw,
  width: 30 * vw,
  borderRadius: 15 * vw,
  padding: 0.6 * vw,
  backgroundColor: '#29206f',
  alignSelf: 'center'
 },
 userImage: {
   height: '100%',
   width: '100%',
   alignSelf: 'center'
 },
 aboutUserSection:{
   marginTop: 2 * vh,
   height: 40 * vh,
   width: '100%',
 },
})