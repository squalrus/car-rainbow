import React, { useRef } from 'react';

const THEME_OPTIONS = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
];

const DIFFICULTY_OPTIONS = [
    { value: 'easy', label: 'Easy' },
    { value: 'hard', label: 'Hard' },
];

function Settings({ theme, onThemeChange, wins, onResetWins, extendedColors, onExtendedColorsChange, difficulty, onDifficultyChange }) {
    const dialogRef = useRef(null);

    function open() {
        dialogRef.current?.showModal();
    }

    function close() {
        dialogRef.current?.close();
    }

    function handleBackdropClick(event) {
        if (event.target === dialogRef.current) {
            close();
        }
    }

    function resetWins() {
        if (window.confirm('Reset your win count back to 0?')) {
            onResetWins();
        }
    }

    return (
        <>
            <button type="button" className="settings-trigger" aria-label="Settings" aria-haspopup="dialog" onClick={open}>
                <span aria-hidden="true">⚙️</span>
            </button>
            <dialog ref={dialogRef} className="dialog dialog--settings" aria-labelledby="settings-title" onClick={handleBackdropClick}>
                <h3 id="settings-title" className="dialog__title">
                    Settings
                </h3>
                <fieldset className="settings__group">
                    <legend className="settings__legend">Theme</legend>
                    {THEME_OPTIONS.map((option) => (
                        <label key={option.value} className="settings__option">
                            <input type="radio" name="theme" value={option.value} checked={theme === option.value} onChange={() => onThemeChange(option.value)} />
                            {option.label}
                        </label>
                    ))}
                </fieldset>
                <fieldset className="settings__group">
                    <legend className="settings__legend">Difficulty</legend>
                    {DIFFICULTY_OPTIONS.map((option) => (
                        <label key={option.value} className="settings__option">
                            <input type="radio" name="difficulty" value={option.value} checked={difficulty === option.value} onChange={() => onDifficultyChange(option.value)} />
                            {option.label}
                        </label>
                    ))}
                    <p className="settings__hint">Hard mode requires finding the cars in rainbow order — and restarts the board.</p>
                </fieldset>
                <fieldset className="settings__group">
                    <legend className="settings__legend">Colors</legend>
                    <label className="settings__toggle">
                        <input type="checkbox" checked={extendedColors} onChange={(event) => onExtendedColorsChange(event.target.checked)} />
                        <span className="settings__toggle-track" aria-hidden="true"></span>
                        Extended car colors
                    </label>
                    <p className="settings__hint">Adds six more cars — black, white, brown, pink, silver &amp; pattern — and restarts the board.</p>
                </fieldset>
                <fieldset className="settings__group">
                    <legend className="settings__legend">Win count</legend>
                    <p className="settings__hint">
                        You've won {wins} {wins === 1 ? 'time' : 'times'}.
                    </p>
                    <button type="button" className="button button--ghost" onClick={resetWins}>
                        Reset wins
                    </button>
                </fieldset>
                <div className="dialog__options">
                    <button type="button" className="button" onClick={close}>
                        Done
                    </button>
                </div>
            </dialog>
        </>
    );
}

export default Settings;
