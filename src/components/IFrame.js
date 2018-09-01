// @flow
declare var VERSION: string;

import * as React from 'react';
import type {MessageData} from '../types';
import {generateUUID} from '../utils';
import './LoadingSpinner.css';
import './iframe.css';

type Props = {
  checkoutId?: string,
  chargeId?: string,
  customMetadata?: string,
  onLoad: () => void,
  onChargeSuccess: (MessageData) => void,
  onChargeFailure: (MessageData) => void,
  onError: (MessageData) => void,
  onModalClose: () => void
}

type State = {
  loading: boolean
}

export default class IFrame extends React.Component<Props, State> {
  origin: string;
  ifr: any;
  uuid: string;
  hostName: string;

  constructor(props: Props) {
    super(props);

    this.origin = 'https://commerce.coinbase.com';

    this.isValidMessage = this.isValidMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleIFrameLoaded = this.handleIFrameLoaded.bind(this);
    this.uuid = generateUUID();
    this.hostName = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // Use the reference to our mounted dom element to link an
    // 'onload' callback to the iframe.
    this.ifr.onload = this.handleIFrameLoaded;

    // Add event listeners for the iframe
    window.addEventListener('message', this.handleMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  buildSrc = (): string => {
    const {checkoutId, chargeId, customMetadata} = this.props;

    function encodeURIParams(params) {
      let encoded = [];
      let quote = window.encodeURIComponent;
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          encoded.push(quote(key) + '=' + quote(params[key]));
        }
      }
      return encoded.join('&');
    }

    let widgetType;
    let id;
    if (checkoutId) {
      id = checkoutId;
      widgetType = 'checkout';
    } else if (chargeId) {
      id = chargeId;
      widgetType = 'charges';
    } else {
      throw new Error('must supply either checkoutId or chargeId prop');
    }

    let custom = '';
    if (customMetadata && typeof customMetadata !== 'string') {
      console.error('Received customMetadata not of "string" type. Ignoring.');
    } else if (customMetadata) {
      custom = customMetadata
    }
    const params = {
      origin: this.hostName,
      version: VERSION,
      buttonId: this.uuid,
      custom
    };
    return `${this.origin}/embed/${widgetType}/${encodeURI(id)}?${encodeURIParams(params)}`;
  };

  /*
   * If the message on this window is coming from coinbase commerce, and the ID of message
   * matches the ID we generated in our constructor, we can assume this message is valid and meant
   * for us to action.
   */
  isValidMessage = (msg: { origin: string, data: { buttonId?: string } }): boolean => {
    return msg.origin === this.origin && msg.data.buttonId === this.uuid;
  };

  /*
   * Handle any window message events here.
   * First, we ensure the message was meant for us.
   * We then match the event type to their callbacks,
   * ignoring any extra messages that may have been sent to us.
   */
  handleMessage = (msg: { origin: string, data: MessageData }) => {
    if (!this.isValidMessage(msg)) {
      return;
    }

    const {onChargeSuccess, onChargeFailure, onModalClose, onError} = this.props;

    switch (msg.data.event) {
      case 'charge_confirmed':
        onChargeSuccess && onChargeSuccess(msg.data);
        break;
      case 'charge_failed':
        onChargeFailure && onChargeFailure(msg.data);
        break;
      case 'error_not_found':
        onError(msg.data);
        break;
      case 'checkout_modal_closed':
        onModalClose();
      default:
        // Do nothing
        break;
    }
  };

  handleIFrameLoaded = () => {
    this.setState({loading: false});
    this.props.onLoad && this.props.onLoad();
  };

  render() {
    const src = this.buildSrc();
    return (
      <div className="coinbase-commerce-iframe-container">
        {this.state.loading ? (
          <div className="commerce-loading-spinner"/>
        ) : (null)}
        <iframe
          className="coinbase-commerce-iframe"
          ref={(r: any) => {
            this.ifr = r;
          }}
          src={src}
          allowtransparency={'yes'}
          scrolling={'no'}
          frameBorder="no"
        />
      </div>
    )
  }
}
