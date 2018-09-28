/**
 * @flow
 */
import React, { Component, Fragment } from "react";
import firebase from "react-native-firebase";
import {
  Caption,
  FormGroup,
  NavigationBar,
  TextInput,
  View,
  Spinner,
  Button,
  Text
} from "@shoutem/ui";

type Props = {
  navigation: any
};

export default class Vehicle extends Component<Props> {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      hasChanged: false,
      hasContent: false,
      isLoading: true,
      isSaving: false,
      isValid: false,
      vehicle: null,
      edit: {
        brand: "",
        model: "",
        plate: ""
      }
    };
  }

  async componentDidMount() {
    this.vehicleRef = firebase
      .database()
      .ref(`docs/${firebase.auth().currentUser.uid}/vehicle`);

    const vehicleData = await this.vehicleRef.once("value");
    const vehicle = vehicleData.val();
    const nextState = {
      hasChanged: false,
      hasContent: true,
      isLoading: false,
      vehicle: vehicle
    };

    if (vehicle === null) {
      nextState.hasContent = false;
      nextState.hasChanged = true;
    } else {
      nextState.edit = Object.assign({}, vehicle);
    }

    this.setState(nextState);
  }

  onGoBack = () => {
    this.props.navigation.goBack();
  };

  validate = () => {
    const {
      edit: { brand, model, plate }
    } = this.state;

    if (brand && model && plate) {
      return true;
    }

    return false;
  };

  hasChanged = async () => {
    await this.setState({
      isValid: this.validate(),
      hasChanged:
        this.state.edit.brand !== this.state.vehicle.brand ||
        this.state.edit.model !== this.state.vehicle.model ||
        this.state.edit.plate !== this.state.vehicle.plate
    });
  };

  onBrandChange = async brand => {
    await this.syncSetState({
      edit: { ...this.state.edit, brand }
    });

    this.hasChanged();
  };

  onModelChange = async model => {
    await this.setState({
      edit: { ...this.state.edit, model }
    });

    this.hasChanged();
  };

  onPlateChange = async plate => {
    await this.setState({
      edit: { ...this.state.edit, plate }
    });

    this.hasChanged();
  };

  syncSetState = async nextState => {
    return new Promise(resolve => {
      this.setState(nextState, resolve);
    });
  };

  onSave = async () => {
    try {
      await this.syncSetState({ isSaving: true });
      await this.vehicleRef.set(this.state.edit);
      await this.syncSetState({
        isSaving: false,
        hasChanged: false,
        vehicle: { ...this.state.vehicle, ...this.state.edit }
      });
    } catch (error) {
      console.warn(error.message);
    }
  };

  render() {
    const { isLoading, isSaving, edit, hasChanged } = this.state;
    const isEditing = !isSaving;

    return (
      <View styleName="fill-parent">
        <NavigationBar
          hasHistory
          navigateBack={this.onGoBack}
          styleName="inline"
          title="VEHÍCULO"
          rightComponent={
            <Fragment>
              {hasChanged &&
                isEditing && (
                  <Button onPress={this.onSave} styleName="disabled">
                    <Text>Listo</Text>
                  </Button>
                )}
              {isSaving && <Spinner style={{ marginRight: 14 }} />}
            </Fragment>
          }
        />

        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Spinner />
          </View>
        ) : (
          <Fragment>
            <FormGroup>
              <Caption>MARCA</Caption>
              <TextInput
                editable={isEditing}
                value={edit.brand}
                onChangeText={this.onBrandChange}
              />
            </FormGroup>

            <FormGroup>
              <Caption>MODELO</Caption>
              <TextInput
                editable={isEditing}
                value={edit.model}
                onChangeText={this.onModelChange}
              />
            </FormGroup>

            <FormGroup>
              <Caption>PLACAS</Caption>
              <TextInput
                editable={isEditing}
                value={edit.plate}
                onChangeText={this.onPlateChange}
              />
            </FormGroup>
          </Fragment>
        )}
      </View>
    );
  }
}
