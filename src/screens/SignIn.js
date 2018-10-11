/**
 * @format
 * @flow
 */
import firebase from 'react-native-firebase';
import React, { Component, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Caption,
  Text,
  Title,
  FormGroup,
  Spinner,
  TextInput,
  Button,
} from '@shoutem/ui';

type Props = {
  navigation: any,
};

type State = {
  isSending: boolean,
  email: string,
  password: string,
  emailError: string,
  passwordError: string,
  enabledButton: boolean,
};

export default class SignIn extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state = {
    isSending: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    canLogin: false,
  };

  asyncState = (state: any) => {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  };

  signIn = async () => {
    try {
      await this.asyncState({ isSending: true });

      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);

      await this.asyncState({ isSending: false });

      this.props.navigation.replace('SuccessLogin');
    } catch (e) {
      await this.asyncState({ isSending: false });

      const errorCode = e.code;

      switch (errorCode) {
        case 'auth/invalid-email':
          await this.asyncState({
            emailError: 'Formato de email incorrecto',
          });
          break;
        case 'auth/user-not-found':
          await this.asyncState({
            emailError: 'Email no registrado',
          });
          break;
        case 'auth/wrong-password':
          await this.asyncState({
            passwordError: 'Contraseña y/o correo incorrectos',
          });
          break;
        default:
          return await this.asyncState({ emailError: '' });
      }
    }
  };

  onChangeEmail = async (text) => {
    const emailText = text;
    const passwordText = this.state.password;
    const nextState = { email: text, canLogin: false, emailError: '' };
    if (emailText !== '' && passwordText !== '') {
      nextState.canLogin = true;
    }
    await this.asyncState(nextState);
  };

  onChangePassword = async (text) => {
    const emailText = this.state.email;
    const passwordText = text;
    const nextState = { password: text, canLogin: false, passwordError: '' }
    if (emailText !== '' && passwordText !== '') {
      nextState.canLogin = true;
    }
    await this.asyncState(nextState);
  };

  render() {
    const {
      isSending,
      email,
      password,
      emailError,
      passwordError,
      canLogin,
    } = this.state;

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Title styleName="h-center" style={styles.title}>
            ¡HEY! TAXI
          </Title>

          <Caption styleName="h-center" style={styles.caption}>
            Conductores
          </Caption>

          <Fragment>
            <Text styleName="h-center" style={styles.text}>
              Ingresa tu correo y contraseña.
            </Text>

            {isSending ? (
              <Spinner />
            ) : (
              <View>
                <FormGroup>
                  <Caption>EMAIL</Caption>
                  <TextInput
                    onChangeText={this.onChangeEmail}
                    placeholder="example@mail.com"
                    keyboardType="email-address"
                    style={styles.emailInput}
                    value={email}
                  />
                </FormGroup>
                {emailError !== '' && (
                  <Text style={styles.errorMessage}>{emailError}</Text>
                )}
                <FormGroup style={styles.passwordForm}>
                  <Caption>CONTRASEÑA</Caption>
                  <TextInput
                    onChangeText={this.onChangePassword}
                    placeholder="********"
                    style={{ marginBottom: 5 }}
                    value={password}
                    secureTextEntry
                  />
                </FormGroup>
                <Text style={styles.errorMessage}>{passwordError}</Text>
                <Button
                  styleName={`secondary ${!canLogin ? 'muted' : ''}`}
                  onPress={this.signIn}
                  style={styles.loginButton}
                  disabled={!canLogin}
                >
                  <Text>Iniciar sesión</Text>
                </Button>
              </View>
            )}
          </Fragment>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
  },
  title: {
    marginBottom: 2,
  },
  caption: {
    marginBottom: 40,
  },
  text: {
    marginBottom: 18,
  },
  emailInput: {
    marginBottom: 5,
  },
  errorMessage: {
    color: 'red',
  },
  passwordForm: {
    marginTop: 20,
  },
  loginButton: {
    marginTop: 20,
  },
});
