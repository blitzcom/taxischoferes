import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";

import Home from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import Splash from "./src/screens/Splash";
import Taxi from "./src/screens/Taxi";
import VehicleForm from "./src/screens/forms/Vehicle";
import LicenseForm from "./src/screens/forms/License";
import PermissionForm from "./src/screens/forms/Permission";
import InsuranceForm from "./src/screens/forms/Insurance";

const Router = createStackNavigator({
  Splash: Splash,
  SignIn: SignIn,
  Home: Home,
  Taxi: Taxi,
  VehicleForm: VehicleForm,
  LicenseForm: LicenseForm,
  PermissionForm: PermissionForm,
  InsuranceForm: InsuranceForm,
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <Router />;
  }
}
