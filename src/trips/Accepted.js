import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Accepted extends Component<Props> {
  changeState = () => {
    this.props.changeState({ state: 'arrived' });
  };

  render() {
    return (
      <View>
        <Text>Accepted state</Text>
        <Button onPress={this.changeState} styleName="secondary">
          <Text>LLEGADO AL LUGAR</Text>
        </Button>
      </View>
    );
  }
}

export default Accepted;
