import React, { useEffect, useState } from 'react';
import Car from './Car';
import GameStatus from './GameStatus';
import Replay from './Replay';

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

    function replayClick() {
        const updatedData = { ...data };

        updatedData.wins += 1;
        updatedData.colors = updatedData.colors.map((color) => {
            return { ...color, active: false };
        });

        document.getElementById('replay').close();
        setData(updatedData);
    }

    function carClick(index) {
        const updatedData = { ...data };
        updatedData.colors[index].active = !updatedData.colors[index].active;

        if (updatedData.colors.every((color) => color.active)) {
            document.getElementById('replay').showModal();
        }

        setData(updatedData);
    }

    return (
        <div>
            <GameStatus game={data} />
            <div className="car-rainbow">{cars}</div>
            <Replay replayClick={replayClick} />
        </div>
    );
}

export default CarRainbow;
