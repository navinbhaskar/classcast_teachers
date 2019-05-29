import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem, Item, Input} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
export default class addBatch extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this.state = {
    random: false,
    isDateTimePickerVisible: false,
    date: null,
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

showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

hideDateTimePicker = () => {
this.setState({ isDateTimePickerVisible: false });
};

handleDatePicked = date => {
this.setState({ date: date.getHours() + ':' + date.getMinutes()});
this.hideDateTimePicker();
};

  render() {
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Content style={{padding:5}}>     
            <Item style={{marginTop:20, flexDirection:'row', alignItems:'center', justifyContent:'center', width: '100%'}}>
                    <Input style={{fontSize:20, alignSelf:'center'}} placeholder='Enter Batch Name'/>           
            </Item>
            <Item style={{marginTop:20, flexDirection:'row', borderColor:'white', alignItems:'center', justifyContent:'center', width: '100%'}}>
                    <Text style={{fontSize:14, alignSelf:'center'}}>Select days & timings</Text>        
            </Item>
            <ListItem underline={false} >
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>S</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>M</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>T</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>W</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>T</Text></Button>
                <Button disabled style={{backgroundColor:'grey', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>F</Text></Button>
                <Button disabled style={{backgroundColor:'#101E3D', padding:1, margin:1, borderRadius:5}}><Text  style={{color:'white'}}>S</Text></Button>
            </ListItem>
            <ListItem underline={false} style={{justifyContent:'center'}} >
                <Button onPress={this.showDateTimePicker} style={{marginHorizontal:15}}><Text> {this.state.date}</Text></Button>
                    <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    timePickerModeAndroid={'spinner'}
                    mode= {'time'}
                    />
                <Button onPress={this.showDateTimePicker} style={{marginHorizontal:15}}><Text> {this.state.date}</Text></Button>
                  <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  timePickerModeAndroid={'spinner'}
                  mode= {'time'}
                  />
                
            </ListItem>
            <ListItem style={{flexDirection:'row', alignItems:'flex-start', width: '100%', flex:8}}
                        onPress={() => {
                            this.props.navigation.navigate('takeAttendance');
                    }}>
                <Icon type="FontAwesome" name="plus" active={false} style={{fontSize: 20, color: 'black', alignSelf:'center', marginLeft:5, flex:2}} /> 
                <Text style={{flex:4}} >Add New Student</Text>
                <Text style={{flex:2}} ></Text>
            </ListItem>                     
        </Content>            
      </Container>
    );
  }
}