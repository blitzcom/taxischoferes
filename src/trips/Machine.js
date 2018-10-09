import createStateMachine from '../components/StateMachine';

import Cancel from './Cancel';
import Pending from './Pending';
import Accepted from './Accepted';

const states = {
  cancel: Cancel,
  pending: Pending,
  accepted: Accepted,
};

const Machine = createStateMachine('listener', states)();

export default Machine;
