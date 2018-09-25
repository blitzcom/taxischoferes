/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { View } from "react-native";
import { Button, Text, Switch } from "@shoutem/ui";
import MapView from "react-native-maps";

type Props = {
  navigation: NavigationScreenProps<*>
};

type State = {
  available: false
};

export default class Home extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      available: false
    };
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace("Splash");
    } catch (error) {
      console.warn(error.message);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 8,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 8
          }}
        >
          <Text styleName="bold">Disponible</Text>
          <Switch
            value={this.state.available}
            onValueChange={available => this.setState({ available })}
          />
        </View>

        <View style={{ flex: 1 }}>
          <MapView
            style={{ height: "100%" }}
            region={{
              latitude: 37.78825,
              latitudeDelta: 0.015,
              longitude: -122.4324,
              longitudeDelta: 0.0121
            }}
          />
        </View>
      </View>
    );
  }
}
