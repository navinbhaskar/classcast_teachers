import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Icon , ListItem} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import axios from "axios";
import {NavigationActions} from 'react-navigation';
const screen = Dimensions.get('window'),
  vh = screen.height / 100,
  vw = screen.width / 100;


export default class takeAttendance extends Component {

static navigationOptions = {
  header: null,
};
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    //this.submit = this.submit.bind(this);
    this.state = {
    isReady: false,
    today:  new Date(),
    studentList: [
         {
          "name": "Rahul Pohli",
          "username": "",
          "class_attended": false
        }
    ]
    }
  }

  componentDidMount() {
    //console.log(JSON.stringify(this.props.navigation.state.params));

    axios.get(`https://classcast-198812.appspot.com/teachersapp/get_attendance_data/`+this.props.navigation.state.params.standard+'/'+this.props.navigation.state.params.batch_id)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            this.setState({studentList: response.data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
  }

  submit() {
     var data = {
                  "batch_id": this.props.navigation.state.params.batch_id,
                  "standard": this.props.navigation.state.params.standard,
                  "students": this.state.studentList
                }

    axios.post(`https://classcast-198812.appspot.com/teachersapp/submit_attendance`, data)
        .then(function (response){
            console.log("Post_request"+JSON.stringify(response.data));
            this.props.navigation.navigate('HomeStack', {}, NavigationActions.navigate({ routeName: 'Home' }));
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
  }

  _renderList({item, index}){
    return (
        <ListItem selected= {this.state.studentList[index].class_attended} style={{flexDirection:'row', width: '100%', flex:8}}
            onPress={() => {
                let studentList = this.state.studentList;
                studentList[index].class_attended= !item.class_attended;
                this.setState({studentList});
                console.log(JSON.stringify(this.state.studentList));
        }}>
                <Text style={{flex:6}}>{item.name}</Text>
                <Icon type="FontAwesome" name={this.state.studentList[index].class_attended? "toggle-on": "toggle-off"}  active={false} style={{color: this.state.studentList[index].class_attended? "green": "red", fontSize: 23, margin: 5, alignSelf:'flex-end', flex:1}} />
                <Text style={{flex:1, fontWeight: 'bold'}}>{this.state.studentList[index].class_attended? "P": "A"}</Text>
        </ListItem>


    );
}

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
      <View style={{backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', width: '40%', borderRadius: 5 * vw, alignSelf:'center'}}>
        <Text style={{color: 'white',fontWeight: 'bold', paddingLeft: 5 * vw, paddingTop: 2 * vh, paddingBottom: 2 * vh, alignSelf:'center'}}>{'Date: '+ this.state.today.getDate() + "/"+ parseInt(this.state.today.getMonth()+1) +"/"+ this.state.today.getFullYear()+"  "}</Text>
      </View>
        <Content style={{padding:5}}>
          { this.state.isReady &&
            <FlatList 
                data={this.state.studentList}
                extraData={this.state}
                renderItem={this._renderList}
                />
          }
        </Content>
        <View style={{marginTop: 10}}>
          <Button block onPress={()=>{
            console.log('working');
            this.submit();
          }}>
            <Text>SUBMIT</Text>
          </Button>
        </View>
      </Container>
    );
  }
}