import { Component } from 'react';

type Props = {
  changeState: () => void,
  dismiss: () => void
};

class Taked extends Component<Props> {
  componentDidMount() {
    this.props.dismiss();
  }

  render() {
    return null;
  }
}

export default Taked;
