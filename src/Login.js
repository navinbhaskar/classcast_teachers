import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  Input,
  Button
} from 'react-native';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';
import axios from "axios";



UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const brandColor = '#744BAC';
const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 20;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: true,
      email: '',
      password: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

   handleEmail = (text) => {
      this.setState({ email: text+'@gmail.com' })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('HomeStack'))
      .catch(error => {
        this.setState({ errorMessage: error.message });
        console.log(error)
    })
  }
  
  render() {
    const {
      isLoading,
      selectedType,
      phone,
      phoneLogin,
      phoneValid,
      username,
      usernameValid,
      isModalVisible,
      verificationId
    } = this.state;

    let textStyle = this.state.enterCode ? {
      height: .2 * SCREEN_HEIGHT,
      textAlign: 'center',
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'Courier'
    } : {};

    return (
      <ScrollView style={{backgroundColor: '#fef6e8'}}
        contentContainerStyle ={{backgroundColor: '#fef6e8'}}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled">
          <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => 
                this.handleSignUp()
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
});