[![CircleCI](https://circleci.com/gh/coinbase/react-coinbase-commerce/tree/master.svg?style=svg)](https://circleci.com/gh/coinbase/react-coinbase-commerce/tree/master)
[![npm version](https://badge.fury.io/js/react-coinbase-commerce.svg)](https://badge.fury.io/js/react-coinbase-commerce)


# Coinbase Commerce React Button 
A button to embed a Coinbase Commerce checkout or charge directly into your React application.

```
npm i -S react-coinbase-commerce 
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
- [Contributing](#contributing)

## Usage
```jsx
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

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
| `onPaymentDetected` | nil     | no                    | `(MessageData)=>void` |
| `onModalClosed`   | nil     | no                    | `()=>void`            |
| `disableCaching`   | false     | no                    | `boolean`            |
| `customMetadata`   | nil     | no                    | `string`              |

**Warning**: If `disableCaching` is set to `true`, users that accidentally close their payment windows will be unable to see their transaction's status upon reopening. 

### Data Types
```typescript
type MessageData = {
  event: 'charge_confirmed' | 'charge_failed' 'payment_detected',
  code: <CHARGE_CODE>
}
```

## Contributing
To contribute to `react-coinbase-commerce` please fork the repo and open a Pull Request.

### Installation
```sh
npm install
```

### Running the dev server
```sh
npm start
```

### Running the dev server with HTTPS
In some cases, you may need to run the dev server [with HTTPS](https://web.dev/how-to-use-local-https/). To use HTTPS locally in development and access https://localhost, you'll first need a [TLS certificate](https://en.wikipedia.org/wiki/Public_key_certificate#TLS/SSL_server_certificate). See setup instructions to prepair your local environment before starting your server with HTTPS.

```sh
npm start:secure
```

### Setting up HTTPS for local develpment
Before starting your local server with HTTPS, you'll need to prepair your environment and install some local certs. To do so, follow the setps bellow:

#### 1. Install mkcert.
Follow [the instructions](https://github.com/FiloSottile/mkcert#installation) for installing mkcert on your operating system. For example, on macOS:

```sh
brew install mkcert
brew install nss # if you use Firefox
```

#### 2. Add mkcert to your local root CAs.
This generates a local certificate authority (CA). Your mkcert-generated local CA is only trusted **locally**, on your device.

```sh
mkcert -install
```

#### 3. Generate a certificate for your site, signed by mkcert.
In your terminal, navigate to the root directory and run:

```sh
mkcert localhost
```