/**
 * @format
 * @flow
 */

import { AsyncStorage, Button, Text, View, TextInput } from "react-native";
import firebase from "react-native-firebase";
import React, { Component } from "react";
import type { NavigationScreenProps } from "react-navigation";

type Props = {
  navigation: NavigationScreenProps<*>
};

type State = {
  email: string,
  isSending: boolean
};

export default class SignIn extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      isSending: false
    };
  }

  asyncState = state => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  onLogin = async () => {
    const { email } = this.state;

    try {
      await this.asyncState({ isSending: true });

      await firebase.auth().sendSignInLinkToEmail(email, {
        url: "https://jupiter-9b937.firebaseapp.com",
        iOS: {
          bundleId: "com.taxischoferes"
        },
        android: {
          packageName: "com.taxischoferes",
          installApp: true,
          minimumVersion: "1"
        },
        handleCodeInApp: true
      });

      await AsyncStorage.setItem("emailForSignIn", email);

      await this.asyncState({ isSending: false });

      this.props.navigation.replace("SignUp");
    } catch (error) {
      console.warn(error.message);
    }
  };

  render() {
    const { isSending, email } = this.state;
    const emailIsEmpty = email.length === 0;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "60%" }}>
          <Text>Correo electrónico</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            style={{ height: 40 }}
            placeholder="example@mail.com"
            editable={!isSending}
            keyboardType="email-address"
          />

          <Button
            disabled={emailIsEmpty}
            onPress={this.onLogin}
            title="Iniciar sesión"
          />

          {isSending && <Text>Enviando</Text>}
        </View>
      </View>
    );
  }
}
