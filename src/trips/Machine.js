import createStateMachine from '../components/StateMachine';

import Accepted from './Accepted';
import Arrived from './Arrived';
import Boarded from './Boarded';
import Cancel from './Cancel';
import Finalized from './Finalized';
import Pending from './Pending';
import Traveling from './Traveling';

const states = {
  accepted: {
    component: Accepted,
  },
  arrived: {
    component: Arrived,
  },
  boarded: {
    component: Boarded,
  },
  cancel: {
    component: Cancel,
  },
  finalized: {
    component: Finalized,
  },
  pending: {
    component: Pending,
    override: true,
  },
  traveling: {
    component: Traveling,
  },
};

const Machine = createStateMachine('listener', states)();

export default Machine;
