import React, { Component } from 'react';
import {createDrawerNavigator, createStackNavigator, createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import Home from './home';
import messageCreater from './messageCreater';
import MessageRecepients from './messageRecepients';
import batchListAttendance from './batchListAttendance';
import takeAttendance from './takeAttendance';
import attendanceReportSelector from './attendanceReportSelector';
import chatScreen from './chatScreen';
import attendanceReport from './attendanceReport';
import studentDetails from './studentDetails';
import admin from './admin';
import manageBatch from './manageBatch';
import addBatch from './addBatch';
import authCheck from './authCheck';
import Login from './Login';
import newChat from './newChat';


export const messageStack = createStackNavigator({
  "New Channel": { screen: newChat},
  MessageRecepients: {screen: MessageRecepients},
  chatScreen: {screen: chatScreen}
}, {
  initialRouteName: 'MessageRecepients',
})

export const adminStack = createStackNavigator({
  adminHome: { screen: admin},
  manageBatch: {screen: manageBatch},
  addBatch: {screen: addBatch}
}, {
  initialRouteName: 'adminHome',
})

export const newAttendance = createStackNavigator({
  batchList: { screen: batchListAttendance},
  takeAttendance: { screen: takeAttendance},
  studentDetails: { screen: studentDetails }
}, {
  initialRouteName: 'batchList',
  headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
          header: null
      }
})

export const attendanceReports = createStackNavigator({
  Selector: { screen: attendanceReportSelector},
  Report: { screen: attendanceReport},
  studentDetails: { screen: studentDetails }
}, {
  initialRouteName: 'Selector',
  headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
          header: null
      }
})

export const attendanceStack = createMaterialTopTabNavigator({
  "New Attendance": { screen: newAttendance},
  "Attendance Report": {screen: attendanceReports},
}, {
  initialRouteName: 'New Attendance',
})

export const HomeStack = createStackNavigator({
    Home: { screen: Home },
    Message: { screen: messageStack},
    Attendance: {screen: attendanceStack},
    Admin: {screen: adminStack}
  }, {
    initialRouteName: 'Home',
    headerMode: 'none',
      navigationOptions: {
          headerVisible: false,
          header: null
      }
  })

export const Authstack = createSwitchNavigator({
  Login: {screen: Login},
  authCheck: {screen: authCheck},
  HomeStack: {screen: HomeStack}
}, {
  lazy: true,
  initialRouteName: 'authCheck',
})

const AuthFlowContainer = createAppContainer(Authstack);
export default AuthFlowContainer;
