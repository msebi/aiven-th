import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CloudSelectionPanel } from "./components/cloudselectionpanel/CloudSelectionPanel";
import axios from 'axios';

// https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17
configure({ adapter: new Adapter() });

jest.mock('axios');

it("is aiven header present", () => {
  render(<App />);
  expect(screen.getByText("aiven Cloud Selection Panel")).toBeInTheDocument();
});

describe('cloud selection panel', () => {
  it('check no provider', () => {
    const mockResponse = {clouds: []}
    let wrapper = mount(<CloudSelectionPanel {...mockResponse}/>);

    expect(wrapper.text().includes('Fetching clouds providers ...')).toBe(true);
  });

  it('check one provider', () => {
    const mockResponse = {
      clouds: [
        {
          id: '0',
          cloud_description: 'Africa, South Africa - Amazon Web Services: Cape Town',
          cloud_name: 'aws-af-south-1',
          cloud_distance: '9153',
          geo_latitude: '-33.92',
          geo_longitude: '18.42',
          geo_region: 'africa'
        }
      ]}

    let wrapper = mount(<CloudSelectionPanel {...mockResponse}/>);

    expect(wrapper.text().includes('0')).toBe(true);
    expect(wrapper.text().includes('Africa, South Africa - Amazon Web Services: Cape Town')).toBe(true);
    expect(wrapper.text().includes('aws-af-south-1')).toBe(true);
    expect(wrapper.text().includes('9153')).toBe(true);
    expect(wrapper.text().includes('-33.92')).toBe(true);
    expect(wrapper.text().includes('18.42')).toBe(true);
    expect(wrapper.text().includes('africa')).toBe(true);
  });

  // TODO: add test cases for multiple providers and the service provider function 
});