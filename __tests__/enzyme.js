import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';


// If babel error
// npm install babel-core@7.0.0-bridge.0 --save-dev

import FoodGenerator from '../client/components/foodGenerator';
import FoodOptionLists from '../client/components/foodOptionLists';
import FoodPicker from '../client/components/foodpicker';
// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Food generator rendered', () => {
    let wrapper;
    const props = {
      menu: 'pizza',
    };

    beforeAll(() => {
      wrapper = shallow(<FoodGenerator {...props} />);
    });

    it('Renders a <div> tag', () => {
      expect(wrapper.type()).toEqual('div');
    });
    it('Renders id generator name', () => {
        expect(wrapper.find('#generator_menu').text()).toEqual(' pizza ');
    });
  });

  describe('Food option list rendered', () => {
    let wrapper;

    const fakeFunc = () => {
        return 2 + 1;
    };

    const props = {
        setMenu: fakeFunc,
        cancelPopup: fakeFunc
    };

    beforeAll(() => {
      wrapper = shallow(<FoodOptionLists {...props} />);
    });

    it('Renders a <div> tag', () => {
      expect(wrapper.type()).toEqual('div');
    });
    it('Renders three buttons', () => {
      expect(wrapper.find('button')).toHaveLength(3);
    });
    
  });

  describe('Food picker list rendered', () => {
    let wrapper;

    const fakeFunc = () => {
        return 2 + 1;
    };

    const props = {
        setMenu: fakeFunc, 
        menu: '', 
        setZipcode: fakeFunc, 
        zipcode: '11214',
    };

    beforeAll(() => {
      wrapper = shallow(<FoodPicker {...props} />);
    });

    it('Renders a <div> tag and have one buttons', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('button')).toHaveLength(1);
    });

    it('Button should fire when clicked', () => {
        expect(wrapper.find('button').invoke('onClick')()).toHaveBeenCalled;
    });
  });

});
