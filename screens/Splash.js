/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProp } from "react-navigation";
import { AsyncStorage } from "react-native";
import { View, Title, Spinner, Caption } from "@shoutem/ui";

type Props = { navigation: NavigationScreenProp<*> };

export default class Splash extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  asyncState = (state: any) => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  async componentDidMount() {
    const link = (await firebase.links().getInitialLink()) || "";

    if (link !== null && firebase.auth().isSignInWithEmailLink(link)) {
      try {
        const email = await AsyncStorage.getItem("emailForSignIn");
        await firebase.auth().signInWithEmailLink(email, link);
        return this.props.navigation.replace("Home");
      } catch (error) {
        console.warn(error);
      }
    }

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
        <View style={{ width: "80%" }}>
          <Title styleName="h-center" style={{ marginBottom: 2 }}>
            ¡HEY! TAXI
          </Title>

          <Caption styleName="h-center" style={{ marginBottom: 40 }}>
            Conductores
          </Caption>

          <Spinner />
        </View>
      </View>
    );
  }
}
