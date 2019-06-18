import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import axios from "axios";
import {NavigationActions} from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class studentAdmin extends Component {

static navigationOptions = ({ navigation }) => ({
    title: 'Admin Actions',
    headerStyle: {
      backgroundColor: '#353666',
    },
    style: {
      backgroundColor: '#353666',
      height: 0.1 * SCREEN_HEIGHT
    },
    headerTintColor: '#fff'
  })

constructor(props) {
    super(props);
    this._renderStudentList = this._renderStudentList.bind(this);
    this.state = {
    random: false,
    studentList: []
}
}

  componentDidMount() {

    axios.get(`https://classcast-198812.appspot.com/teachersapp/student_list_with_batch_id/`)
        .then(function (response){
            console.log("abcd: "+JSON.stringify(response.data));
            this.setState({studentList: response.data})
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });

  }

_renderStudentList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                    onPress={() => {
                        this.props.navigation.navigate('editStudentData', {
                          username: item.username
                        });
                }}>
            <Icon type="FontAwesome" name="user" active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{fontFamily: 'Montserrat-Regular',alignSelf:'flex-start', fontSize: 0.035 * SCREEN_WIDTH,}} >{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontFamily: 'Montserrat-Bold',fontSize: 0.03 * SCREEN_WIDTH, color:'grey', marginLeft:5}}>{item.batch_id}</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.03 * SCREEN_WIDTH, color:'grey', marginLeft:5}}>Class {item.standard}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.06 * SCREEN_WIDTH, paddingBottom: 0.01 * SCREEN_HEIGHT, paddingTop: 0.05 * SCREEN_HEIGHT, color: 'black', textAlign: 'center'}}>Manage Students</Text> 
        <Content style={{padding:5}}>         

            <ListItem style={{flexDirection:'row', alignItems:'flex-start', width: '100%', flex:8}}
                        onPress={() => {
                            this.props.navigation.navigate('addStudent');
                    }}>
                <Icon type="FontAwesome" name="plus" active={false} style={{fontSize: 20, color: 'black', alignSelf:'center', marginLeft:5, flex:2}} /> 
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.04 * SCREEN_WIDTH, flex:4}} >Add New Student</Text>
            </ListItem>
            <FlatList 
                data={this.state.studentList}
                extraData={this.state}
                renderItem={this._renderStudentList}
                />                       
        </Content>            
      </Container>
    );
  }
}