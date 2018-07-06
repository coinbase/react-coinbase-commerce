# Coinbase Commerce React Button 
A button to embed a Coinbase Commerce checkout or charge directly into your React application.

```
npm i -S coinbase-commerce-react 
```

## Features
- Connect your Coinbase Commerce account to easily accept cryptocurrencies from within your application.
- Support for embedding individual charges or entire checkouts
- Callback APIs for successful and failed payments.
- No API key required

### Table of Contents
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Docs](#docs)

## Usage
```ecmascript 6
import CoinbaseCommerceButton from 'coinbase-commerce-react';
import 'coinbase-commerce-react/dist/coinbase-commerce-button.css';

const App = () => {
  return (
    <CoinbaseCommerceButton checkoutId={'My checkout ID'}/>
  )
};
```

## Getting Started
1. To start accepting digital currency payments, first register for a Coinbase Commerce
account [here](https://commerce.coinbase.com).
1. Whitelist your domain in Settings.
1. Follow the API Documentation [here](https://commerce.coinbase.com/docs/api/) to create a charge or checkout.
    - Alternatively, create a checkout from the merchant dashboard and copy the ID found in the checkout's details. 
1. Pass the ID of the charge or checkout you create to the `CoinbaseCommerceButton` component
1. That's it! You're ready to start accepting digital currency payments with Coinbase Commerce

## Docs

### Props
In addition to the regular `button` props, this component accepts some custom props:

| Prop Name       | default | required              | type                  |
|-----------------|---------|-----------------------|-----------------------|
| `styled`        | false   | no                    | ``boolean``               |
| `checkoutId`      | nil     | If no chargeId, yes   | ``string``                |
| `chargeId`        | nil     | If no checkoutId, yes | ``string``                |
| `onLoad`          | nil     | no                    | `()=>void`            |
| `onChargeSuccess` | nil     | no                    | `(MessageData)=>void` |
| `onChargeFailure` | nil     | no                    | `(MessageData)=>void` |
| `onModalClosed`   | nil     | no                    | `()=>void`            |

### Data Types
```
type MessageData = {
  event: 'charge_confirmed' | 'charge_failed',
  code: <CHARGE_CODE>
}
```
