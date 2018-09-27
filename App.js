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
import Taxi from "./screens/Taxi";
import VehicleForm from "./screens/forms/Vehicle";

const Router = createStackNavigator({
  Splash: Splash,
  SignIn: SignIn,
  SignUp: SignUp,
  Home: Home,
  Taxi: Taxi,
  VehicleForm: VehicleForm
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Router />;
  }
}
