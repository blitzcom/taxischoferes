/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";

import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Splash from "./screens/Splash";

const Router = createStackNavigator({
  Splash: Splash,
  SignIn: SignIn,
  SignUp: SignUp,
  Home: Home
});

export default class App extends Component {
  render() {
    return <Router />;
  }
}
