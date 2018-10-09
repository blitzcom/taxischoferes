// @flow
import React, { Component } from 'react';
import firebase from 'react-native-firebase';

export type ChangeStateFunc = (nextState: string, data?: Object) => void;

const createStateMachine = (initialState, states) => {
  return () => {
    class StateMachine extends Component {
      state = {
        currentState: null,
      };

      componentDidMount() {
        this.machineRef = firebase.database().ref(`machine`);
        this.subscription = this.machineRef.on('value', this.remoteChangeState);
      }

      componentWillUnmount() {
        this.machineRef.off('value', this.subscription);
      }

      remoteChangeState = (snapshot) => {
        this.setState(snapshot.val());
      };

      onChangeState: ChangeStateFunc = (nextState) => {
        this.machineRef.update(nextState);
      };

      render() {
        const { currentState, data } = this.state;

        if (currentState === null) {
          return null;
        }

        const Machine = states[currentState];

        return (
          <Machine
            changeState={this.onChangeState}
            currentState={currentState}
            data={data}
          />
        );
      }
    }

    return StateMachine;
  };
};

export default createStateMachine;
