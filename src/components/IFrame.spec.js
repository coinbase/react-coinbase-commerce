import React from 'react';
import IFrame from './IFrame';

jest.mock('../utils');

test('it renders and matches its snapshot', () => {
  const wrapper = shallow(
    <IFrame checkoutId={'aaaa'}/>
  );
  expect(wrapper).toMatchSnapshot();
});
