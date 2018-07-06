import React from 'react';
import IFrame from "./IFrame";
import * as utils from "../utils";

jest.mock('../utils');

test('it renders and matches its snapshot', () => {
  const wrapper = mount(
    <IFrame checkoutId={'aaaa'}/>
  );
  expect(wrapper).toMatchSnapshot();
});
