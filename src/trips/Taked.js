import { Component } from 'react';

type Props = {
  changeState: () => void,
};

class Taked extends Component<Props> {
  componentDidMount() {
    this.props.dismiss();
  }

  render() {
    return null;
  }
}

Taked.defaultProps = {
  dismiss: () => {},
};

export default Taked;
