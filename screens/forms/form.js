import React, { Component, Fragment } from "react";
import {
  View,
  NavigationBar,
  Spinner,
  Button,
  Text,
  TextInput,
  FormGroup,
  Caption
} from "@shoutem/ui";
import firebase from "react-native-firebase";

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
          hasChanged: false,
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
          hasChanged: false,
          hasContent: true,
          isLoading: false,
          data: data
        };

        if (data === null) {
          nextState.hasContent = false;
          nextState.hasChanged = true;
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
          hasChanged: this.hasEditChanged(),
          isValid: this.isEditDataValid()
        });
      };

      onChange = async (key, value) => {
        await this.syncSetState({
          edit: Object.assign({}, this.state.edit, { [key]: value })
        });

        this.validateChange();
      };

      onSave = async () => {
        try {
          await this.syncSetState({ isSaving: true });
          await this.dataRef.set(this.state.edit);
          await this.syncSetState({
            data: { ...this.state.data, ...this.state.edit },
            hasChanged: false,
            isSaving: false
          });
        } catch (error) {
          console.warn(error.message);
        }
      };

      onGoBack = () => {
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
        const { isLoading, isSaving, hasChanged } = this.state;
        const isEditing = !isSaving;

        return (
          <View styleName="fill-parent">
            <NavigationBar
              hasHistory
              navigateBack={this.onGoBack}
              styleName="inline"
              title={title}
              rightComponent={
                <Fragment>
                  {isSaving && <Spinner style={{ marginRight: 14 }} />}
                  {hasChanged &&
                    isEditing && (
                      <Button onPress={this.onSave}>
                        <Text>Listo</Text>
                      </Button>
                    )}
                </Fragment>
              }
            />

            {isLoading ? (
              <View style={{ flex: 1, justifyContent: "center" }}>
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

export default withForm;
