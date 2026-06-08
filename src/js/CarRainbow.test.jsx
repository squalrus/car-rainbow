import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CarRainbow from './CarRainbow';
import { playCheckSound, playReplaySound, playWinSong } from './sound';

vi.mock('./sound', () => ({
    playCheckSound: vi.fn(),
    playReplaySound: vi.fn(),
    playWinSong: vi.fn(),
}));

const COLOR_NAMES = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];

function getCarButton(name) {
    return screen.getByRole('button', { name: new RegExp(`^${name} car`) });
}

async function findAllCars(user) {
    for (const name of COLOR_NAMES) {
        await user.click(getCarButton(name));
    }
}

describe('CarRainbow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all six cars unselected', () => {
        render(<CarRainbow />);

        COLOR_NAMES.forEach((name) => {
            expect(getCarButton(name)).toHaveAttribute('aria-pressed', 'false');
        });
    });

    it('toggles a car active state and plays the check sound on click', async () => {
        const user = userEvent.setup();
        render(<CarRainbow />);

        const redCar = getCarButton('Red');
        await user.click(redCar);

        expect(redCar).toHaveAttribute('aria-pressed', 'true');
        expect(playCheckSound).toHaveBeenLastCalledWith(true);

        await user.click(redCar);

        expect(redCar).toHaveAttribute('aria-pressed', 'false');
        expect(playCheckSound).toHaveBeenLastCalledWith(false);
    });

    it('only activates the next car in rainbow order when in hard mode', async () => {
        const user = userEvent.setup();
        localStorage.setItem('car-rainbow-difficulty', 'hard');
        render(<CarRainbow />);

        const orangeCar = getCarButton('Orange');
        const redCar = getCarButton('Red');

        await user.click(orangeCar);

        expect(orangeCar).toHaveAttribute('aria-pressed', 'false');
        expect(playCheckSound).toHaveBeenLastCalledWith(false);

        await user.click(redCar);

        expect(redCar).toHaveAttribute('aria-pressed', 'true');
        expect(playCheckSound).toHaveBeenLastCalledWith(true);
    });

    it('shows the win dialog and popper once every car is active', async () => {
        const user = userEvent.setup();
        render(<CarRainbow />);

        await findAllCars(user);

        expect(playWinSong).toHaveBeenCalledTimes(1);
        expect(screen.getByRole('dialog')).toHaveAttribute('open');
        expect(screen.getByText('🌈 You did it! 🌈')).toBeInTheDocument();
    });

    it('resets the board and increments wins on replay', async () => {
        const user = userEvent.setup();
        render(<CarRainbow />);

        await findAllCars(user);
        await user.click(screen.getByRole('button', { name: 'Play again!' }));

        expect(playReplaySound).toHaveBeenCalledTimes(1);
        expect(screen.getByText('1')).toBeInTheDocument();
        COLOR_NAMES.forEach((name) => {
            expect(getCarButton(name)).toHaveAttribute('aria-pressed', 'false');
        });
        const replayDialog = screen.getAllByRole('dialog', { hidden: true }).find((dialog) => dialog.textContent.includes('You did it'));
        expect(replayDialog).not.toHaveAttribute('open');
    });

    it('persists the win count to localStorage across mounts', async () => {
        const user = userEvent.setup();
        const { unmount } = render(<CarRainbow />);

        await findAllCars(user);
        await user.click(screen.getByRole('button', { name: 'Play again!' }));

        expect(localStorage.getItem('car-rainbow-wins')).toBe('1');

        unmount();
        render(<CarRainbow />);

        expect(screen.getByText('1')).toBeInTheDocument();
    });
});
