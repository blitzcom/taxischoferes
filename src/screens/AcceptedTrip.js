import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Button, Text } from "@shoutem/ui";

export default class AcceptedTrip extends Component<Props> {

  constructor() {
      super();

      this.state = {
          label: 'Informar llegada'
      }
  }

  render() {

    const { label } = this.state;

    return (
      <View styleName="horizontal center" style={styles.container}>
        <Button styleName="confirmation secondary">
          <Text>{label}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    position: "absolute"
  }
});
