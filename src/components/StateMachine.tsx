import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { View } from '@shoutem/ui';

const createStateMachine = (
  initialState: null | string = null,
  states: any
) => {
  return (WrappedComponent: any) => {
    interface IProps {
      write: string;
      read: string;
      dismiss: () => void;
    }

    class StateMachine extends Component<IProps> {
      state = {
        state: initialState,
      };

      writeNodeRef: any;
      readNodeRef: any;
      subscription: any;

      componentDidMount() {
        const { write, read } = this.props;

        if (write === null || read === null) {
          return;
        }

        this.writeNodeRef = firebase.database().ref(write);
        this.readNodeRef = firebase.database().ref(read);
        this.subscription = this.readNodeRef.on('value', this.listenState);
      }

      componentWillUnmount() {
        if (this.readNodeRef) {
          this.readNodeRef.off('value', this.subscription);
        }
      }

      listenState = (snapshot: any) => { 
        this.setState({ ...snapshot.val() });
      };

      onChangeState = (nextState: any, writeOnReader = false) => {
        if (writeOnReader) {
          return this.readNodeRef.update(nextState);
        }

        return this.writeNodeRef.update(nextState);
      };

      renderMachine = () => {
        const { state } = this.state;

        if (state === null) {
          return null;
        }

        const { component: Machine } = states[state];

        return (
          <Machine
            {...this.props}
            {...this.state}
            changeState={this.onChangeState}
          />
        );
      };

      render() {
        const { state } = this.state;

        if (state === null || state === "listener") {
          return null;
        }
        

        const { override, step } = states[state];

        if (override) {
          return this.renderMachine();
        }

        return (
          <View style={styles.machineWrapper}>
            <WrappedComponent step={step}>
              {this.renderMachine()}
            </WrappedComponent>
          </View>
        );
      }
    }

    return StateMachine;
  };
};

const styles = StyleSheet.create({
  machineWrapper: {
    backgroundColor: 'white',
    bottom: 0,
    left: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    position: 'absolute',
    right: 10,
    borderColor: '#eaeaea',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default createStateMachine;
