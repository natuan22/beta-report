import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';

const { container, getByText, getByTestId } = render(<Home />);
