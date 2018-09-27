import React, { Component, Fragment } from "react";
import {
  Caption,
  FormGroup,
  NavigationBar,
  TextInput,
  View,
  Spinner
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
      isLoading: true
    };
  }

  onGoBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { isLoading } = this.state;

    return (
      <View>
        <NavigationBar
          hasHistory
          navigateBack={this.onGoBack}
          styleName="inline"
          title="VEHÍCULO"
        />

        {isLoading ? (
          <View>
            <Spinner />
          </View>
        ) : (
          <Fragment>
            <FormGroup>
              <Caption>MARCA</Caption>
              <TextInput />
            </FormGroup>

            <FormGroup>
              <Caption>MODELO</Caption>
              <TextInput />
            </FormGroup>

            <FormGroup>
              <Caption>PLACAS</Caption>
              <TextInput />
            </FormGroup>

            <FormGroup>
              <Caption>VIGENCIA</Caption>
              <TextInput />
            </FormGroup>
          </Fragment>
        )}
      </View>
    );
  }
}
