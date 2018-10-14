import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity
} from 'react-native';

import { StackNavigator } from  'react-navigation';
//import IOSIcon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../HomeScreen";
import CategoryContentScreen from '../CategoryContentScreen';
import ContentDetailsScreen from '../ContentDetailsScreen';
import LoginScreen from '../LoginScreen';
//import DetailScreen from "./DetailScreen";

const stackNav = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: "Main",
      headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                    {/* <IOSIcon name="ios-menu" size={30} /> */}
                  </TouchableOpacity>
      ),
      headerStyle: { paddingRight: 10, paddingLeft: 15 }
    })
  },
  Login:{
    screen: LoginScreen
  },
  CategoryContent:{
    screen: CategoryContentScreen
  },
  ContentDetails:{
    screen: ContentDetailsScreen
  }

  // Main : {
  //   screen: HomeScreen,
  //   navigationOptions: ({navigation}) => ({
  //     title: "Main",
  //     headerLeft:(<TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
  //                   {/* <IOSIcon name="ios-menu" size={30} /> */}
  //                 </TouchableOpacity>
  //     ),
  //     headerStyle: { paddingRight: 10, paddingLeft: 15 }
  //   })
  // },
  // Detail: {
  //   screen: DetailScreen,
  //   navigationOptions: ({navigation}) => ({
  //     title: "Detail",
  //   })     
  // }
});

export default stackNav;