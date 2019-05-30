import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3 } from 'native-base';
import {View, Image, Dimensions, StyleSheet, ScrollView, FlatList,ListItem } from 'react-native';
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
    this._renderList = this._renderList.bind(this);
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

  _renderList({item, index}){
    console.log("data: "+JSON.stringify(item.fields));
        return (
            <View style={{flexDirection:'row', width: '100%', flex:8, marginLeft: 5 * vw}} >
                <Text style={{flex:4}}>{item.fields.timestamp}</Text>
                <Text style={{flex:4}}>{item.fields.class_attended? 'Attended': 'Not Attended'}</Text>
            </View>
        );
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
            <Text style={{ textAlign: 'left', marginLeft: 5 * vw, marginTop: 3 * vh}}>Name: {this.state.name}</Text>
            <Text style={{ textAlign: 'left', marginLeft: 5 * vw}}>Class: {this.state.standard}</Text>
            <Text style={{ textAlign: 'left', marginLeft: 5 * vw}}>Gender: {this.state.gender == 'M'? 'Male': 'Female'}</Text>
            <Text style={{ textAlign: 'left', marginLeft: 5 * vw}}>Phone Number: +91 {this.state.phone}</Text>
        </View>
         <View style={{backgroundColor:'#dcdcdc', margin: 2 * vw}}>
            <View style={{flexDirection:'row', width: '100%', flex:8, margin: 2 * vw}} >
                <Text style={{flex:4, fontWeight:'bold'}}>Student Name</Text>
                <Text style={{flex:2, fontWeight:'bold'}}>Attendance</Text>
                <Text style={{flex:2, fontWeight:'bold'}}></Text>
            </View>
            </View>
            <FlatList 
                data={this.state.attendance_data}
                renderItem={this._renderList}
                />            
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