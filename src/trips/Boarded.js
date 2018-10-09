import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Boarded extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'traveling' });
  };

  render() {
    return (
      <View>
        <Text>Boarded state</Text>
        <Button onPress={this.changeState} styleName="secondary">
          <Text>INICIAR VIAJE</Text>
        </Button>
      </View>
    );
  }
}

export default Boarded;
