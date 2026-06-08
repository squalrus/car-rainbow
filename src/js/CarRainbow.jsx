import React, { useEffect, useRef, useState } from 'react';
import Car from './Car';
import RAINBOW_COLORS, { EXTENDED_COLORS } from './colors';
import Footer from './Footer';
import GameStatus from './GameStatus';
import Popper from './Popper';
import Replay from './Replay';
import Settings from './Settings';
import { playCheckSound, playReplaySound, playWinSong } from './sound';

const WINS_STORAGE_KEY = 'car-rainbow-wins';
const THEME_STORAGE_KEY = 'car-rainbow-theme';
const EXTENDED_COLORS_STORAGE_KEY = 'car-rainbow-extended-colors';

function buildColors(extendedColors) {
    const palette = extendedColors ? [...RAINBOW_COLORS, ...EXTENDED_COLORS] : RAINBOW_COLORS;
    return palette.map(({ id, name, hex }) => ({ id, name, hex, active: false }));
}

function createGameData(extendedColors) {
    return {
        wins: Number(localStorage.getItem(WINS_STORAGE_KEY)) || 0,
        colors: buildColors(extendedColors),
    };
}

function CarRainbow() {
    const [extendedColors, setExtendedColors] = useState(() => localStorage.getItem(EXTENDED_COLORS_STORAGE_KEY) === 'true');
    const [data, setData] = useState(() => createGameData(extendedColors));
    const [showPopper, setShowPopper] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'system');
    const replayRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(WINS_STORAGE_KEY, String(data.wins));
    }, [data.wins]);

    useEffect(() => {
        if (theme === 'system') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem(THEME_STORAGE_KEY);
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
    }, [theme]);

    const cars = data.colors.map((color, index) => {
        const updatedColor = { ...color, index: index };
        return <Car key={`${data.wins}-${index}`} color={updatedColor} onClick={carClick} />;
    });

    const activeCount = data.colors.filter((color) => color.active).length;

    const segmentSize = 360 / data.colors.length;
    const frameGradient = `conic-gradient(${data.colors
        .map((color, index) => {
            const fill = color.active ? color.hex : 'rgba(43, 45, 66, 0.1)';
            return `${fill} ${index * segmentSize}deg ${(index + 1) * segmentSize}deg`;
        })
        .join(', ')})`;

    function replayClick() {
        playReplaySound();
        replayRef.current?.close();
        setShowPopper(false);
        setData((previousData) => ({
            wins: previousData.wins + 1,
            colors: previousData.colors.map((color) => ({ ...color, active: false })),
        }));
    }

    function resetWins() {
        setData((previousData) => ({ ...previousData, wins: 0 }));
    }

    function changeExtendedColors(enabled) {
        setExtendedColors(enabled);
        localStorage.setItem(EXTENDED_COLORS_STORAGE_KEY, String(enabled));
        setShowPopper(false);
        replayRef.current?.close();
        setData((previousData) => ({ wins: previousData.wins, colors: buildColors(enabled) }));
    }

    function carClick(index) {
        const updatedColors = data.colors.map((color, i) => (i === index ? { ...color, active: !color.active } : color));

        playCheckSound(updatedColors[index].active);

        if (updatedColors.every((color) => color.active)) {
            playWinSong();
            setShowPopper(true);
            replayRef.current?.showModal();
        }

        setData({ ...data, colors: updatedColors });
    }

    return (
        <div className="app-frame" style={{ '--app-frame-gradient': frameGradient }}>
            <Settings
                theme={theme}
                onThemeChange={setTheme}
                wins={data.wins}
                onResetWins={resetWins}
                extendedColors={extendedColors}
                onExtendedColorsChange={changeExtendedColors}
            />
            <div className="app-card">
                <GameStatus wins={data.wins} activeCount={activeCount} totalCount={data.colors.length} />
                <div className={`car-rainbow ${extendedColors ? 'car-rainbow--extended' : ''}`}>{cars}</div>
                <Replay ref={replayRef} replayClick={replayClick} />
                <Popper active={showPopper} />
                <Footer />
            </div>
        </div>
    );
}

export default CarRainbow;
