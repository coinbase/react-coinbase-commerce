import React from 'react';
import { render } from 'react-dom';
import CoinbaseCommerceButton from '../../src';
import styled, { createGlobalStyle } from 'styled-components';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      checkoutId: '',
      chargeId: ''
    };
    this.updateCheckoutId = this.updateCheckoutId.bind(this);
    this.updateChargeId = this.updateChargeId.bind(this);
  }

  updateCheckoutId(e){
    this.setState({checkoutId: e.target.value})
  }

  updateChargeId(e){
    this.setState({chargeId: e.target.value})
  }

  render(){
    return (
      <React.Fragment>
        <div>
          <span>Enter a checkout ID: </span>
          <input type='text' onChange={this.updateCheckoutId}/><br/>
          {this.state.checkoutId.length > 0 ? (
            <div>
              <CoinbaseCommerceButton styled={true} checkoutId={this.state.checkoutId} />
              <CoinbaseCommerceButton styled={true} disabled>Disabled Button</CoinbaseCommerceButton>
              <CoinbaseCommerceButton checkoutId={this.state.checkoutId}>Ugly Button With Crypto</CoinbaseCommerceButton>
              <Button checkoutId={this.state.checkoutId}>Pretty Custom Button</Button>
              <DangerButton checkoutId={'wrongo'}>This Button is Bad</DangerButton>
              <CoinbaseCommerceButton
                wrapperStyle={{ width: '100%' }}
                style={{
                  width: '100%',
                  color: 'green',
                  borderColor: 'green',
                  borderRadius: 4,
                  height: 45,
                  cursor: 'pointer',
                }}
                checkoutId={this.state.checkoutId}>
                Custom Styles Button
                </CoinbaseCommerceButton>
            </div>
          ) : null}

          <span>Enter a charge ID: </span>
          <input type='text' onChange={this.updateChargeId}/><br/>
          {this.state.chargeId.length > 0 ? (
            <div>
              <CoinbaseCommerceButton styled={true} chargeId={this.state.chargeId}/>
              <CoinbaseCommerceButton styled={true} disabled>Disabled Button</CoinbaseCommerceButton>
              <CoinbaseCommerceButton chargeId={this.state.chargeId}>Ugly Button With Crypto</CoinbaseCommerceButton>
              <Button chargeId={this.state.chargeId}>Pretty Custom Button</Button>
              <DangerButton chargeId={'wrongo'}>This Button is Bad</DangerButton>
            </div>
          ) : null}
        </div>
        <GlobalStyle />
      </React.Fragment>
      )
  }
}

const Button = styled(CoinbaseCommerceButton)`
  height: 40px;
  color: white;
  background: #00449E;
  border:  none;
  border-radius: 2px;
  margin: 1em;
  transition: box-shadow 150ms ease-out;
  
  &:hover{
    box-shadow: 7px 7px 0px 0px #FF4136;
  }
  
  &:active{
    box-shadow: 5px 5px 0px 0px #E7040F;
  }
  
  &:focus{
    outline: none;
  }
`;

const DangerButton = styled(Button)`
  background: #FF4136;
  &:hover{
    box-shadow: 7px 7px 0px 0px #00449E;
  }
  
  &:active{
    box-shadow: 5px 5px 0px 0px #00449E;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f4f4f4;
    font-family: system-ui, sans;
    font-size: 16px;
  }
`;
render(<App/>, document.getElementById('root'));


