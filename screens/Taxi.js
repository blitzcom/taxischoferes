import React, { Component } from "react";
import { TouchableNativeFeedback } from "react-native";
import { NavigationBar, Text, View, Icon, Row } from "@shoutem/ui";

type Props = {
  navigation: any
};

export default class Taxi extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  onPressVehicle = () => {
    this.props.navigation.push("VehicleForm");
  };

  onPressInsurance = () => {
    this.props.navigation.push("InsuranceForm");
  };

  onPressLicense = () => {
    this.props.navigation.push("LicenseForm");
  };

  onPressPermission = () => {
    this.props.navigation.push("PermissionForm");
  };

  render() {
    return (
      <View>
        <NavigationBar title="INFORMACIÓN" styleName="inline" />

        <TouchableNativeFeedback onPress={this.onPressVehicle}>
          <Row>
            <Text>Vehículo</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressInsurance}>
          <Row>
            <Text>Seguro</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressLicense}>
          <Row>
            <Text>Licencia</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressPermission}>
          <Row>
            <Text>Permiso</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
