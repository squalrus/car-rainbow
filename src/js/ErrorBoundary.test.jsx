import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Bomb() {
    throw new Error('Boom');
}

describe('ErrorBoundary', () => {
    it('renders children when nothing throws', () => {
        render(
            <ErrorBoundary>
                <p>All good</p>
            </ErrorBoundary>
        );

        expect(screen.getByText('All good')).toBeInTheDocument();
    });

    it('renders a fallback with a reload button when a child throws', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <Bomb />
            </ErrorBoundary>
        );

        expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument();

        console.error.mockRestore();
    });
});
