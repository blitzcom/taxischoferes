import React, { Component } from "react";
import { View, Text } from "@shoutem/ui";

export default class Taxi extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <Text>Taxi information form</Text>
      </View>
    );
  }
}
