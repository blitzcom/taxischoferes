/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import { View } from "@shoutem/ui";

import Map from "../components/Map";
import TripNotification from "../components/TripNofication";

type Props = {
  navigation: any
};

export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      hasTrip: false,
      tripId: null
    };

    this.onNewTrip = this.onNewTrip.bind(this);
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace("Splash");
    } catch (error) {
      console.warn(error.message);
    }
  };

  onNewTrip(trip) {
    this.setState({ hasTrip: true, tripId: trip });
  }

  onDismiss = () => {
    this.setState({ hasTrip: false, tripId: null });
  };

  render() {
    const { hasTrip, tripId } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
        <Map onNewTrip={this.onNewTrip} />
        {hasTrip && (
          <TripNotification tripId={tripId} onDismiss={this.onDismiss} />
        )}
      </View>
    );
  }
}
