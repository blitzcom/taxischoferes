/**
 * @format
 * @flow
 */

import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import React, { Component, Fragment } from "react";
import {
  View,
  Caption,
  Text,
  Title,
  FormGroup
} from "@shoutem/ui";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

type Props = {
  navigation: any
};

type State = {
  isSending: boolean
};

export default class SignIn extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isSending: false
    };

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  asyncState = (state: any) => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  googleLogin = async () => {
    try {
      await this.asyncState({ isSending: true });
      await GoogleSignin.configure();
      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

      await firebase.auth().signInWithCredential(credential);

      await AsyncStorage.setItem("userData", data);
      await this.asyncState({ isSending: false });
      

    } catch (error) {
      console.warn(error);
    }

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  async onAuthStateChanged(user) {
    if (user) {
      const userRef = firebase.database().ref(`drivers/${user.uid}`);
      const docsRef = firebase.database().ref(`docs/${user.uid}`);

      await userRef.set({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: false,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid
      });

      const docsSnap = await docsRef.once("value");
      const docs = docsSnap.val();

      if (docs === null) {
        return this.props.navigation.replace("Taxi");
      }

      return this.props.navigation.replace("Home");
    }

    this.props.navigation.replace("SignIn");
  }

  render() {
    const { isSending } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "80%" }}>
          <Title styleName="h-center" style={{ marginBottom: 2 }}>
            ¡HEY! TAXI
          </Title>

          <Caption styleName="h-center" style={{ marginBottom: 40 }}>
            Conductores
          </Caption>

          <Fragment>
              <Text styleName="h-center" style={{ marginBottom: 18 }}>
                Accede con tu cuenta de google.
              </Text>

              <FormGroup>
                <GoogleSigninButton
                  style={{ width: 280, height: 48 }}
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.googleLogin}
                  disabled={isSending}
                />
              </FormGroup>

            </Fragment>
          
        </View>
      </View>
    );
  }
}
