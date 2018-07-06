import React from 'react';
import CoinbaseCommerceButton from "./index";

test('it renders and matches its snapshot', () => {
  const wrapper  = mount(
    <CoinbaseCommerceButton checkoutId={'aaaa'}/>
  );
  expect(wrapper.children().find('iframe').length).toEqual(0);
  expect(wrapper.children().find('button').length).toEqual(1);
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
