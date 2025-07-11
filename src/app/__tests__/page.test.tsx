import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/Item-list', () => {
  const MockItemList = () => <div data-testid="item-list" />;
  MockItemList.displayName = 'MockItemList';
  return { __esModule: true, default: MockItemList };
});

import Home from '../page';

describe('Home Page', () => {
  it('renderiza o ItemList', () => {
    render(<Home />);

    expect(screen.getByTestId('item-list')).toBeInTheDocument();
  });
}); 