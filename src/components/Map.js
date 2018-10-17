// @flow
import React, { Component, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert } from 'react-native';
import { Spinner, View } from '@shoutem/ui';

import { googleMapsStyle } from '../maps';

type Props = {
  onNewTrip: (data: any) => void,
  selfCoords: null | Object,
};

type State = {
  hasRegion: boolean,
  region: Object,
};

export default class Map extends Component<Props, State> {
  state: State = {
    hasRegion: false,
    region: {
      latitude: null,
      latitudeDelta: 0.004,
      longitude: null,
      longitudeDelta: 0.004,
    },
  };

  componentDidMount() {
    this.loadCurrentPosition();
  }

  syncSetState = (nextState: Object) => {
    return new Promise((resolve) => {
      this.setState((nextState: Object), resolve);
    });
  };

  getCurrentPosition = (options: Object = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  loadCurrentPosition = async () => {
    try {
      const position = await this.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 25000,
        maximumAge: 1000,
      });

      await this.syncSetState({
        hasRegion: true,
        region: Object.assign({}, this.state.region, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      });
    } catch (error) {
      this.alertMissingGPS();
    }
  };

  alertMissingGPS = () => {
    Alert.alert(
      'Hay un problema con el GPS',
      'Verifica que el GPS de tu dispositivo se encuentra encendido y funciona correctamente.',
      [{ text: 'REINTENTAR', onPress: this.loadCurrentPosition }],
      { cancelable: false }
    );
  };

  render() {
    const { region, hasRegion } = this.state;
    const { selfCoords } = this.props;

    return (
      <Fragment>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {hasRegion ? (
            <MapView
              customMapStyle={googleMapsStyle}
              style={{ height: '100%' }}
              showsPointsOfInterest={false}
              showsTraffic={false}
              showsIndoors={false}
              initialRegion={region}
            >
              {selfCoords && <Marker coordinate={selfCoords} />}
            </MapView>
          ) : (
            <Spinner />
          )}
        </View>
      </Fragment>
    );
  }
}
