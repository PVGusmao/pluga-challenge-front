import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../loader';

describe('Loader', () => {
  it('renderiza o spinner', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
}); 