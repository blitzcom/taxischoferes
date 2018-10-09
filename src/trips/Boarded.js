import React, { Component } from 'react';
import { Button, Text } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Boarded extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'traveling' });
  };

  render() {
    return (
      <Button onPress={this.changeState} styleName="secondary">
        <Text>INICIAR VIAJE</Text>
      </Button>
    );
  }
}

export default Boarded;
