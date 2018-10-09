import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: (nextState: string, data?: Object) => void,
};

class New extends Component<Props> {
  changeState = () => {
    this.props.changeState('listener');
  };

  render() {
    return (
      <View>
        <Text>New State</Text>
        <Button onPress={this.changeState}>
          <Text>Go to listener state</Text>
        </Button>
      </View>
    );
  }
}

export default New;
