/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import type { NavigationScreenProps } from "react-navigation";
import { View, Button, Text, Switch, Title, Spinner } from "@shoutem/ui";
import MapView, { Marker } from "react-native-maps";

type Props = {
  navigation: NavigationScreenProps<*>
};

type State = {
  available: boolean,
  latitude: number,
  longitude: number,
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
      passenger: false,
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      error => console.warn(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
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
    const { latitude, longitude } = this.state;
    const hasPosition = latitude !== null && longitude !== null;

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

        <View style={{ flex: 1, justifyContent: "center" }}>
          {hasPosition ? (
            <MapView
              style={{ height: "100%" }}
              region={{
                latitude: latitude,
                latitudeDelta: 0.003,
                longitude: longitude,
                longitudeDelta: 0.003
              }}
            >
              <Marker coordinate={{ latitude, longitude }} />
            </MapView>
          ) : (
            <Spinner />
          )}
        </View>

        {this.state.passenger && (
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              height: "100%",
              paddingLeft: 12,
              paddingRight: 12,
              position: "absolute",
              width: "100%"
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
