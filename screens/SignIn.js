/**
 * @format
 * @flow
 */

import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import React, { Component, Fragment } from "react";
import type { NavigationScreenProps } from "react-navigation";
import {
  View,
  Caption,
  Text,
  Title,
  Subtitle,
  Button,
  TextInput,
  FormGroup,
  Spinner
} from "@shoutem/ui";

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

  asyncState = (state: any) => {
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
        <View style={{ width: "80%" }}>
          <Title styleName="h-center" style={{ marginBottom: 2 }}>
            ¡HEY! TAXI
          </Title>

          <Caption styleName="h-center" style={{ marginBottom: 40 }}>
            Conductores
          </Caption>

          {isSending ? (
            <Spinner />
          ) : (
            <Fragment>
              <Text styleName="h-center" style={{ marginBottom: 18 }}>
                Accede a tu cuenta. Si aún no tienes, se creará automáticamente.
              </Text>

              <FormGroup>
                <Caption>EMAIL</Caption>
                <TextInput
                  onChangeText={email => this.setState({ email })}
                  placeholder="example@mail.com"
                  editable={!isSending}
                  keyboardType="email-address"
                  style={{ marginBottom: 45 }}
                />
              </FormGroup>

              <Button disabled={emailIsEmpty} onPress={this.onLogin}>
                <Text>Iniciar sesión</Text>
              </Button>
            </Fragment>
          )}
        </View>
      </View>
    );
  }
}
