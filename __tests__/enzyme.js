import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.

import FoodGenerator from '../client/components/foodGenerator';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('generator title', () => {
    let wrapper;
    const props = {
      menu: 'pizza',
    };

    beforeAll(() => {
      wrapper = shallow(<FoodGenerator {...props} />);
    });

    it('Renders a <p> tag with the label in bold', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('#generator_menu').text()).toEqual(' pizza ');
      // expect(wrapper.find('strong').text()).toMatch('Mega');
    });
  });
});