import React, { Component } from 'react';
import { Button, Text } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Traveling extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'finalized' });
  };

  render() {
    return (
      <Button onPress={this.changeState} styleName="secondary">
        <Text>FINALIZAR VIAJE</Text>
      </Button>
    );
  }
}

export default Traveling;
