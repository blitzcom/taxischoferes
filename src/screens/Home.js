/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import { View } from "@shoutem/ui";

import Map from "../components/Map";
import TripNotification from "../components/TripNofication";
import AcceptedTrip from './AcceptedTrip';

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
      tripId: null,
      acceptedTrip: false,
      origin: null,
      destiny: null
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

  onAccept = (tripId, origin, destiny) => {
    this.setState({ hasTrip: false, tripId, acceptedTrip: true, origin, destiny })
  }

  render() {
    const { hasTrip, tripId, acceptedTrip, origin, destiny } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
        <Map onNewTrip={this.onNewTrip} origin={origin} destiny={destiny}/>
        {hasTrip && (
          <TripNotification tripId={tripId} onDismiss={this.onDismiss} onAccept={this.onAccept}/>
        )}
        {acceptedTrip && (
          <AcceptedTrip tripId={tripId}/>
        )}
      </View>
    );
  }
}
