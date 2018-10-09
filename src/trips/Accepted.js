import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Accepted extends Component<Props> {
  changeState = () => {
    this.props.changeState({ currentState: 'listener' });
  };

  render() {
    return (
      <View>
        <Text>Cancel state</Text>
        <Button onPress={this.changeState}>
          <Text>Go to listener state</Text>
        </Button>
      </View>
    );
  }
}

export default Accepted;
