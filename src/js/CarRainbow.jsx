import React, { useEffect, useState } from 'react';
import Car from './Car';
import Footer from './Footer';
import GameStatus from './GameStatus';
import Replay from './Replay';
import { playCheckSound, playReplaySound, playWinSong } from './sound';

const RAINBOW_COLORS = ['#ff3b3b', '#ff9a3b', '#ffd93b', '#4ade80', '#38bdf8', '#a78bfa'];

function CarRainbow() {
    const gameData = {
        wins: 0,
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

    const cars = data.colors.map((color, index) => {
        const updatedColor = { ...color, index: index };
        return <Car key={index} color={updatedColor} onClick={carClick} />;
    });

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
        setData(updatedData);
    }

    function carClick(index) {
        const updatedData = { ...data };
        updatedData.colors[index].active = !updatedData.colors[index].active;

        playCheckSound(updatedData.colors[index].active);

        if (updatedData.colors.every((color) => color.active)) {
            playWinSong();
            document.getElementById('replay').showModal();
        }

        setData(updatedData);
    }

    return (
        <div className="app-frame" style={{ '--app-frame-gradient': frameGradient }}>
            <div className="app-card">
                <GameStatus game={data} />
                <div className="car-rainbow">{cars}</div>
                <Replay replayClick={replayClick} />
                <Footer />
            </div>
        </div>
    );
}

export default CarRainbow;
