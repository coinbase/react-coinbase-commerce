// @flow
import * as React from 'react';
import Button from './components/Button';
import IFrame from './components/IFrame';
import type {MessageData} from './types';

type Props = {
  styled?: boolean,
  children?: React.Node,
  checkoutId?: string,
  chargeId?: string,
  customMetadata?: string,
  onLoad: () => void,
  onChargeSuccess?: (MessageData) => void,
  onChargeFailure?: (MessageData) => void,
  onPaymentDetected?: (MessageData) => void,
  onModalClosed?: () => void,
  disableCaching: true,
  wrapperStyle?: { [string]: number | string }
};

type State = {
  showModal: boolean
};

const getButtonProps = (props) => {
  const buttonProps = {...props};
  const ignoredProps = [
    'onLoad',
    'onChargeSuccess',
    'onChargeFailure',
    'customMetadata',
    'onPaymentDetected',
    'checkoutId',
    'chargeId',
    'disableCaching',
    'wrapperStyle'
  ];
  ignoredProps.forEach(p => delete buttonProps[p]);
  return buttonProps;
};

class CoinbaseCommerceButton extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);

    this.state = {
      showModal: false
    };
  }

  handleButtonClick = () => {
    this.setState({showModal: true});
  };

  handleModalClose = () => {
    this.setState({showModal: false});
    if (this.props.onModalClosed){
      this.props.onModalClosed();
    }
  };

  /*
   * If we experience an unexpected error,
   * log it as an error to the console and close the modal.
   */
  handleError = (msg: MessageData) => {
    console.error(msg);
    this.setState({showModal: false});
  };

  render(){
    const {showModal} = this.state;
    const {onLoad, onChargeSuccess, onChargeFailure, checkoutId, chargeId, customMetadata, onPaymentDetected, disableCaching, wrapperStyle} = this.props;
    const iFrameProps = {onLoad, onChargeSuccess, onChargeFailure, checkoutId, chargeId, onPaymentDetected, disableCaching};
    const buttonProps = getButtonProps(this.props);
    return (
      <div style={wrapperStyle}>
        <a href="https://commerce.coinbase.com" rel="external" title="Pay with Bitcoin, Bitcoin Cash, DAI, Litecoin, Dogecoin, Ethereum, or USD Coin" onClick={e => e.preventDefault()}>
          <Button {...buttonProps} onClick={this.handleButtonClick}/>
        </a>
        {showModal && (
          <IFrame {...iFrameProps} onModalClose={this.handleModalClose} onError={this.handleError} customMetadata={customMetadata}/>
        )}
      </div>
    )
  }
}
export default CoinbaseCommerceButton;
export type {MessageData};
