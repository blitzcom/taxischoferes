import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Traveling extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'finalized' });
  };

  render() {
    return (
      <View>
        <Text>Finalized state</Text>
        <Button onPress={this.changeState} styleName="secondary">
          <Text>FINALIZAR VIAJE</Text>
        </Button>
      </View>
    );
  }
}

export default Traveling;
