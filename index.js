/** @format */

import App from './Pages/HomeScreen';
import {name as appName} from './app.json';

import React, { Component } from 'react';
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import SideMenu from './Pages/SideMenu/SideMenu'
import stackNav from './Pages/app/stacknav';


const drawernav = DrawerNavigator({
    Item1: {
        screen: stackNav,
      }
    }, {
      contentComponent: SideMenu,
      drawerWidth: Dimensions.get('window').width - 120,  
  });

AppRegistry.registerComponent(appName, () => drawernav);