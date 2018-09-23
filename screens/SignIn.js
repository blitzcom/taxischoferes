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

type State = {
  email: string,
  password: string
};

export default class SignIn extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onLogin = async () => {
    try {
      const user = await firebase
        .auth()
        .signInAndRetrieveDataWithEmailAndPassword(
          this.state.email,
          this.state.password
        );

      this.props.navigation.replace("Home");
    } catch (error) {
      console.warn(error.message);
    }
  };

  onSignUp = () => {
    this.props.navigation.push("SignUp");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "60%" }}>
          <Text>Correo electrónico</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            style={{ height: 40 }}
            placeholder="example@mail.com"
          />

          <Text>Password</Text>
          <TextInput
            onChangeText={password => this.setState({ password })}
            style={{ height: 40, marginBottom: 40 }}
          />

          <Button onPress={this.onLogin} title="Iniciar sesión" />

          <Button onPress={this.onSignUp} title="Crear Cuenta" />
        </View>
      </View>
    );
  }
}
