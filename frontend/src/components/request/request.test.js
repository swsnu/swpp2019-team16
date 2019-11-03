import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Request from './request';

describe('<Request />', () => {
  it('SHOULD match with snapshot WHEN user is null', async () => {
    const USER = null;
    const from_list = [];
    const to_list = [];
    const minPassenger = [];

    const { container } = render(
      <Request
        user={USER}
        fromList={from_list}
        toList={to_list}
        minimumPassenger={minPassenger}
        onClickRequest={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('SHOULD match with snapshot WHEN all data in', async () => {
    const USER = { id: 1, name: 'zeroFruit' };
    const from_list = ['a', 'b', 'c'];
    const to_list = ['x', 'y', 'c'];
    const minPassenger = ['2', '3', '4'];
    window.alert = () => {
      return true;
    };

    const { container } = render(
      <Request
        user={USER}
        fromList={from_list}
        toList={to_list}
        minimumPassenger={minPassenger}
        onClickRequest={() => {}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('Button Click without checking checkbox', async () => {
    const USER = { id: 1, name: 'zeroFruit' };
    const from_list = ['a', 'b', 'c'];
    const to_list = ['x', 'y', 'c'];
    const minPassenger = ['2', '3', '4'];
    const mockFn = jest.fn();

    const utils = render(
      <Request
        user={USER}
        fromList={from_list}
        toList={to_list}
        minimumPassenger={minPassenger}
        onClickRequest={mockFn}
      />,
    );

    const button = utils.getByText('Carpool Request');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  it('Check the checkbox', async () => {
    const USER = { id: 1, name: 'zeroFruit' };
    const from_list = ['a', 'b', 'c'];
    const to_list = ['x', 'y', 'c'];
    const minPassenger = ['2', '3', '4'];
    const mockFn = jest.fn();

    const utils = render(
      <Request
        user={USER}
        fromList={from_list}
        toList={to_list}
        minimumPassenger={minPassenger}
        onClickRequest={mockFn}
      />,
    );

    const checkbox_from = utils.getByTestId('a');
    fireEvent.click(checkbox_from);
    const checkbox_to = utils.getByTestId('x');
    fireEvent.click(checkbox_to);
    const checkbox_option = utils.getByTestId('2');
    fireEvent.click(checkbox_option);

    const button = utils.getByText('Carpool Request');
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
