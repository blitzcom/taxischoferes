import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Caption, Title, Text, Icon } from '@shoutem/ui';

class SuccesLogin extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <Title>¡HEY! TAXI</Title>
          <Caption>Conductores</Caption>
          <Icon name="checkbox-on" styleName="h-center" style={styles.icon}/>
          <Text styleName="h-center" style={styles.text}>
              Inicio de sesión exitoso
          </Text>
          <Caption>Iniciamos el 19 de Octubre!</Caption>
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
    alignItems: 'center'
  },
  icon: {
    marginTop: 20,
  },
  text: {
    marginTop: 5,
  }
});

export default SuccesLogin;
