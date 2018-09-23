import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "react-native-firebase";

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  async onSignOut() {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace("Splash");
    } catch (error) {
      console.warn(error.message);
    }
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button onPress={this.onSignOut} title="Cerrar sesión" />
      </View>
    );
  }
}
