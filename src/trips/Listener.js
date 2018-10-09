// @flow
import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

import type { ChangeStateFunc } from '../components/StateMachine';

type Props = {
  changeState: ChangeStateFunc,
};

class Listener extends Component<Props> {
  changeState = () => {
    this.props.changeState({ currentState: 'new' });
  };

  render() {
    return (
      <View>
        <Text>Listener State</Text>
        <Button onPress={this.changeState}>
          <Text>Go to new state</Text>
        </Button>
      </View>
    );
  }
}

export default Listener;
