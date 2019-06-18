import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem, Fab} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import axios from 'axios';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class messageRecepients extends Component {

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
    this._renderList = this._renderList.bind(this);
    this.state = {
    active: false,
    random: false,
    isReady: false,
    recepients: []
    }
}

_renderList({item, index}){
    console.log("data: "+JSON.stringify(item));
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                  onPress={() => {
                    this.props.navigation.navigate('chatScreen', {
                      name: item.name,
                      chat_id: item.chat_id
                    });
            }}>
            <Icon type="FontAwesome" name={(item.type=="group")? "group": "user"} active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3, alignSelf:'center'}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey'}}>{ item.type=="student"? item.batch_id: '' }</Text>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.standard}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} />
        </ListItem>


    );
}

  componentDidMount(){

    axios.get(`https://classcast-198812.appspot.com/teachersapp/chat_list/`)
    .then((res)=> {
      console.log("chat_list: "+JSON.stringify(res.data));
      this.setState({recepients: res.data.reverse(),
                        isReady: true
           })
    })
    .catch(err=> {console.log("errorrr: "+err)})

    const db = firebase.firestore()
    db.collection('chatLists')
      .doc('rohit1098')
        .onSnapshot((doc)=> {
          console.log("chats: "+JSON.stringify(doc.data().chats));
          this.setState({recepients: doc.data().chats,
                        isReady: true
           })
        }),
        (error) => {
        console.error(error);
        };
  }

  render() {
    return (
      <Container style={{ flex: 1}}>
        
        <Content style={{padding:2}}>
        { this.state.isReady &&
            <FlatList 
                data={this.state.recepients}
                extraData={this.state}
                renderItem={this._renderList}
                />  
         }            
        </Content>
        <View style={{ position: 'absolute', bottom: 0, right: 0}}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => {this.props.navigation.navigate('New Channel')}}>
            <Icon name="add" />
          </Fab>
        </View>            
      </Container>
    );
  }
}