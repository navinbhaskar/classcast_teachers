import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem, Fab} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import firebase from 'react-native-firebase';
export default class messageRecepients extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    this.state = {
    active: false,
    random: false,
    recepients: [
      {
        "chat_id": "e7ypHneThKVjoa5jcaYb",
        "users": [
          "abcd1234",
          "somebody1234",
          "user123"
        ],
        "type": "group",
        "display_name": "Batch - 147",
        "last_updated": 1558957946,
        "display_extra_info": {
          "class": 12,
          "students": 56
        }
      }
    ]
    }
}

_renderList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                  onPress={() => {
                    this.props.navigation.navigate('chatScreen', {
                      name: item.display_name,
                    });
            }}>
            <Icon type="FontAwesome" name={(item.type=="group")? "group": "user"} active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3, alignSelf:'center'}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.display_name}</Text>
                <View style={{flexDirection:'row'}}>
                    {item.display_extra_info.students && <Text style={{fontSize:10, color:'grey'}}>{item.display_extra_info.students} Students</Text>}
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.display_extra_info.class}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} />
        </ListItem>


    );
}

  componentDidMount(){
    const db = firebase.firestore()
    db.collection('chatLists')
      .doc('anuragc')
        .onSnapshot((doc)=> {
          console.log(JSON.stringify(doc.data().chats))    
          this.setState({recepients: doc.data().chats })
        }),
        (error) => {
        console.error(error);
        };
  }

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Header/>
        
        
        <Content style={{padding:5}}>
            <FlatList 
                data={this.state.recepients}
                extraData={this.state}
                renderItem={this._renderList}
                />  
                     
        </Content>
        <View style={{ flex: 1 }}>
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