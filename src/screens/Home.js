import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from '@shoutem/ui';

import Map from '../components/Map';
import Machine from '../trips/Machine';
import TripListener from '../components/TripListener';
import LocationTracker from '../components/LocationTracker';

type Props = {
  navigation: any,
};

export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      tripId: null,
      origin: null,
      destiny: null,
      uid: firebase.auth().currentUser.uid,
    };

    this.onNewTrip = this.onNewTrip.bind(this);
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace('Splash');
    } catch (error) {
      console.warn(error.message);
    }
  };

  onNewTrip(trip) {
    this.setState({ tripId: trip });
  }

  onDismiss = () => {
    this.setState({ tripId: null });
  };

  render() {
    const { tripId, origin, destiny, uid } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
        <TripListener onNewTrip={this.onNewTrip} />
        <LocationTracker userId={uid} />
        <Map onNewTrip={this.onNewTrip} origin={origin} destiny={destiny} />
        {tripId && (
          <Machine
            dismiss={this.onDismiss}
            read={`tripsByDrivers/${uid}/${tripId}`}
            write={`trips/${tripId}`}
          />
        )}
      </View>
    );
  }
}
