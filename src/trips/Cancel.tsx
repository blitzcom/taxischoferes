import { Component } from 'react';

type Props = {
  changeState: () => void;
  dismiss: () => void;
};

class Cancel extends Component<Props> {
  static defaultProps = {
    changeState: () => {},
    dismiss: () => {},
  };

  componentDidMount() {
    this.props.dismiss();
  }

  render() {
    return null;
  }
}

export default Cancel;
