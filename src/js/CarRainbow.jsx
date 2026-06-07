import React, { useEffect, useState } from 'react';
import Car from './Car';
import Footer from './Footer';
import GameStatus from './GameStatus';
import Popper from './Popper';
import Replay from './Replay';
import Settings from './Settings';
import { playCheckSound, playReplaySound, playWinSong } from './sound';

const RAINBOW_COLORS = ['#ff3b3b', '#ff9a3b', '#ffd93b', '#4ade80', '#38bdf8', '#a78bfa'];
const WINS_STORAGE_KEY = 'car-rainbow-wins';
const THEME_STORAGE_KEY = 'car-rainbow-theme';

function CarRainbow() {
    const gameData = {
        wins: Number(localStorage.getItem(WINS_STORAGE_KEY)) || 0,
        colors: [
            { id: 'red', name: 'Red', active: false },
            { id: 'orange', name: 'Orange', active: false },
            { id: 'yellow', name: 'Yellow', active: false },
            { id: 'green', name: 'Green', active: false },
            { id: 'blue', name: 'Blue', active: false },
            { id: 'purple', name: 'Purple', active: false },
        ],
    };

    const [data, setData] = useState(gameData);
    const [showPopper, setShowPopper] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'system');

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
            const fill = color.active ? RAINBOW_COLORS[index % RAINBOW_COLORS.length] : 'rgba(43, 45, 66, 0.1)';
            return `${fill} ${index * segmentSize}deg ${(index + 1) * segmentSize}deg`;
        })
        .join(', ')})`;

    function replayClick() {
        const updatedData = { ...data };

        updatedData.wins += 1;
        updatedData.colors = updatedData.colors.map((color) => {
            return { ...color, active: false };
        });

        playReplaySound();
        document.getElementById('replay').close();
        setShowPopper(false);
        setData(updatedData);
    }

    function carClick(index) {
        const updatedData = { ...data };
        updatedData.colors[index].active = !updatedData.colors[index].active;

        playCheckSound(updatedData.colors[index].active);

        if (updatedData.colors.every((color) => color.active)) {
            playWinSong();
            setShowPopper(true);
            document.getElementById('replay').showModal();
        }

        setData(updatedData);
    }

    return (
        <div className="app-frame" style={{ '--app-frame-gradient': frameGradient }}>
            <Settings theme={theme} onThemeChange={setTheme} />
            <div className="app-card">
                <GameStatus wins={data.wins} activeCount={activeCount} totalCount={data.colors.length} />
                <div className="car-rainbow">{cars}</div>
                <Replay replayClick={replayClick} />
                <Popper active={showPopper} />
                <Footer />
            </div>
        </div>
    );
}

export default CarRainbow;
