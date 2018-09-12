import React from 'react';
import Button from './Button';

test('it renders and matches its snapshot',  () => {
  const wrapper = shallow(
    <Button/>
  );

  expect(wrapper).toMatchSnapshot();
});

test('it renders and matches its snapshot when the style prop is given', () => {
  const wrapper = shallow(
    <Button styled={true}>Test ?!</Button>
  );

  expect(wrapper).toMatchSnapshot();
});
