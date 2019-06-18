import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import axios from "axios";
import {NavigationActions} from 'react-navigation';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class messageRecepients extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    this.state = {
    random: false,
    isReady: false,
    recepients: [
        {
          "batch_id": "",
          "student_count": "",
          "standard": false
       }
    ]
    }
}

  _renderList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                    onPress={() => {
                      this.props.navigation.navigate('attendanceReport', {}, NavigationActions.navigate({ 
                          routeName: 'Report',
                          params: {
                            batch_id: item.batch_id,
                            standard: item.standard
                          },
                        }));
                }}>
            <Icon type="FontAwesome" name="group" active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, alignSelf:'flex-start'}} >{item.batch_id}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.03 * SCREEN_WIDTH, color:'grey'}}>{item.student_count} Students</Text>
                    <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.03 * SCREEN_WIDTH, color:'grey', marginLeft:5}}>Class {item.standard}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
}

  componentDidMount() {
    axios.get(`https://classcast-198812.appspot.com/teachersapp/batch_list`)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            this.setState({recepients: response.data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
  }

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.06 * SCREEN_WIDTH, paddingBottom: 0.01 * SCREEN_HEIGHT, paddingTop: 0.05 * SCREEN_HEIGHT, color: 'black', textAlign: 'center'}}>Attendance Report</Text> 
        <Content style={{padding:5}}>
        { this.state.isReady &&
          <FlatList 
              data={this.state.recepients}
              extraData={this.state}
              renderItem={this._renderList}
          />            
        }
        </Content>
            
      </Container>
    );
  }
}