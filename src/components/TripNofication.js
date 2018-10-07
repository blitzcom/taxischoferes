/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import {
  View,
  Button,
  Text,
  Title,
  ImageBackground,
  Spinner
} from "@shoutem/ui";

type Props = {
  onAccept: () => void,
  onReject: () => void,
  trip: any
};

export default class TripNotification extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      state: "pending",
      isLoading: true
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    this.tripRef = firebase
      .database()
      .ref(`tripsByDrivers/${uid}/${this.props.tripId}`);

    this.tripSubscription = this.tripRef.on("value", this.onChangeValue);
  }

  onChangeValue = snap => {
    this.setState(
      Object.assign({}, this.state, snap.val(), { isLoading: false })
    );
  };

  componentWillUnmount() {
    this.tripRef.off("value", this.tripSubscription);
  }

  componentDidUpdate() {
    if (this.state.state === "cancel") {
      this.props.onDismiss();
    }
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <View
          style={{
            alignItems: "center",
            height: "100%",
            position: "absolute",
            width: "100%",
            backgroundColor: "black"
          }}
        >
          <Spinner />
        </View>
      );
    }

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
          source={require("../../assets/notification_background.png")}
        >
          <Title
            styleName="secondary"
            style={{ paddingTop: 32, paddingBottom: 20, color: "#eaeaea" }}
          >
            NUEVO PASAJERO
          </Title>

          <Text style={{ color: "#eaeaea", paddingBottom: 280 }} />

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
  trip: null,
  onDismiss: () => {}
};
