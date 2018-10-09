import createStateMachine from '../components/StateMachine';

import Accepted from './Accepted';
import Arrived from './Arrived';
import Boarded from './Boarded';
import Cancel from './Cancel';
import Finalized from './Finalized';
import Pending from './Pending';
import Traveling from './Traveling';

const states = {
  accepted: Accepted,
  arrived: Arrived,
  boarded: Boarded,
  cancel: Cancel,
  finalized: Finalized,
  pending: Pending,
  traveling: Traveling,
};

const Machine = createStateMachine('listener', states)();

export default Machine;
