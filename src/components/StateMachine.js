// @flow
import React, { Component } from 'react';

export type ChangeStateFunc = (nextState: string, data?: Object) => void;

const createStateMachine = (initialState, states) => {
  return () => {
    class StateMachine extends Component {
      state = {
        currentState: initialState,
        data: null,
      };

      changeState: ChangeStateFunc = (nextState, data = null) => {
        this.setState({ currentState: nextState, data: data });
      };

      render() {
        const { currentState, data } = this.state;
        const Machine = states[currentState];

        return (
          <Machine
            changeState={this.changeState}
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
