import { Component } from 'react';

type Props = {
  changeState: () => void,
};

class Cancel extends Component<Props> {
  componentDidMount() {
    this.props.dismiss();
  }

  render() {
    return null;
  }
}

Cancel.defaultProps = {
  dismiss: () => {},
};

export default Cancel;
