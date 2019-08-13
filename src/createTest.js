import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, H1, Icon, H3, Footer , ListItem, Input} from 'native-base';
import {View, Image, FlatList, TouchableNativeFeedback, ScrollView, StyleSheet, Dimensions, LayoutAnimation, TextInput, Picker, ToastAndroid } from 'react-native';
import axios from "axios";
import {NavigationActions} from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const USER_STUDENT = require('./images/user-student.png');
const USER_HP = require('./images/user-hp.png');


export default class createTest extends Component {

  static navigationOptions = {
      header: null,
      };
  constructor(props) {
      super(props);
      
      this.submitData = this.submitData.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.state = {
        testData: [],
        selectedClassIndex: 0,
        selectedGoalIndex: 0,
        selectedSubjectIndex: 0
      }
  }

  componentDidMount() {
    axios.get(`https://classcast-198812.appspot.com/teachersapp/exams_list`)
        .then(function (response){
            console.log("abcd: "+JSON.stringify(response.data));
            this.setState({testData: response.data});
        }.bind(this))
        .catch(function (error) {
            console.log('error');
        });
  }

  submitData() {
    
    const navigateAction = NavigationActions.navigate({
                routeName: 'topic',
                params: {
                  class: this.state.testData[this.state.selectedClassIndex].standard,
                  goal: this.state.testData[this.state.selectedClassIndex].data[this.state.selectedGoalIndex].name,
                  subject: this.state.testData[this.state.selectedClassIndex].data[this.state.selectedGoalIndex].package[this.state.selectedSubjectIndex].name,
                  duration: 15
                }
              });
    this.props.navigation.dispatch(navigateAction);
  }


  renderItem = ({item}) => {
    console.log("itemdata: "+JSON.stringify(item));
    if(item.fields.standard == this.state.standard){
      return (
        <TouchableNativeFeedback
        onPress={()=> {
          this.setState({batch_id: item.fields.batch_id});
          this.setState({batchSelected: true});
        }}>
        <View style={[
          {height: 0.05 * SCREEN_HEIGHT, borderRadius: 0.1 * SCREEN_WIDTH, borderColor: 'white', opacity: 0.6, borderWidth: 0.005 * SCREEN_WIDTH, margin: 0.01*SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center'},
          this.state.batch_id==item.fields.batch_id && { backgroundColor: 'rgba(110, 120, 170, 1)', opacity: 1},
        ]}>
            <Text style={{color: 'white', margin: 0.02 * SCREEN_WIDTH}}>{item.fields.batch_id}</Text>
          </View>
        </TouchableNativeFeedback>
      )
    }
    else {
      return (
        <View>
        </View>
        )
    }
  }
  

  render() {

    const { selectedClassesIndex, selectedStreamIndex, name, gender, username, usernameValid, standard } = this.state
    console.log("gender: "+this.state.gender)
    return (
      <View style={{backgroundColor: '#293046', height: '100%'}}>
        <ScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <Text style={styles.h2}> Create Test</Text>
          <Text style={[styles.classContainerText,{marginBottom: 0.02 * SCREEN_HEIGHT}]}>Select Class</Text>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
            {
              this.state.testData && this.state.testData.map((blocks, index)=>{        
                return(
                  <TouchableNativeFeedback
                    onPress={()=>this.setState({selectedClassIndex: index})}
                  >
                    <View style = {[styles.classContainer, {backgroundColor: this.state.selectedClassIndex==index ? 'rgba(110, 120, 170, 1)': '#293046'}]}>
                      <Text style={styles.classContainerText}>{blocks.standard}</Text>      
                    </View>
                  </TouchableNativeFeedback>
                )
              })
            }
          </View>


          <Text style={[styles.classContainerText,{marginBottom: 0.02 * SCREEN_HEIGHT, marginTop: 0.04 * SCREEN_HEIGHT}]}>Select Goal</Text>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.state.testData.length > 0 &&
              this.state.testData[this.state.selectedClassIndex].data && this.state.testData[this.state.selectedClassIndex].data.map((blocks, index)=>{        
                return(
                  <TouchableNativeFeedback
                    onPress={()=>this.setState({selectedGoalIndex: index})}
                  >
                    <View style = {[styles.classContainer, {backgroundColor: this.state.selectedGoalIndex==index ? 'rgba(110, 120, 170, 1)': '#293046'}]}>
                      <Text style={styles.classContainerText}>{blocks.name}</Text>      
                    </View>
                  </TouchableNativeFeedback>
                )
              })
            }
          </View>

          <Text style={[styles.classContainerText,{marginBottom: 0.02 * SCREEN_HEIGHT, marginTop: 0.04 * SCREEN_HEIGHT}]}>Select Subject</Text>
          <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
            { this.state.testData.length > 0 &&
              this.state.testData[this.state.selectedClassIndex].data[this.state.selectedGoalIndex].package && this.state.testData[this.state.selectedClassIndex].data[this.state.selectedGoalIndex].package.map((blocks, index)=>{        
                return(
                  <TouchableNativeFeedback
                    onPress={()=>this.setState({selectedSubjectIndex: index})}
                  >
                    <View style = {[styles.classContainer, {backgroundColor: this.state.selectedSubjectIndex==index ? 'rgba(110, 120, 170, 1)': '#293046'}]}>
                      <Text style={styles.classContainerText}>{blocks.name}</Text>      
                    </View>
                  </TouchableNativeFeedback>
                )
              })
            }
          </View>

        </ScrollView>
        <TouchableNativeFeedback
               onPress={() => {
                this.submitData()
              }}
            >
              <View style={styles.nextButton}>
                <Text style={{fontFamily: 'Montserrat-SemiBold', fontSize: 0.04 * SCREEN_WIDTH, color: 'white'}}>Continue</Text>
              </View>
            </TouchableNativeFeedback>
      </View>
    );
  }
}


export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableNativeFeedback {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export const UserClass = props => {
  const { image, label, labelColor, selected,...attributes } = props;
  return (
    <TouchableNativeFeedback {...attributes}>
      <View
        style={[
          styles.userClassItemContainer,
          selected && styles.userClassItemContainerSelected,
        ]}
      >
      <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};


const styles = StyleSheet.create({
  
  container: {
    paddingBottom: 0.1 * SCREEN_HEIGHT,
    paddingTop: 0.05 * SCREEN_HEIGHT,
    backgroundColor: '#293046',
    alignItems: 'center',
  },
   h2: {
    fontFamily: 'Montserrat-Bold',
     fontSize: 0.06 * SCREEN_WIDTH,
    paddingBottom: 0.05 * SCREEN_HEIGHT,
    paddingTop: 0.05 * SCREEN_HEIGHT,
    color: 'white',
  },
   h3: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 20,
    color: 'white',
  },
  flatListContainer: {
    marginTop: 20,
    flex: 1
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  classTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center',
    marginTop: 0.05 * SCREEN_HEIGHT,
  },
  classContainer: {
    borderWidth: 3, 
    borderRadius: 2 * SCREEN_WIDTH, 
    padding: 0.02 * SCREEN_WIDTH, 
    borderColor: '#ffffff',
    marginLeft: 0.02 * SCREEN_WIDTH,
    marginRight: 0.02 * SCREEN_WIDTH
  },
  classContainerText: {
    color: 'white',
    fontSize: 0.04 * SCREEN_WIDTH,
    fontFamily: 'Montserrat-SemiBold'
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userClassItemContainer: {
    height: 0.05 * SCREEN_HEIGHT, 
    width: 0.2 * SCREEN_WIDTH, 
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    borderRadius: 0.1 * SCREEN_WIDTH,
    borderWidth: .005 * SCREEN_WIDTH,
    borderColor: 'white'
  },
  userClassItemContainerSelected: {
    opacity: 1,
    backgroundColor: 'rgba(110, 120, 170, 1)',
  },

  userTypeMugshot: {
    margin: 4,
    height: 80,
    width: 80,
  },
  userTypeMugshotSelected: {
    height: 110,
    width: 110,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  inputStyleName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'light',
    color: '#211482',
   fontSize: 35,
   fontFamily: 'Montserrat-SemiBold',
  },
  nextButton: {
    position: 'absolute',
    height: 0.07 * SCREEN_HEIGHT,
    width: '100%',
    bottom: 0,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7741cd'
  },
});