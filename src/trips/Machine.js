import React, { Component, Fragment } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { View } from '@shoutem/ui';

import createStateMachine from '../components/StateMachine';

import Accepted from './Accepted';
import Arrived from './Arrived';
import Boarded from './Boarded';
import Cancel from './Cancel';
import Finalized from './Finalized';
import Pending from './Pending';
import Traveling from './Traveling';

type Props = {
  children: any,
  step: number,
};

class Trip extends Component<Props> {
  render() {
    const { children, step } = this.props;

    return (
      <Fragment>
        <StepIndicator
          currentPosition={step}
          customStyles={stepIndicatorStyles}
          stepCount={5}
        />
        <View style={{ marginTop: 10 }}>{children}</View>
      </Fragment>
    );
  }
}

const states = {
  accepted: {
    component: Accepted,
    step: 0,
  },
  arrived: {
    component: Arrived,
    step: 1,
  },
  boarded: {
    component: Boarded,
    step: 2,
  },
  cancel: {
    component: Cancel,
  },
  finalized: {
    component: Finalized,
    step: 4,
  },
  pending: {
    component: Pending,
    override: true,
  },
  traveling: {
    component: Traveling,
    step: 3,
  },
};

const Machine = createStateMachine('listener', states)(Trip);

const stepIndicatorStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 26,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#2c2c2c',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#2c2c2c',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#2c2c2c',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#2c2c2c',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4',
};

export default Machine;
