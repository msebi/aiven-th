import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CloudSelectionPanel } from "./components/cloudselectionpanel/CloudSelectionPanel";
import axios from 'axios';

// https://www.npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17
configure({ adapter: new Adapter() })

jest.mock('axios')

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

    let wrapper = mount(<CloudSelectionPanel {...mockResponse}/>)

    expect(wrapper.find('tbody').find('tr')).toHaveLength(1)

    console.log('wrapper: ', wrapper.debug)
    expect(wrapper.html()).toMatchInlineSnapshot(`"<span>Search results:  <input value=\\"\\"></span><table role=\\"table\\"><thead><tr role=\\"row\\"><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Id<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Cloud Description<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Cloud Name<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Distance from your Location (Km)<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Latitude<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Longitude<span></span></th><th colspan=\\"1\\" role=\\"columnheader\\" title=\\"Toggle SortBy\\" style=\\"cursor: pointer;\\">Region<span></span></th></tr></thead><tbody role=\\"rowgroup\\"><tr role=\\"row\\"><td role=\\"cell\\">0</td><td role=\\"cell\\">Africa, South Africa - Amazon Web Services: Cape Town</td><td role=\\"cell\\">aws-af-south-1</td><td role=\\"cell\\">9153</td><td role=\\"cell\\">-33.92</td><td role=\\"cell\\">18.42</td><td role=\\"cell\\">africa</td></tr></tbody></table><div><span>Page <strong>1 of 1</strong> </span><span>: Go to page:  <input type=\\"number\\" style=\\"width: 100px;\\" value=\\"1\\"></span><select><option value=\\"10\\">Show 10</option><option value=\\"25\\">Show 25</option><option value=\\"50\\">Show 50</option></select><button disabled=\\"\\">&lt;&lt;</button><button disabled=\\"\\">Prev</button><button disabled=\\"\\">Next</button><button disabled=\\"\\">&gt;&gt;</button></div>"`);

    expect(wrapper.text().includes('0')).toBe(true)
    expect(wrapper.text().includes('Africa, South Africa - Amazon Web Services: Cape Town')).toBe(true)
    expect(wrapper.text().includes('aws-af-south-1')).toBe(true)
    expect(wrapper.text().includes('9153')).toBe(true)
    expect(wrapper.text().includes('-33.92')).toBe(true)
    expect(wrapper.text().includes('18.42')).toBe(true)
    expect(wrapper.text().includes('africa')).toBe(true)
  });

  it('multiple providers', () => {
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
        },
        {
          id: '1',
          cloud_description: 'Africa, South Africa - Azure: South Africa North',
          cloud_name: 'azure-south-africa-north',
          cloud_distance: '8431',
          geo_latitude: '-26.198',
          geo_longitude: '28.03',
          geo_region: 'africa'
        }
      ]}

    let wrapper = mount(<CloudSelectionPanel {...mockResponse}/>)

    expect(wrapper.find('tbody').find('tr')).toHaveLength(2)

    expect(wrapper.text().includes('0')).toBe(true)
    expect(wrapper.text().includes('Africa, South Africa - Amazon Web Services: Cape Town')).toBe(true)
    expect(wrapper.text().includes('aws-af-south-1')).toBe(true)
    expect(wrapper.text().includes('9153')).toBe(true)
    expect(wrapper.text().includes('-26.198')).toBe(true)
    expect(wrapper.text().includes('28.03')).toBe(true)
    expect(wrapper.text().includes('africa')).toBe(true)

    expect(wrapper.text().includes('1')).toBe(true)
    expect(wrapper.text().includes('Africa, South Africa - Azure: South Africa North')).toBe(true)
    expect(wrapper.text().includes('azure-south-africa-north')).toBe(true)
    expect(wrapper.text().includes('9153')).toBe(true)
    expect(wrapper.text().includes('-33.92')).toBe(true)
    expect(wrapper.text().includes('18.42')).toBe(true)
    expect(wrapper.text().includes('africa')).toBe(true)
  });
});