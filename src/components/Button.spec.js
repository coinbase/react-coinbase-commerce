import React from 'react';
import Button from "./Button";

test('it renders and matches its snapshot',  () => {
  const wrapper = mount(
    <Button/>
  );

  expect(Button).toMatchSnapshot();
});

test('it renders and matches its snapshot when the style prop is given', () => {
  const wrapper = mount(
    <Button styled={true}>Test ?!</Button>
  );

  expect(wrapper).toMatchSnapshot();
});
