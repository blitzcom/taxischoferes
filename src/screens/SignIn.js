/**
 * @format
 * @flow
 */
import firebase from "react-native-firebase";
import React, { Component, Fragment } from "react";
import { StyleSheet } from 'react-native';
import { View, Caption, Text, Title, FormGroup, Spinner } from "@shoutem/ui";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

GoogleSignin.configure();

type Props = {
  navigation: any
};

type State = {
  isSending: boolean
};

export default class SignIn extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isSending: false
    };
  }

  asyncState = (state: any) => {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  };

  signIn = async () => {
    try {
      await this.asyncState({ isSending: true });
      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      const { user } = await firebase.auth().signInWithCredential(credential);

      await this.saveUserAndRedirect(user);
    } catch (error) {
      console.warn(error);
      this.props.navigation.replace("SignIn");
    }
  };

  saveUserAndRedirect = async user => {
    const userRef = firebase.database().ref(`drivers/${user.uid}`);
    const docsRef = firebase.database().ref(`docs/${user.uid}`);

    await userRef.set({
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: false,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid
    });

    const docsSnap = await docsRef.once("value");
    const docs = docsSnap.val();

    if (docs === null) {
      return this.props.navigation.replace("Taxi");
    }

    return this.props.navigation.replace("Home");
  };

  render() {
    const { isSending } = this.state;

    return (
      <View style={ styles.main }>
        <View style={ styles.container }>
          <Title styleName="h-center" style={ styles.title }>
            ¡HEY! TAXI
          </Title>

          <Caption styleName="h-center" style={ styles.caption }>
            Conductores
          </Caption>

          <Fragment>
            <Text styleName="h-center" style={ styles.text }>
              Accede con tu cuenta de google.
            </Text>

            {
              isSending
                ? <Spinner />
                : <FormGroup style = { styles.group }>
                    <GoogleSigninButton
                      style={ styles.googleButton }
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Light}
                      onPress={this.signIn}
                      disabled={isSending}
                    />
                  </FormGroup>
            }
          </Fragment>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    width: "80%"
  },
  title: {
    marginBottom: 2
  },
  caption: {
    marginBottom: 40
  },
  text: {
    marginBottom: 18
  },
  group: {
    alignItems: "center",
    justifyContent: "center"
  },
  googleButton: {
    width: 280,
    height: 48
  }
});
