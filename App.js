import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/LoginScreen';
import StoreFrontScreen from './src/StoreFrontScreen';

const RootStack = StackNavigator({
  login: {
    screen: LoginScreen
  },
  storeFront: {
    screen: StoreFrontScreen
  }
});

export default App = () => <RootStack />;
