import React, { Component } from "react";
import firebase from "react-native-firebase";
import { TouchableNativeFeedback } from "react-native";
import { NavigationBar, Text, View, Icon, Row } from "@shoutem/ui";

type Props = {
  navigation: any
};

export default class Taxi extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      insurance: null,
      license: null,
      permission: null,
      vehicle: null
    };
  }

  async componentDidMount() {
    this.docsRef = firebase
      .database()
      .ref(`docs/${firebase.auth().currentUser.uid}`);

    const snap = await this.docsRef.once("value");

    const docs = Object.assign(
      {},
      {
        insurance: null,
        license: null,
        permission: null,
        vehicle: null,
        isValid: false
      },
      snap.val()
    );

    docs.isValid = this.isValid(docs);

    this.setState(docs);
  }

  isValid = state => {
    const { insurance, license, permission, vehicle } = state;
    return insurance && license && permission && vehicle;
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

  onGoBack = () => {
    this.props.navigation.replace("Home");
  };

  render() {
    const { license, permission, insurance, vehicle, isValid } = this.state;

    return (
      <View>
        <NavigationBar
          hasHistory={isValid}
          navigateBack={this.onGoBack}
          title="INFORMACIÓN"
          styleName="inline"
        />

        <TouchableNativeFeedback onPress={this.onPressVehicle}>
          <Row>
            {vehicle ? (
              <Icon name="checkbox-on" />
            ) : (
              <Icon name="checkbox-off" />
            )}
            <Text>Vehículo</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressInsurance}>
          <Row>
            {insurance ? (
              <Icon styleName="" name="checkbox-on" />
            ) : (
              <Icon styleName="" name="checkbox-off" />
            )}
            <Text>Seguro</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressLicense}>
          <Row>
            {license ? (
              <Icon styleName="" name="checkbox-on" />
            ) : (
              <Icon styleName="" name="checkbox-off" />
            )}
            <Text>Licencia</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={this.onPressPermission}>
          <Row>
            {permission ? (
              <Icon styleName="" name="checkbox-on" />
            ) : (
              <Icon styleName="" name="checkbox-off" />
            )}
            <Text>Permiso</Text>
            <Icon styleName="disclosure" name="right-arrow" />
          </Row>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
