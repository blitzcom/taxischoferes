/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { View, Text, Button } from "react-native";

type Props = {
  navigation: NavigationScreenProps<*>
};

export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace("Splash");
    } catch (error) {
      console.warn(error.message);
    }
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button onPress={this.onSignOut} title="Cerrar sesión" />
      </View>
    );
  }
}
