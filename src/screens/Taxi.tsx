import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { NavigationBar, Text, View, Icon, Row, Spinner } from '@shoutem/ui';

type Props = {
  navigation: any;
};

export default class Taxi extends Component<Props> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isLoading: true,
    isValid: false,
    insurance: null,
    license: null,
    permission: null,
    vehicle: null,
  };

  navigationSubscription: any;
  docsRef: any;

  async componentDidMount() {
    this.navigationSubscription = this.props.navigation.addListener(
      'didFocus',
      this.onDidFocus
    );

    const currentUser = firebase.auth().currentUser;

    if (currentUser === null) {
      throw new Error('Current user is null');
    }

    this.docsRef = firebase.database().ref(`docs/${currentUser.uid}`);

    await this.fetchDocs();
  }

  componentWillUnmount() {
    this.navigationSubscription.remove();
  }

  onDidFocus = async () => {
    await this.fetchDocs();
  };

  fetchDocs = async () => {
    await this.syncSetState({ isLoading: true });

    const snap = await this.docsRef.once('value');
    const docs = snap.val() || {};

    const nextState = {
      insurance: null,
      isLoading: false,
      isValid: this.isValid(docs),
      license: null,
      permission: null,
      vehicle: null,
      ...docs,
    };

    await this.syncSetState(nextState);
  };

  syncSetState = (nextState: any) => {
    return new Promise((resolve) => {
      this.setState(nextState, resolve);
    });
  };

  isValid = (state: any) => {
    const { insurance, license, permission, vehicle } = state;
    return insurance && license && permission && vehicle;
  };

  onPressVehicle = () => {
    this.state.isLoading || this.props.navigation.push('VehicleForm');
  };

  onPressInsurance = () => {
    this.state.isLoading || this.props.navigation.push('InsuranceForm');
  };

  onPressLicense = () => {
    this.state.isLoading || this.props.navigation.push('LicenseForm');
  };

  onPressPermission = () => {
    this.state.isLoading || this.props.navigation.push('PermissionForm');
  };

  onGoBack = () => {
    this.props.navigation.replace('Home');
  };

  render() {
    const {
      insurance,
      isLoading,
      isValid,
      license,
      permission,
      vehicle,
    } = this.state;

    return (
      <View>
        <NavigationBar
          hasHistory={isValid}
          navigateBack={this.onGoBack}
          title="INFORMACIÓN"
          styleName="inline"
          rightComponent={isLoading && <Spinner style={styles.spinner} />}
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

const styles = StyleSheet.create({
  spinner: {
    marginRight: 14,
  },
});
