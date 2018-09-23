/**
 * @format
 * @flow
 */

import { Button, Text, View, TextInput } from "react-native";
import firebase from "react-native-firebase";
import React, { Component } from "react";

export default class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onLogin = this.onLogin.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  async onLogin() {
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
  }

  onSignUp() {
    this.props.navigation.push("SignUp");
  }

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
