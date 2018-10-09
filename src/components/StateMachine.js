import React, { Component } from 'react';
import firebase from 'react-native-firebase';

const createStateMachine = (initialState, states) => {
  return () => {
    class StateMachine extends Component {
      state = {
        state: null,
      };

      componentDidMount() {
        const { path } = this.props;

        if (path === null) {
          return;
        }

        this.nodeRef = firebase.database().ref(path);
        this.subscription = this.nodeRef.on('value', this.remoteChangeState);
      }

      componentWillUnmount() {
        if (this.nodeRef) {
          this.nodeRef.off('value', this.subscription);
        }
      }

      remoteChangeState = (snapshot) => {
        this.setState(snapshot.val());
      };

      onChangeState = (nextState) => {
        this.nodeRef.update(nextState);
      };

      render() {
        const { state } = this.state;

        if (state === null) {
          return null;
        }

        const Machine = states[state];

        return (
          <Machine
            {...this.props}
            changeState={this.onChangeState}
            state={state}
          />
        );
      }
    }

    return StateMachine;
  };
};

export default createStateMachine;
