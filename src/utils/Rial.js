import React from 'react';
import { rial } from '@/components/Charts';

export default class Rial extends React.PureComponent {
  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = rial(children);
    }
  };

  render() {
    return (
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
    );
  }
}
