import React, { Component } from 'react';
import { Button, Text } from '@shoutem/ui';

type Props = {
  changeState: () => void,
  dismiss: () => void,
};

class Finalized extends Component<Props> {
  changeState = () => {
    this.props.dismiss();
  };

  render() {
    return (
      <Button onPress={this.changeState} styleName="secondary">
        <Text>CERRAR</Text>
      </Button>
    );
  }
}

export default Finalized;
