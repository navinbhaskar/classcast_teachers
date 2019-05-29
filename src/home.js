import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3 } from 'native-base';
import {View, Image } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import axios from "axios";
import {NavigationActions} from 'react-navigation';

export default class Home extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
    super(props);
    this.getHour = this.getHour.bind(this);
    this.state = {
      hour: null,
      name: null,
      student_count: 0,
      course_count: 0,
      photo: '',
      teacher_id: 0
      }
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours()
    this.setState({
       hour
    });
   }

   componentDidMount() {
    axios.get(`https://classcast-198812.appspot.com/teachersapp/teacher_data`)
        .then(function (response){
            console.log(JSON.stringify(response.data.teacher_id));
            this.setState({teacher_id: response.data.teacher_id});
            this.setState({name: response.data.name});
            this.setState({student_count: response.data.student_count});
            this.setState({course_count: response.data.courses});
            this.setState({photo: response.data.photo});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
    this.getHour();
   }

    render() {
    return (
      <Container style={{backgroundColor:'#101E3D', flex: 1}}>
        <Content style={{padding:10}}>
            <View style={{margin: 5}}>
                <H1 style={{color:'white', margin:10}}>{this.state.hour < 12 ? `Good Morning, Sir` : this.state.hour < 17 ? `Good Afternoon, Sir` : `Good Evening, Sir`}</H1>
                <View style={{flexDirection:'row'}}>
                    <View style={{height: 120, width: 120, borderRadius: 60, backgroundColor:"white", margin: 20}}>
                        <Image
                            source={{uri: this.state.photo}}
                            style={{height: 120, width: 120, borderRadius: 60, borderWidth: 3, backgroundColor: '#F3BA1D', borderColor: 'white'}}
                            />
                    </View>
                    <View style={{margin: 20, marginTop: 30}}>
                        <H3 style={{color:'white', marginBottom: 10}}>{this.state.name}</H3>
                        <View style={{flexDirection: 'row', margin: 3, justifyContent: 'space-between', width: '50%'}}>
                            <Icon type="FontAwesome" name="users" style={{fontSize: 15, color:'white', margin: 5}} />
                            <Text style= {{color: 'white'}}>{this.state.student_count+ ` Students`}</Text>
                        </View>
                        <View style={{flexDirection: 'row', margin: 3, justifyContent: 'space-between',  width: '50%'}}>
                            <Icon type="FontAwesome" name="play" style={{fontSize: 15, color:'white', margin: 5 }} />
                            <Text style= {{color: 'white'}}>{this.state.course_count+` Courses`}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{height: 250 , width: '100%', alignItems: "center", justifyContent: 'center'}}>
                <View style={{flexDirection:'row'}}>
        
                    <Button onPress={() => this.props.navigation.navigate('Message')} style={{height: 120, flexDirection:'column' , width: '40%', elevation:3, borderRadius: 5, backgroundColor: '#F3BA1D', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type="FontAwesome" name="paper-plane" style={{fontSize: 30, color:'#101E3D', margin: 5}} />
                        <Text style= {{color: '#101E3D', fontSize: 11}}>Communication</Text>
                    </Button>

                    <Button 
                        onPress={() => {
                          const navigateAction = NavigationActions.navigate({
                          routeName: 'Attendance'
                        });
                        this.props.navigation.dispatch(navigateAction); 
                        }} 
                        style={{height: 120, flexDirection:'column' , width: '40%', elevation:3, borderRadius: 5, backgroundColor: '#F3BA1D', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type="FontAwesome" name="address-book" style={{fontSize: 30, color:'#101E3D', margin: 5}} />
                        <Text style= {{color: '#101E3D', fontSize: 11}}>Attendance</Text>
                    </Button>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{height: 120 , width: '40%', elevation:3, borderRadius: 5, backgroundColor: '#F3BA1D', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type="FontAwesome" name="star-o" style={{fontSize: 30, color:'#101E3D', margin: 5}} />
                        <Text style= {{color: '#101E3D'}}>Performance</Text>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('Admin')} style={{height: 120, flexDirection:'column' , width: '40%', elevation:3, borderRadius: 5, backgroundColor: '#F3BA1D', margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                        <Icon type="FontAwesome" name="tasks" style={{fontSize: 30, color:'#101E3D', margin: 5}} />
                        <Text style= {{color: '#101E3D', fontSize: 11}}>Admin Actions</Text>
                    </Button>
                </View>
            </View>
        </Content>
      </Container>
    );
  }
}