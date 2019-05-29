import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, DatePicker , ListItem, Picker, Form, ToastAndroid} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';


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
    total_class: 0,
    percentage: 0,
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
            "batch_id": this.props.state.batch_id,
            "start_date": this.state.startDate.getFullYear()+'-'+parseInt(this.state.startDate.getMonth()+1)+'-'+this.state.startDate.getDate(),
            "end_date": this.state.endDate.getFullYear()+'-'+parseInt(this.state.endDate.getMonth()+1)+'-'+this.state.endDate.getDate()
        };
        axios.post(`https://classcast-198812.appspot.com/teachersapp/get_attendance_range_data`, data)
        .then(function (response){
            console.log(JSON.stringify(response.data));
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
            <ListItem style={{flexDirection:'row', width: '100%', flex:8}} >
                <Text style={{flex:4}}>{item.name}</Text>
                <Text style={{flex:3}}>{Math.round(item.class*100/(this.state.total_class+.000001),1)} %</Text>
                <Icon type="FontAwesome" name="chevron-right" active={false} style={{fontSize: 15, color: 'black', margin: 5, flex:1}} /> 
            </ListItem>
            </TouchableNativeFeedback>


        );
    }

    loadData() {
        console.log("working00: "+this.state.batch_id+'||'+this.state.standard);
        axios.get(`https://classcast-198812.appspot.com/teachersapp/batch_list_without_student_count`)
        .then(function (response){
            console.log(JSON.stringify(response.data));
            this.setState({batchList: response.data});
            this.setState({isReady: true});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
    axios.get(`https://classcast-198812.appspot.com/teachersapp/overview_attendance_data/`+this.state.standard+'/'+this.state.batch_id)
        .then(function (response){
            console.log(JSON.stringify(response.data));
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
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
    }

    componentDidMount() {
        this.loadData()
    }


  render() {
    //console.log("date: "+this.state.endDate.getFullYear()+'/'+parseInt(this.state.today.getMonth()+1)+'/'+this.state.endDate.getDate());
    return (
      <Container style={{backgroundColor:'white', flex: 1}}>
        <Content style={{padding:5}}>
            <Form>
            { this.state.isReady &&
                <Picker 
                style={{alignSelf:'center', width: '60%', marginLeft: 50}}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                >
                    {this.state.batchList.map((item, key)=>(
                        <Picker.Item label={item.batch_id+', Class- '+item.standard} value={item.batch_id+','+item.standard} key={item.batch_id+item.standard} />)
                    )}
                </Picker>
              }
            </Form>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', margin:10}}>
            <Text style={{fontSize:15, marginRight:10, fontWeight:'bold'}}>From</Text>
                <Button rounded light style={{backgroundColor:"green"}}>
                    <DatePicker
                    defaultDate={new Date(2019, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    animationType={"fade"}
                    androidMode={"calendar"}
                    placeHolderText="Select Date"
                    textStyle={{ color: "white" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) => this.setState({startDate: date})}
                    disabled={false}
                    />
                </Button>
                <Text style={{fontSize:15, marginHorizontal:10, fontWeight:'bold'}}>to</Text>
                <Button rounded light style={{backgroundColor:"green"}}>
                    <DatePicker
                    defaultDate={new Date(2019, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2019, 12, 31)}
                    locale={"en"}
                    animationType={"fade"}
                    androidMode={"calendar"}
                    placeHolderText="Select Date"
                    textStyle={{ color: "white" }}
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={(date) => this.setState({endDate: date})}
                    disabled={false}
                    />
                </Button>
            </View>
            <Button rounded light style={{backgroundColor:"green", alignSelf:'center',marginTop: 10}}
                onPress={()=>{
                console.log('working');
                this.generateReport();
              }}>
                <Text style={{color: 'white', fontSize:12}}>Generate Report</Text>
            </Button>
            <View style={{alignItems:'center', justifyContent:'center', margin:30}}>
                <Text>Total Classes - {this.state.total_class}</Text>
                <Text>Average Attendance - {this.state.percentage}%</Text>
            </View>
            <View style={{backgroundColor:'#dcdcdc'}}>
            <ListItem style={{flexDirection:'row', width: '100%', flex:8}} >
                <Text style={{flex:4, fontWeight:'bold'}}>Student Name</Text>
                <Text style={{flex:2, fontWeight:'bold'}}>Attendance</Text>
                <Text style={{flex:2, fontWeight:'bold'}}></Text>
            </ListItem>
            </View>
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