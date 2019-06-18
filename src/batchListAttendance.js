import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import axios from "axios";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class batchListAttendance extends Component {

static navigationOptions = {
    title: "Attendance"
  };
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    this.state = {
    random: false,
    isReady: false,
    batchList: [
      {
        "batch_id": "Batch-1",
        "student_count": 0,
        "standard": 12
      }]
    }
  }

  componentDidMount() {
    //console.log("params: "+JSON.stringify(this.props));
    axios.get(`https://classcast-198812.appspot.com/teachersapp/batch_list`)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            this.setState({batchList: response.data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
  }

  _renderList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                    onPress={() => {
                      console.log("workingsdad");
                      
                      this.props.navigation.navigate('NewAttendance', {}, NavigationActions.navigate({ 
                          routeName: 'takeAttendance',
                          params: {
                            batch_id: item.batch_id,
                            standard: item.standard
                          },
                        }));
                      
                }}>
            <Icon type="FontAwesome" name="group" active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.batch_id}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey'}}>{item.student_count} Students</Text>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.standard}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.06 * SCREEN_WIDTH, paddingBottom: 0.01 * SCREEN_HEIGHT, paddingTop: 0.05 * SCREEN_HEIGHT, color: 'black', textAlign: 'center'}}>New Attendance</Text> 
        <Content style={{padding:5}}>
          { this.state.isReady &&
            <FlatList 
                data={this.state.batchList}
                extraData={this.state}
                renderItem={this._renderList}
                />            
          }
        </Content>            
      </Container>
    );
  }
}