/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { Title, View, Button, Text } from "@shoutem/ui";

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
        <View style={{ width: "80%" }}>
          <Title styleName="h-center" style={{ marginBottom: 40 }}>
            ¡HEY! TAXI
          </Title>

          <Text styleName="h-center" style={{ marginBottom: 40 }}>
            Revisa tu correo electrónico. Te enviamos un enlace para que puedas
            acceder a tu cuenta.
          </Text>

          <Button styleName="clear" onPress={this.onRetry}>
            <Text>Volver a intentar</Text>
          </Button>
        </View>
      </View>
    );
  }
}
