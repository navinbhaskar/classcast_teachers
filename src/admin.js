import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
export default class admin extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderStudentList = this._renderStudentList.bind(this);
    this._renderBatchList = this._renderBatchList.bind(this);
    this.state = {
    random: false,
    batchList: [
         {"name": "Batch - 1",
         "nos": 13,
         "class": 12},
         {"name": "Batch - 2",
         "nos": 5,
         "class": 12},
         {"name": "Batch - 3",
         "nos": 46,
         "class": 12}
    ],
    studentList: [
        {"name": "Prashant Bhosdi",
         "id": 1,
         "class": 12},
         {"name": "Ayush Lodu",
         "id": 2,
         "class": 12},
         {"name": "Navin Gandu",
         "id": 3,
         "class": 12}
   ]
}
}

_renderBatchList({item, index}){
    return (
        <ListItem style={{flexDirection:'row', width: '100%', flex:16}}
                    onPress={() => {
                        this.props.navigation.navigate('manageBatch');
                }}>
            <Icon type="FontAwesome" name="group" active={false} style={{fontSize: 20, color: 'black', margin: 5, flex:3}} /> 
            <View style={{flex:11, justifyContent:'flex-start'}}>
                <Text style={{alignSelf:'flex-start'}} >{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:10, color:'grey'}}>{item.nos} Students</Text>
                    <Text style={{fontSize:10, color:'grey', marginLeft:5}}>Class {item.class}</Text>
                </View>
            </View>
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
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
            <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:2}} /> 
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Content style={{padding:5}}>
        <ListItem style={{marginTop:20, justifyContent:'center', width: '100%'}}>
            <Text style={{fontSize:20, fontWeight: 'bold', alignSelf:'center'}}>Manage Batches</Text>
            </ListItem>

            <ListItem style={{flexDirection:'row', alignItems:'flex-start', width: '100%', flex:8}}
                        onPress={() => {
                            this.props.navigation.navigate('addBatch');
                    }}>
                <Icon type="FontAwesome" name="plus"  active={false} style={{fontSize: 20, color: 'black', alignSelf:'center', marginLeft:5, flex:2}} /> 
                <Text style={{flex:4}} >Add New Batch</Text>
                <Text style={{flex:2}} ></Text>
            </ListItem>
            <FlatList 
                data={this.state.batchList}
                extraData={this.state}
                renderItem={this._renderBatchList}
                />           

            <ListItem style={{marginTop:20, justifyContent:'center', width: '100%'}}>
                <Text style={{fontSize:20, fontWeight: 'bold', alignSelf:'center'}}>Manage Students</Text>
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