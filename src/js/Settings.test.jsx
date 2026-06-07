import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';

describe('Settings', () => {
    it('opens the settings dialog from the trigger button', async () => {
        const user = userEvent.setup();
        render(<Settings theme="system" onThemeChange={vi.fn()} />);

        expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('open');

        await user.click(screen.getByRole('button', { name: 'Settings' }));

        expect(screen.getByRole('dialog')).toHaveAttribute('open');
        expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument();
    });

    it('marks the active theme option and reports changes', async () => {
        const user = userEvent.setup();
        const onThemeChange = vi.fn();
        render(<Settings theme="system" onThemeChange={onThemeChange} />);

        await user.click(screen.getByRole('button', { name: 'Settings' }));

        expect(screen.getByRole('radio', { name: 'System' })).toBeChecked();

        await user.click(screen.getByRole('radio', { name: 'Dark' }));

        expect(onThemeChange).toHaveBeenCalledWith('dark');
    });

    it('closes the dialog from the Done button', async () => {
        const user = userEvent.setup();
        render(<Settings theme="system" onThemeChange={vi.fn()} />);

        await user.click(screen.getByRole('button', { name: 'Settings' }));
        await user.click(screen.getByRole('button', { name: 'Done' }));

        expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute('open');
    });
});
