import React, { useRef } from 'react';

const THEME_OPTIONS = [
    { value: 'system', label: 'System' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
];

function Settings({ theme, onThemeChange }) {
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
