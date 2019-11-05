import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Introduction from './Introduction';

describe('<Introduction />', () => {

  it('SHOULD match with snapshot', async () => {
    const mockOnStart = jest.fn();
    const { container } = render(<Introduction onStart={mockOnStart} />);
    expect(container).toMatchSnapshot();
  });

  it('should button click', async() =>{
    const mockOnStart = jest.fn();
    const container = render(<Introduction onStart={mockOnStart}/>);
    const startButton = container.getByText('Start!');
    fireEvent.click(startButton);;
    expect(mockOnStart).toHaveBeenCalledTimes(1);
  });
});