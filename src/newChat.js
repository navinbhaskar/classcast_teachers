import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
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
         "selected": true},

    ]
    }
}

_renderList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:8}}>
            <Icon type="FontAwesome" name={(item.type=="student")? "user": "group"} active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:2}} /> 
            <Text style={{flex:5}}>{item.name}</Text>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:1}} /> 
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Content style={{padding:5}}>
          <FlatList 
              data={this.state.recepients}
              extraData={this.state}
              renderItem={this._renderList}
              />            
        </Content>
            
      </Container>
    );
  }
}