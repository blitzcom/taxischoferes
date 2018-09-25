/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { View, Button, Text, Switch, Title } from "@shoutem/ui";
import MapView from "react-native-maps";

type Props = {
  navigation: NavigationScreenProps<*>
};

type State = {
  available: boolean,
  passenger: boolean
};

export default class Home extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      available: false,
      passenger: false
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
      <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
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

        {this.state.passenger && (
          <View
            style={{
              backgroundColor: "white",
              height: "100%",
              position: "absolute",
              alignItems: "center",
              width: "100%",
              paddingLeft: 12,
              paddingRight: 12
            }}
          >
            <Title style={{ paddingTop: 32, paddingBottom: 300 }}>
              NUEVO PASAJERO
            </Title>

            <Text style={{ marginBottom: 32 }}>#PASSENGER_ADDRESS</Text>

            <View styleName="horizontal">
              <Button styleName="secondary confirmation">
                <Text>Aceptar</Text>
              </Button>

              <Button
                styleName="confirmation"
                style={{ borderColor: "#eaeaea" }}
              >
                <Text>Rechazar</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}
