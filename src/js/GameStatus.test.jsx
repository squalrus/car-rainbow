import React from 'react';
import { render, screen } from '@testing-library/react';
import GameStatus from './GameStatus';

function buildGame(activeCount) {
    return {
        wins: 3,
        colors: Array.from({ length: 6 }, (_, index) => ({ id: `c${index}`, name: `Color ${index}`, active: index < activeCount })),
    };
}

describe('GameStatus', () => {
    it('displays the win count', () => {
        render(<GameStatus game={buildGame(0)} />);

        expect(screen.getByText('Wins')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('reports progress as the count of active cars out of the total', () => {
        render(<GameStatus game={buildGame(4)} />);

        const progress = screen.getByRole('progressbar');
        expect(progress).toHaveAttribute('value', '4');
        expect(progress).toHaveAttribute('max', '6');
    });
});
