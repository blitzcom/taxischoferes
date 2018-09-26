/**
 * @format
 * @flow
 */

import React, { Component } from "react";
import firebase from "react-native-firebase";
import { View, Button, Text, Title, ImageBackground } from "@shoutem/ui";

import Map from "../components/Map";

type Props = {
  navigation: any
}

export default class Home extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      passenger: false,
    };
  }

  onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.replace("Splash");
    } catch (error) {
      console.warn(error.message);
    }
  };

  render() {
    const { passenger } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "white", position: "relative" }}>
        <Map />

        {passenger && (
          <View
            style={{
              alignItems: "center",
              height: "100%",
              position: "absolute",
              width: "100%"
            }}
          >
            <ImageBackground
              style={{ flex: 1 }}
              source={require("../assets/notification_background.png")}
            >
              <Title
                styleName="secondary"
                style={{ paddingTop: 32, paddingBottom: 330, color: "#eaeaea" }}
              >
                NUEVO PASAJERO
              </Title>

              <Text style={{ marginBottom: 32, color: "#eaeaea" }}>
                #PASSENGER_ADDRESS
              </Text>

              <View styleName="horizontal">
                <Button styleName="confirmation">
                  <Text>ACEPTAR</Text>
                </Button>

                <Button
                  styleName="confirmation secondary"
                  onPress={() => this.setState({ available: false })}
                >
                  <Text>RECHAZAR</Text>
                </Button>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>
    );
  }
}
