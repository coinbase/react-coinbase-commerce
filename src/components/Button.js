// @flow
import * as React from 'react';
import './button.css';

type Props = {
  styled?: boolean,
  children?: React.Node,
  className?: string
};

export default class Button extends React.PureComponent<Props> {
  render(){
    const {styled, children, ...props} = this.props;
    return (
      <button {...props} className={styled ? 'coinbase-commerce-button' : props.className}>{children || 'Buy With Crypto'}</button>
    );
  }
}
