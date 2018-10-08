/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProp } from "react-navigation";
import { View, Title, Spinner, Caption } from "@shoutem/ui";

type Props = { navigation: NavigationScreenProp<*> };

export default class Splash extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
  }

  asyncState = (state: any) => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  componentDidMount() {
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
