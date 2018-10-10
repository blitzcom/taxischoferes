// @flow
import React, { Component } from 'react';
import firebase, { Reference, DataSnapshot } from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import { Spinner, Switch, Text, View } from '@shoutem/ui';

type Props = {
  onChangeAvailability: (isAvailable: boolean) => void,
  onNewTrip: (key: string) => void,
};

type State = {
  isAvailabilityChanging: boolean,
  isAvailable: boolean,
};

class TripListener extends Component<Props, State> {
  static defaultProps = {
    onChangeAvailability: () => {},
    onNewTrip: () => {},
  };

  onNewTrip: (snapshot: DataSnapshot) => void;
  subscription: Function;
  tripsRef: Reference;

  state = {
    isAvailabilityChanging: false,
    isAvailable: false,
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;

    if (user === null) {
      throw new Error('CurrentUser is null.');
    }

    const uid = user.uid;

    this.tripsRef = firebase
      .database()
      .ref(`tripsByDrivers/${uid}`)
      .orderByChild('state')
      .equalTo('pending')
      .limitToFirst(1);
  }

  componentWillUnmount() {
    this.makeAvailable();
  }

  syncSetState = (nextState: Object) => {
    return new Promise((resolve) => {
      this.setState(nextState, resolve);
    });
  };

  sleep = (milliseconds: number = 1000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  onNewTrip = (snapshot: DataSnapshot) => {
    this.props.onNewTrip(snapshot.key);
  };

  makeAvailable = () => {
    this.subscription = this.tripsRef.on('child_added', this.onNewTrip);
  };

  makeUnavailable = () => {
    this.tripsRef.off('child_added', this.subscription);
  };

  onAvailableChange = async (isAvailable: boolean) => {
    await this.syncSetState({ isAvailable, isAvailabilityChanging: true });

    if (isAvailable) {
      this.makeAvailable();
    } else {
      this.makeUnavailable();
    }

    await this.sleep();
    await this.syncSetState({ isAvailabilityChanging: false });
    await this.props.onChangeAvailability(isAvailable);
  };

  render() {
    const { isAvailable, isAvailabilityChanging } = this.state;
    return (
      <View style={styles.wrapper}>
        <Text styleName="bold">Disponible</Text>

        <View styleName="horizontal v-center">
          {isAvailabilityChanging && <Spinner style={styles.spinner} />}

          <Switch
            value={isAvailable}
            onValueChange={
              isAvailabilityChanging ? () => {} : this.onAvailableChange
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    marginRight: 8,
  },
  wrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eaeaea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
  },
});

export default TripListener;
