import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Arrived extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'boarded' });
  };

  render() {
    return (
      <View>
        <Text>Arrived state</Text>
        <Button onPress={this.changeState} styleName="secondary">
          <Text>PASAJERO A BORDO</Text>
        </Button>
      </View>
    );
  }
}

export default Arrived;
