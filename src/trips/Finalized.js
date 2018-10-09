import React, { Component } from 'react';
import { Button, Text, View } from '@shoutem/ui';

type Props = {
  changeState: () => void,
};

class Finalized extends Component<Props> {
  changeState = () => {
    this.props.dismiss();
  };

  render() {
    return (
      <View>
        <Text>Finalized state</Text>
        <Button onPress={this.changeState} styleName="secondary">
          <Text>CERRAR</Text>
        </Button>
      </View>
    );
  }
}

export default Finalized;
