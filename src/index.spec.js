import React from 'react';
import { renderToString } from 'react-dom/server';
import CoinbaseCommerceButton from './index';

test('SSR properly renders clickable link without errors', () => {
  const string = renderToString(<CoinbaseCommerceButton checkoutId="aaaa"/>);
  expect(string).toBe('<div data-reactroot=""><a href="https://commerce.coinbase.com" rel="external" title="Pay with Bitcoin, Bitcoin Cash, DAI, Litecoin, Dogecoin, Ethereum, or USD Coin"><button>Buy With Crypto</button></a></div>');
});

test('it renders and matches its snapshot', () => {
  const wrapper  = shallow(
    <CoinbaseCommerceButton checkoutId={'aaaa'}/>
  );
  expect(wrapper.children().first().find('IFrame').length).toEqual(0);
  expect(wrapper.children().first().find('Button').length).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});

test('it opens up an iframe when its button is clicked', () => {
  const wrapper = shallow(
    <CoinbaseCommerceButton checkoutId={'aaaa'}/>
  );

  wrapper.find('Button').simulate('click');
  expect(wrapper.children().find('IFrame').length).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});
