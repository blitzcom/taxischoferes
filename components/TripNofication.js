/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, Button, Text, Title, ImageBackground } from "@shoutem/ui";

type Props = {
  onAccept: () => void,
  onReject: () => void,
  trip: any
};

export default class TripNotification extends Component<Props> {
  render() {
    const { trip } = this.props;

    return (
      <View
        style={{
          alignItems: "center",
          height: "100%",
          position: "absolute",
          width: "100%"
        }}
      >
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/notification_background.png")}
        >
          <Title
            styleName="secondary"
            style={{ paddingTop: 32, paddingBottom: 20, color: "#eaeaea" }}
          >
            NUEVO PASAJERO
          </Title>

          <Text style={{ color: "#eaeaea", paddingBottom: 280 }}>
            {trip.passenger.name}
          </Text>

          <Text style={{ marginBottom: 32, color: "#eaeaea" }}>
            #PASSENGER_ADDRESS
          </Text>

          <View styleName="horizontal">
            <Button styleName="confirmation">
              <Text>ACEPTAR</Text>
            </Button>

            <Button
              styleName="confirmation secondary"
              onPress={() => this.setState({ available: false })}
            >
              <Text>RECHAZAR</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

TripNotification.defaultProps = {
  onAccept: () => {},
  onReject: () => {},
  trip: null
};
