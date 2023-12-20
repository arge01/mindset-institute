import { render, screen } from '@testing-library/react';

import Home from '@pages/index';

test('my title', () => {
  render(<Home />);
  const myTitle = screen.getByText(/Arif GEVENCİ/i);
  expect(myTitle).toBeInTheDocument();
});
