/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import MapView from "react-native-maps";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin() {
    console.warn("login in with facebook");

    const result = await LoginManager.logInWithReadPermissions([
      "public_profile"
    ]);

    if (result.isCancelled) {
      return console.warn("cancelado");
    }

    if (result.error) {
      return console.error("Error al iniciar login");
    }

    const token = AccessToken.getCurrentAccessToken();

    console.log("Facebook token: ", token);

    // .then(data => {
    //   const token = data.accessToken.toString();

    //   var credencial = firebase.auth.FacebookAuthProvider.credential(token);

    //   return firebase
    //     .auth()
    //     .signInAndRetrieveDataWithCredential(credencial)
    //     .then(user => {
    //       firebase
    //         .database()
    //         .ref()
    //         .child("passengers")
    //         .once("value")
    //         .then(snapshot => {
    //           if (user.user.uid !== snapshot.val()) {
    //             const userRef = firebase
    //               .database()
    //               .ref()
    //               .child(`passengers/${user.user.uid}`);

    //             return userRef.set({
    //               email: user.user.email,
    //               name: user.user.displayName,
    //               photo: user.user.photoURL,
    //               id: user.user.uid
    //             });
    //           }
    //         });
    //       this.props.navigation.navigate("Home", {
    //         userId: user.user.uid,
    //         name: user.user.displayName
    //       });
    //     });
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.onLogin} title="Facebook" />
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
