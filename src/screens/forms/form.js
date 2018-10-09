import React, { Component } from "react";
import firebase from "react-native-firebase";
import { StyleSheet } from 'react-native';
import {
  Caption,
  FormGroup,
  NavigationBar,
  Spinner,
  TextInput,
  View
} from "@shoutem/ui";

type Props = {
  navigation: any
};

const withForm = (title, path, edit = {}, labels = {}) => {
  return () => {
    class WithForm extends Component<Props> {
      static navigationOptions = {
        header: null
      };

      constructor(props) {
        super(props);

        this.state = {
          data: null,
          edit: edit,
          hasContent: false,
          isLoading: true,
          isSaving: false,
          isValid: false
        };
      }

      async componentDidMount() {
        this.dataRef = firebase
          .database()
          .ref(`docs/${firebase.auth().currentUser.uid}/${path}`);

        const dataSnap = await this.dataRef.once("value");
        const data = dataSnap.val();

        const nextState = {
          hasContent: true,
          isLoading: false,
          data: data
        };

        if (data === null) {
          nextState.hasContent = false;
        } else {
          nextState.edit = Object.assign({}, data);
        }

        await this.syncSetState(nextState);
        this.validateChange();
      }

      isEditDataValid = () => {
        const { edit } = this.state;

        for (const key in edit) {
          if (edit.hasOwnProperty(key)) {
            const value = edit[key];

            if (!value) {
              return false;
            }
          }
        }

        return true;
      };

      hasEditChanged = () => {
        const { edit, data } = this.state;

        if (data === null) {
          return true;
        }

        for (const key in edit) {
          if (edit.hasOwnProperty(key)) {
            const left = edit[key];
            const right = data[key];

            if (left !== right) {
              return true;
            }
          }
        }

        return false;
      };

      validateChange = async () => {
        await this.syncSetState({
          isValid: this.isEditDataValid()
        });
      };

      onChange = async (key, value) => {
        await this.syncSetState({
          edit: Object.assign({}, this.state.edit, { [key]: value })
        });

        this.validateChange();
      };

      delay = () => {
        return new Promise(resolve => {
          setTimeout(resolve, 250);
        });
      };

      save = async () => {
        try {
          await this.syncSetState({ isSaving: true });
          await this.dataRef.set(this.state.edit);
          await this.delay();
          await this.syncSetState({
            data: { ...this.state.data, ...this.state.edit },
            hasChanged: false,
            isSaving: false
          });
        } catch (error) {
          console.warn(error.message);
        }
      };

      onGoBack = async () => {
        if (this.hasEditChanged() && this.isEditDataValid()) {
          await this.save();
        }

        this.props.navigation.goBack();
      };

      syncSetState = async nextState => {
        return new Promise(resolve => {
          this.setState(nextState, resolve);
        });
      };

      renderInputs = () => {
        const { edit, isSaving } = this.state;
        const isEditing = !isSaving;
        const inputs = [];

        for (const key in edit) {
          if (edit.hasOwnProperty(key)) {
            const value = edit[key];
            const label = labels[key] || key;

            inputs.push(
              <FormGroup key={key}>
                <Caption>{label}</Caption>
                <TextInput
                  editable={isEditing}
                  value={value}
                  onChangeText={text => this.onChange(key, text)}
                />
              </FormGroup>
            );
          }
        }

        return inputs;
      };

      render() {
        const { isLoading, isSaving } = this.state;

        return (
          <View styleName="fill-parent">
            <NavigationBar
              hasHistory
              navigateBack={this.onGoBack}
              styleName="inline"
              title={title}
              rightComponent={
                isSaving && <Spinner style={styles.spinnerSaving} />
              }
            />

            {isLoading ? (
              <View style={styles.spinnerLoading}>
                <Spinner />
              </View>
            ) : (
              this.renderInputs()
            )}
          </View>
        );
      }
    }

    return WithForm;
  };
};

const styles = StyleSheet.create({
  spinnerSaving:{
    marginRight: 14
  },
  spinnerLoading:{
    flex: 1,
    justifyContent: "center"
  }
});
export default withForm;

