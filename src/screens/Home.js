/**
 * @format
 * @flow
 */
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View } from '@shoutem/ui';

import Map from '../components/Map';
import Machine from '../trips/Machine';

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
    const { tripId, origin, destiny } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
        <Map onNewTrip={this.onNewTrip} origin={origin} destiny={destiny} />
        {tripId && (
          <Machine path={`trips/${tripId}`} dismiss={this.onDismiss} />
        )}
      </View>
    );
  }
}
