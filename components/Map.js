/**
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import { View, Text, Switch, Spinner } from "@shoutem/ui";
import MapView, { Marker } from "react-native-maps";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      available: false,
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

  render() {
    const { latitude, longitude } = this.state;
    const hasPosition = latitude !== null && longitude !== null;

    return (
      <Fragment>
        <View
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#eaeaea",
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
      </Fragment>
    );
  }
}
