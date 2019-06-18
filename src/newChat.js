import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';


export default class messageRecepients extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    this.state = {
    random: false,
    recepients: [
         {"name": "Rahul Tanwar",
         "type": "student",
         "selected": false},
         {"name": "Rahul Tanwar",
         "type": "student",
         "selected": false},
         {"name": "Batch - 1",
         "type": "batch",
         "selected": true}
    ]
    }
}

  _renderList({item, index}){
    console.log("item: "+JSON.stringify(item));
    if(item.type == 'batch') {
      return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                  onPress={() => {
                    data = {
                      "display_name": item.batch_id,
                      "standard": item.standard,
                      "type": 'group'
                    };
                    axios.post(`https://classcast-198812.appspot.com/teachersapp/store_chat_list_data`, data)
                    .then(res=> {
                      console.log("dsknkds: "+JSON.stringify(res.data));

                      axios.post(`https://classcast-198812.appspot.com/teachersapp/start_chat`, { "chat_id": res.data.chat_id })
                      .then(result=> {
                        this.props.navigation.navigate('chatScreen', {
                          name: item.batch_id,
                          chat_id: res.data.chat_id
                        });
                      })

                    })
            }}>
            <Icon type="FontAwesome" name={(item.type=="student")? "user": "group"} active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:2}} /> 
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
    else if(item.type == 'student') {

      return (
      <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                  onPress={() => {
                    data = {
                      "display_name": item.name,
                      "username": item.username,
                      "standard": item.standard,
                      "type": 'student'
                    };
                    axios.post(`https://classcast-198812.appspot.com/teachersapp/store_chat_list_data`, data)
                    .then(res=> {
                      console.log("dsknkds: "+JSON.stringify(res.data));

                      axios.post(`https://classcast-198812.appspot.com/teachersapp/start_chat`, { "chat_id": res.data.chat_id })
                      .then(result=> {
                        this.props.navigation.navigate('chatScreen', {
                          name: item.name,
                          chat_id: res.data.chat_id
                        });
                      })

                    })

            }}>
            <Icon type="FontAwesome" name={(item.type=="student")? "user": "group"} active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:2}} /> 
          <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey'}}>{item.batch_id}</Text>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.standard}</Text>
                </View>
          </View>
          <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} />
        </ListItem>
      );
    }
    else {
      return (
          <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} ></Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey'}}></Text>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}></Text>
                </View>
          </View>
      );
    }
  }
  
  componentDidMount() {
    axios.get(`https://classcast-198812.appspot.com/teachersapp/chat_data/`)
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