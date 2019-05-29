import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
export default class manageBatch extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderStudentList = this._renderStudentList.bind(this);
    this.state = {
    random: false,
    studentList: [
        {"name": "Prashant Bhosdi",
         "id": 1,
         "class": 12},
         {"name": "Ayush Lodu",
         "id": 2,
         "class": 12},
         {"name": "Cool Navin",
         "id": 3,
         "class": 12}
   ]
}
}

_renderStudentList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                    onPress={() => {
                        this.props.navigation.navigate('takeAttendance');
                }}>
            <Icon type="FontAwesome" name="user" active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.class}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="circle-o" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Content style={{padding:5}}>     
            <ListItem style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'center', width: '100%'}}>
                <Text style={{fontSize:20, fontWeight: 'bold', alignSelf:'center'}}>Batch-1</Text>
                <Icon type="FontAwesome" name="edit" active={false} style={{fontSize: 20, color: 'black', alignSelf:'center', marginLeft:5, flex:2}} /> 
            </ListItem>
            <ListItem style={{marginTop:5, flexDirection:'row', alignItems:'center', justifyContent:'center', width: '100%'}}>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>S</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>M</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>T</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>W</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>T</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>F</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>S</Text></Button>
            </ListItem>
            <ListItem style={{flexDirection:'row', alignItems:'flex-start', width: '100%', flex:8}}
                        onPress={() => {
                            this.props.navigation.navigate('takeAttendance');
                    }}>
                <Icon type="FontAwesome" name="plus" active={false} style={{fontSize: 20, color: 'black', alignSelf:'center', marginLeft:5, flex:2}} /> 
                <Text style={{flex:4}} >Add New Student</Text>
                <Text style={{flex:2}} ></Text>
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