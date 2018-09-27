/**
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import { View, Text, Switch, Spinner } from "@shoutem/ui";
import MapView, { Marker } from "react-native-maps";
import firebase from "react-native-firebase";

import { googleMapsStyle } from "../maps";

type Props = {
  onNewTrip: (data: any) => void
};

export default class Map extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAvailabilityChanging: false,
      isAvailable: false,
      hasRegion: false,
      region: {
        latitude: null,
        latitudeDelta: 0.004,
        longitude: null,
        longitudeDelta: 0.004
      }
    };

    this.onAvailableChange = this.onAvailableChange.bind(this);
    this.onNewTrip = this.onNewTrip.bind(this);
  }

  componentDidMount() {
    this.tripsRef = firebase
      .database()
      .ref(`tripsByDrivers/${firebase.auth().currentUser.uid}`)
      .orderByChild("state")
      .equalTo("pending")
      .limitToFirst(1);

    navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          hasRegion: true,
          region: Object.assign({}, this.state.region, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        }),
      error => console.warn(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnmount() {
    if (this.tripsRef) {
      this.tripsRef.off("child_added", this.onNewTrip);
    }
  }

  syncSetState = nextState => {
    return new Promise(resolve => {
      this.setState(nextState, resolve);
    });
  };

  onNewTrip(data) {
    this.props.onNewTrip(data.val());
  }

  makeAvailable() {
    this.tripsRef.on("child_added", this.onNewTrip);
  }

  makeUnavailable() {
    this.tripsRef.off("child_added", this.onNewTrip);
  }

  async onAvailableChange(isAvailable) {
    await this.syncSetState({ isAvailable, isAvailabilityChanging: true });

    if (isAvailable) {
      this.makeAvailable();
    } else {
      this.makeUnavailable();
    }

    await this.syncSetState({ isAvailabilityChanging: false });
  }

  render() {
    const {
      region,
      isAvailable,
      isAvailabilityChanging,
      hasRegion
    } = this.state;

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

          <View styleName="horizontal v-center">
            {isAvailabilityChanging && <Spinner style={{ marginRight: 8 }} />}

            <Switch
              value={isAvailable}
              onValueChange={
                isAvailabilityChanging ? () => {} : this.onAvailableChange
              }
            />
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          {hasRegion ? (
            <MapView
              customMapStyle={googleMapsStyle}
              style={{ height: "100%" }}
              showsPointsOfInterest={false}
              showsTraffic={false}
              showsIndoors={false}
              region={region}
            >
              <Marker tracksViewChanges={false} coordinate={region} />
            </MapView>
          ) : (
            <Spinner />
          )}
        </View>
      </Fragment>
    );
  }
}

Map.defaultProps = {
  onNewTrip: () => {}
};
