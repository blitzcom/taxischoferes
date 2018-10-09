import createStateMachine from '../components/StateMachine';

import Listener from './Listener';
import New from './New';

const states = {
  listener: Listener,
  new: New,
};

const Machine = createStateMachine('listener', states)();

export default Machine;
