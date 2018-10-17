import React, { Component } from 'react';
import { Button, Text } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Arrived extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'boarded' });
  };

  render() {
    return (
      <Button onPress={this.changeState} styleName="secondary">
        <Text>PASAJERO A BORDO</Text>
      </Button>
    );
  }
}

export default Arrived;
