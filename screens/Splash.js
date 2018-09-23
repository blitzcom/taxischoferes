/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProp } from "react-navigation";
import { View, Text } from "react-native";

type Props = { navigation: NavigationScreenProp<*> };

export default class Splash extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.replace("Home");
        return;
      }

      this.props.navigation.replace("SignIn");
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Splash Screen</Text>
      </View>
    );
  }
}
