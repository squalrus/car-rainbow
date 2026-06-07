import React from 'react';

function GameStatus({ wins, activeCount, totalCount }) {
    return (
        <dl className="game-status">
            <div className="game-status__item">
                <dt>Wins</dt>
                <dd>{wins}</dd>
            </div>
            <div className="game-status__item">
                <dt>
                    <label htmlFor="progress">Progress</label>
                </dt>
                <dd>
                    <progress id="progress" className="game-status__progress" max={totalCount} value={activeCount}></progress>
                </dd>
            </div>
        </dl>
    );
}

export default GameStatus;
