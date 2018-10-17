import React, { Component } from 'react';
import { Button, Text, View, ImageBackground, Title } from '@shoutem/ui';
import firebase from 'react-native-firebase';

type Props = {
  changeState: (nextState: any, overwrite?: boolean) => void;
  origin: any;
};

class Pending extends Component<Props> {
  onAccept = () => {
    const user: any = firebase.auth().currentUser;

    const driver = {
      displayName: user.displayName,
      id: user.uid,
    };

    this.props.changeState({ state: 'accepted', driver });
  };

  onCancel = () => {
    this.props.changeState({ state: 'cancel' }, true);
  };

  render() {
    const { origin } = this.props;

    return (
      <View
        style={{
          alignItems: 'center',
          height: '100%',
          position: 'absolute',
          width: '100%',
        }}
      >
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../../assets/notification_background.png')}
        >
          <Title
            styleName="secondary"
            style={{ paddingTop: 32, paddingBottom: 20, color: '#eaeaea' }}
          >
            NUEVO PASAJERO
          </Title>

          <Text style={{ color: '#eaeaea', paddingBottom: 280 }} />

          <Text style={{ marginBottom: 32, color: '#eaeaea' }}>
            {origin.reference}
          </Text>

          <View styleName="horizontal">
            <Button styleName="confirmation" onPress={this.onAccept}>
              <Text>ACEPTAR</Text>
            </Button>

            <Button styleName="confirmation secondary" onPress={this.onCancel}>
              <Text>RECHAZAR</Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Pending;
