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
  onLoad: () => void,
  onChargeSuccess?: (MessageData) => void,
  onChargeFailure?: (MessageData) => void,
  onModalClosed?: () => void
};
type State = {
  showModal: boolean
};

const getButtonProps = (props) => {
  const buttonProps = {...props};
  const ignoredProps = ['onLoad', 'onChargeSuccess', 'onChargeFailure', 'checkoutId', 'chargeId'];
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
    const {onLoad, onChargeSuccess, onChargeFailure, checkoutId, chargeId} = this.props;
    const iFrameProps = {onLoad, onChargeSuccess, onChargeFailure, checkoutId, chargeId};
    const buttonProps = getButtonProps(this.props);
    return (
      <div>
        <Button {...buttonProps} onClick={this.handleButtonClick}/>
        {showModal && (
          <IFrame {...iFrameProps} onModalClose={this.handleModalClose} onError={this.handleError} />
        )}
      </div>
    )
  }
}
export default CoinbaseCommerceButton;
export type {MessageData};
