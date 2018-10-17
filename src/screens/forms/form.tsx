import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { StyleSheet } from 'react-native';
import {
  Caption,
  FormGroup,
  NavigationBar,
  Spinner,
  TextInput,
  View,
} from '@shoutem/ui';

type Props = {
  navigation: any;
};

interface IState {
  data: any;
  edit: { [index: string]: any };
  hasContent: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isValid: boolean;
}

const withForm = (
  title: string,
  path: string,
  edit: { [index: string]: any },
  labels: { [index: string]: any }
) => {
  return () => {
    class WithForm extends Component<Props, IState> {
      static navigationOptions = {
        header: null,
      };

      state = {
        data: null,
        edit: edit,
        hasContent: false,
        isLoading: true,
        isSaving: false,
        isValid: false,
      };

      dataRef: any;

      async componentDidMount() {
        const currentUser = firebase.auth().currentUser;

        if (currentUser === null) {
          throw new Error('Current user is null');
        }

        this.dataRef = firebase
          .database()
          .ref(`docs/${currentUser.uid}/${path}`);

        const dataSnap = await this.dataRef.once('value');
        const data = dataSnap.val();

        const nextState = {
          ...this.state,
          hasContent: true,
          isLoading: false,
          data: data,
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
          isValid: this.isEditDataValid(),
        });
      };

      onChange = async (key: string, value: any) => {
        await this.syncSetState({
          edit: Object.assign({}, this.state.edit, { [key]: value }),
        });

        this.validateChange();
      };

      delay = () => {
        return new Promise((resolve) => {
          setTimeout(resolve, 250);
        });
      };

      save = async () => {
        try {
          await this.syncSetState({ isSaving: true });
          await this.dataRef.set(this.state.edit);
          await this.delay();
          const data = (this.state.data as any) as object;
          await this.syncSetState({
            data: { ...data, ...this.state.edit },
            hasChanged: false,
            isSaving: false,
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

      syncSetState = async (nextState: any) => {
        return new Promise((resolve) => {
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
                  onChangeText={(text: string) => this.onChange(key, text)}
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
  spinnerSaving: {
    marginRight: 14,
  },
  spinnerLoading: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default withForm;
