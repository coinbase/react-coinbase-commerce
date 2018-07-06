import React from 'react';
import { render } from 'react-dom';
import CoinbaseCommerceButton from '../../src';
import styled, {injectGlobal} from 'styled-components';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      checkoutId: ''
    };
    this.updateCheckoutId = this.updateCheckoutId.bind(this);
  }

  updateCheckoutId(e){
    this.setState({checkoutId: e.target.value})
  }

  render(){
    return (
      <div>
        <span>Enter a checkout ID: </span>
        <input type='text' onChange={this.updateCheckoutId}/><br/>
        {this.state.checkoutId.length > 0 ? (
          <React.Fragment>
            <CoinbaseCommerceButton styled={true} checkoutId={this.state.checkoutId}/>
            <CoinbaseCommerceButton styled={true} disabled>Disabled Button</CoinbaseCommerceButton>
            <CoinbaseCommerceButton checkoutId={this.state.checkoutId}>Ugly Button With Crypto</CoinbaseCommerceButton>
            <Button checkoutId={this.state.checkoutId}>Pretty Custom Button</Button>
            <DangerButton checkoutId={'wrongo'}>This Button is Bad</DangerButton>
          </React.Fragment>
        ) : null}
      </div>
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

const DangerButton = Button.extend`
  background: #FF4136;
  &:hover{
    box-shadow: 7px 7px 0px 0px #00449E;
  }
  
  &:active{
    box-shadow: 5px 5px 0px 0px #00449E;
  }
`;

injectGlobal`
  body {
    background-color: #f4f4f4;
    font-family: system-ui, sans;
    font-size: 16px;
  }
`;
render(<App/>, document.getElementById('root'));


