import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, DatePicker , ListItem, Picker, Form, Spinner} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, Dimensions, ToastAndroid } from 'react-native';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class attendanceReport extends Component {

static navigationOptions = {
    header: null,
    };
constructor(props) {
    super(props);
    this._renderList = this._renderList.bind(this);
    this.loadData = this.loadData.bind(this);
    this.generateReport = this.generateReport.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
    standard: this.props.navigation.state.params.standard,
    batch_id: this.props.navigation.state.params.batch_id,
    random: false,
    chosenDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    startDateSelected: false,
    endDateSelected: false,
    total_class: 0,
    percentage: 0,
    isReady: false,
    isReady2: false,
    selected: this.props.navigation.state.params.batch_id+','+this.props.navigation.state.params.standard,
    batchList: [
      {
        "batch_id": "",
        "student_count": 0,
        "standard": ""
      }],
    recepients: [
         {"name": "",
         "username": '',
         "class_attended": false
     }
    ]
    }
    }

    onValueChange(value) {

        console.log("value: "+value.split(',')[0]);
        this.setState({
                batch_id: value.split(',')[0],
                standard: value.split(',')[1],
                selected: value },
        this.loadData
        );
      }

    generateReport() {
        console.log("date2");
        console.log("date2: "+this.state.endDate.getFullYear()+'/'+parseInt(this.state.endDate.getMonth()+1)+'/'+this.state.endDate.getDate());
        data = {
            "standard": this.state.standard,
            "batch_id": this.state.batch_id,
            "start_date": this.state.startDate.getFullYear()+'-'+parseInt(this.state.startDate.getMonth()+1)+'-'+this.state.startDate.getDate(),
            "end_date": this.state.endDate.getFullYear()+'-'+parseInt(this.state.endDate.getMonth()+1)+'-'+this.state.endDate.getDate()
        };
        axios.post(`https://classcast-198812.appspot.com/teachersapp/get_attendance_range_data`, data)
        .then(function (response){
            console.log("asdfgh"+JSON.stringify(response.data));
            var output = [];
            var total_class = 0;
            response.data.student_data.forEach((item) => {
            console.log("map_data: "+JSON.stringify(item));
            var existing = output.filter((v, i) => {
                return v.username == item.username;
            });

            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                //output[existingIndex].value = output[existingIndex].value.concat(item.value);
                if(item.class_attended)
                    output[existingIndex].class = output[existingIndex].class+1
            } 
            else {
                if(item.class_attended)
                    item.class = 1
                else
                    item.class = 0
                output.push(item);
              }
        });
        //console.log("new: "+JSON.stringify(output.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))));
        //output.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
        this.setState({recepients: output});
        ToastAndroid.showWithGravity("Report generated successfully", ToastAndroid.SHORT, ToastAndroid.CENTER)
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });

    }

    _renderList({item, index}){
        console.log("item: "+JSON.stringify(item))
        return (
            <TouchableNativeFeedback
                onPress={()=> {
                    const navigateAction = NavigationActions.navigate({
                      routeName: 'studentDetails',
                      params: {
                        batch_id: this.state.batch_id,
                        standard: this.state.standard,
                        username: item.username
                      },
                    });
                    this.props.navigation.dispatch(navigateAction);
                }}
            >
            <ListItem style={{flexDirection:'row', width: '90%', flex:18, marginBottom: 0.01 * SCREEN_HEIGHT, alignSelf: 'center'}} >
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, flex:10}}>{item.name}</Text>
                <View style={{flexDirection: 'row', flex: 8}}>
                    <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, flex: 4 }}>{Math.round(item.class*100/(this.state.total_class+.000001),1)} %</Text>
                    <View style={{backgroundColor: '#f32a76', borderRadius: 0.02 * SCREEN_WIDTH, elevation: 5, flex: 4}}>
                      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.04 * SCREEN_WIDTH, color:'white', alignSelf: 'center', marginLeft: 0.02 * SCREEN_WIDTH, marginRight: 0.02 * SCREEN_WIDTH, marginTop: 0.003 * SCREEN_HEIGHT, marginBottom: 0.003 * SCREEN_HEIGHT}}>View</Text>
                    </View>
                </View>
            </ListItem>
            </TouchableNativeFeedback>


        );
    }

    loadData() {
        console.log("working00: "+this.state.batch_id+'||'+this.state.standard);
        axios.get(`https://classcast-198812.appspot.com/teachersapp/batch_list_without_student_count`)
        .then(function (response){
            console.log("value1: "+JSON.stringify(response.data));
            this.setState({batchList: response.data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
    axios.get(`https://classcast-198812.appspot.com/teachersapp/overview_attendance_data/`+this.state.standard+'/'+this.state.batch_id)
        .then(function (response){
            console.log("dsbfsifbdfsi"+JSON.stringify(response.data));
            this.setState({total_class: response.data.total_classes});
            this.setState({percentage: response.data.percentage});
            var output = [];
            var total_class = 0;
            response.data.student_data.forEach((item) => {
            console.log("map_data: "+JSON.stringify(item));
            var existing = output.filter((v, i) => {
                return v.username == item.username;
            });

            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                //output[existingIndex].value = output[existingIndex].value.concat(item.value);
                if(item.class_attended)
                    output[existingIndex].class = output[existingIndex].class+1
            } 
            else {
                if(item.class_attended)
                    item.class = 1
                else
                    item.class = 0
                output.push(item);
              }
        });
        console.log("new: "+JSON.stringify(output));
        this.setState({recepients: output});
        this.setState({isReady2: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
    }

    componentDidMount() {
        this.loadData()
    }


  render() {
    return (
      <Container style={{backgroundColor:'#e2e2e2', flex: 1, width: '100%'}}>
      <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.06 * SCREEN_WIDTH, paddingBottom: 0.01 * SCREEN_HEIGHT, paddingTop: 0.05 * SCREEN_HEIGHT, color: 'black', textAlign: 'center'}}>Attendance Report</Text> 
        <Content style={{ width: '100%'}}>
            <Form>
            { this.state.isReady &&
                <Picker 
                style={{alignSelf:'center', width: '60%', elevation: 5, borderColor: 'red' }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                >
                    {this.state.batchList.map((item, key)=>(
                        <Picker.Item color='black' label={item.fields.batch_id+', Class- '+item.fields.standard} value={item.fields.batch_id+','+item.fields.standard} key={item.fields.batch_id+item.fields.standard} />)
                    )}
                </Picker>
            }
            { !this.state.isReady &&
                <Spinner color='red' />
            }
            </Form>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10}}>
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.03 * SCREEN_WIDTH, marginRight:10, fontWeight:'bold'}}>From</Text>
                <Button primary light style={{backgroundColor:"white"}}>
                    <DatePicker
                    defaultDate={new Date((new Date()).valueOf() - 1000*60*60*24)}
                    maximumDate={new Date()}
                    locale={"en"}
                    animationType={"fade"}
                    androidMode={"calendar"}
                    placeHolderText="Select Date"
                    textStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, color: "black" }}
                    placeHolderTextStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, color: "#d3d3d3" }}
                    onDateChange={(date) => {
                        this.setState({startDate: date});
                        this.setState({startDateSelected: true});
                    }}
                    disabled={false}
                    />
                </Button>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 0.03 * SCREEN_WIDTH, marginHorizontal:10, fontWeight:'bold'}}>to</Text>
                <Button primary light style={{backgroundColor:"white"}}>
                    <DatePicker
                    defaultDate={new Date()}
                    minimumDate={this.state.startDate}
                    maximumDate={new Date()}
                    locale={"en"}
                    animationType={"fade"}
                    androidMode={"calendar"}
                    placeHolderText="Select Date"
                    textStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, color: "black" }}
                    placeHolderTextStyle={{ fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, color: "#d3d3d3" }}
                    onDateChange={(date) => {
                        this.setState({endDate: date});
                        this.setState({endDateSelected: true});
                    }}
                    disabled={false}
                    />
                </Button>
            </View>
            <Button primary style={{ backgroundColor: '#f32a76', alignSelf:'center',marginTop: 10}}
                onPress={()=>{
                if(this.state.startDateSelected && this.state.endDateSelected) {
                    this.generateReport();
                }
                else {
                    ToastAndroid.showWithGravity("Select start and end date", ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
              }}>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH, color: this.state.startDateSelected && this.state.endDateSelected ? 'white': 'grey'}}>Generate Report</Text>
            </Button>
            <View style={{alignItems:'center', justifyContent:'center', margin:30}}>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH,}}>Total Classes - {this.state.total_class}</Text>
                <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 0.04 * SCREEN_WIDTH,}}>Average Attendance - {this.state.percentage}%</Text>
            </View>
            <View style={{backgroundColor:'#dcdcdc'}}>
            <ListItem style={{flexDirection:'row', width: '100%', flex:18}} >
                <Text style={{flex:10, fontFamily: 'Montserrat-Bold', fontSize: 0.03 * SCREEN_WIDTH}}>Student Name</Text>
                <Text style={{flex:8, fontFamily: 'Montserrat-Bold', fontSize: 0.03 * SCREEN_WIDTH}}>Attendance</Text>
            </ListItem>
            </View>
            { this.state.isReady2 &&
            <FlatList 
                data={this.state.recepients}
                extraData={this.state}
                renderItem={this._renderList}
                />            
            }
            { !this.state.isReady2 &&
                <Spinner color='red' />
            }
        </Content>
            
      </Container>
    );
  }
}