import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Car from './Car';

describe('Car', () => {
    it('renders the color name and an unselected label', () => {
        render(<Car color={{ id: 'red', name: 'Red', active: false, index: 0 }} onClick={() => {}} />);

        expect(screen.getByRole('heading', { name: 'Red' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Red car, not selected. Tap to select.' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('reflects the active state in its label and aria-pressed', () => {
        render(<Car color={{ id: 'red', name: 'Red', active: true, index: 0 }} onClick={() => {}} />);

        expect(screen.getByRole('button', { name: 'Red car, selected. Tap to unselect.' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onClick with the car index when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Car color={{ id: 'red', name: 'Red', active: false, index: 2 }} onClick={handleClick} />);

        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledWith(2);
    });
});
