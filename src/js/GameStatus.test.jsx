import React from 'react';
import { render, screen } from '@testing-library/react';
import GameStatus from './GameStatus';

describe('GameStatus', () => {
    it('displays the win count', () => {
        render(<GameStatus wins={3} activeCount={0} totalCount={6} />);

        expect(screen.getByText('Wins')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('reports progress as the count of active cars out of the total', () => {
        render(<GameStatus wins={3} activeCount={4} totalCount={6} />);

        const progress = screen.getByRole('progressbar');
        expect(progress).toHaveAttribute('value', '4');
        expect(progress).toHaveAttribute('max', '6');
    });
});
