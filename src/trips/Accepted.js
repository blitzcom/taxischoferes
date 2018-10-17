import React, { Component } from 'react';
import { Button, Text } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Accepted extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'arrived' });
  };

  render() {
    return (
      <Button onPress={this.changeState} styleName="secondary">
        <Text>LLEGADO AL LUGAR</Text>
      </Button>
    );
  }
}

export default Accepted;
