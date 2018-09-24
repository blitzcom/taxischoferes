/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { Button, Text, View, TextInput } from "react-native";

type Props = {
  navigation: NavigationScreenProps<*>
};

export default class SignUp extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  onRetry = () => {
    this.props.navigation.replace("SignIn");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "60%" }}>
          <Text>Revisa tu correo!</Text>

          <Button onPress={this.onRetry} title="Volver a intentar!" />
        </View>
      </View>
    );
  }
}
