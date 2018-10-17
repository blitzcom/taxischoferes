import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import firebase, { RNFirebase } from 'react-native-firebase';
import { View } from '@shoutem/ui';

export interface IMachineStates {
  [index: string]: {
    component: React.ComponentClass<any, any>;
    step?: number;
    override?: boolean;
  };
}

const createStateMachine = (
  initialState: null | string,
  states: IMachineStates
) => {
  return (WrappedComponent: any) => {
    interface IProps {
      tripId: string;
      dismiss: () => void;
    }

    class StateMachine extends PureComponent<IProps> {
      state = {
        state: initialState,
      };

      nodeRef: RNFirebase.database.Reference;

      componentDidMount() {
        const { tripId } = this.props;

        this.nodeRef = firebase
          .database()
          .ref('trips')
          .child(tripId);
        this.nodeRef.on('value', this.listenState);
      }

      componentWillUnmount() {
        if (this.nodeRef) {
          this.nodeRef.off();
        }
      }

      listenState = (snapshot: RNFirebase.database.DataSnapshot) => {
        this.setState(snapshot.val());
      };

      onChangeState = (nextState: any) => {
        return this.nodeRef.update(nextState);
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

        if (state === null) {
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
