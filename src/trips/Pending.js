import React, { Component } from 'react';
import { Button, Text, View, ImageBackground, Title } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Pending extends Component<Props> {
  onAccept = () => {
    this.props.changeState({ state: 'accepted' });
  };

  onCancel = () => {
    this.props.changeState({ state: 'cancel' });
  };

  render() {
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
            #PASSENGER_ADDRESS
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
