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
import Video from "react-native-video";


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
      .then(() => {
        let jwtToken = firebase.auth().onAuthStateChanged(user => {
            if (user) {
              user.getIdToken().then(idToken => {
                  console.log("nsajaskfif: "+idToken);
                  axios.defaults.headers.common['Authorization'] = idToken;
              })
            }
          });
        this.props.navigation.navigate('HomeStack');
      })
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
      <View>

      <Video
        source={require("./Unicornsandhorses.mp4")}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
        />

      <ScrollView 
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled">
          <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "white"
               inputStyle={styles.inputStyle}
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "white"
               autoCapitalize = "none"
               secureTextEntry = {true}
               onChangeText = {this.handlePassword}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => 
                this.handleSignUp()
               }>
               <Text style = {styles.submitButtonText}> Get Started </Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
   container: {
      marginTop: 0.5 * SCREEN_HEIGHT
   },
   input: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 0.04 * SCREEN_WIDTH,
      color: 'white',
      textAlign: 'center',
      alignSelf:'center',
      borderRadius: 0.2 * SCREEN_WIDTH,
      width: '70%',
      marginTop: 0.05 * SCREEN_HEIGHT,
      height: 0.07 * SCREEN_HEIGHT,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
   },
   submitButton: {
      backgroundColor: '#fa6432',
      alignSelf:'center',
      borderRadius: 0.2 * SCREEN_WIDTH,
      width: '70%',
      marginTop: 0.05 * SCREEN_HEIGHT,
      height: 0.07 * SCREEN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
   },
   submitButtonText:{
    fontFamily: 'Montserrat-Bold',
      color: 'white',
      textAlign: 'center',
      alignItems: 'center'
   },
   backgroundVideo: {
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'light',
    color: 'white',
   fontSize: 0.03 * SCREEN_WIDTH,
   
  },
});