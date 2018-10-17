import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from '@shoutem/ui';

import Map from '../components/Map';
import Machine from '../trips/Machine';
import TripListener from '../components/TripListener';
import LocationTracker from '../components/LocationTracker';

type Props = {
  navigation: any;
};

type State = {
  destiny: null | Object;
  isAvailable: boolean;
  origin: null | Object;
  tripId: null | string;
  selfCoords: null | Object;
  uid: string;
};

export default class Home extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    super(props);

    const user = firebase.auth().currentUser;

    if (user === null) {
      throw new Error('CurrentUser is null in Home.');
    }

    this.state = {
      destiny: null,
      isAvailable: false,
      origin: null,
      tripId: null,
      selfCoords: null,
      uid: user.uid,
    };
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace('Splash');
    } catch (error) {
      console.warn(error.message);
    }
  };

  onNewTrip = (trip: string) => {
    this.setState({ tripId: trip });
  };

  onDismiss = () => {
    this.setState({ tripId: null });
  };

  onChangeAvailability = (isAvailable: boolean) => {
    this.setState({ isAvailable });
  };

  onCoordsChanged = (selfCoords: Object) => {
    this.setState({ selfCoords });
  };

  render() {
    const { tripId, uid, isAvailable, selfCoords } = this.state;
    

    return (
      <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
        <TripListener
          onNewTrip={this.onNewTrip}
          onChangeAvailability={this.onChangeAvailability}
        />

        {isAvailable && (
          <LocationTracker
            userId={uid}
            onCoordsChanged={this.onCoordsChanged}
          />
        )}

        <Map onNewTrip={this.onNewTrip} selfCoords={selfCoords} />
        {tripId && (
          <Machine
            dismiss={this.onDismiss}
            read={`trips/${tripId}`}
            write={`trips/${tripId}`}
          />
        )}
      </View>
    );
  }
}
