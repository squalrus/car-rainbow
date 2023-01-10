import React from 'react';

function GameStatus(props) {
    let progress = 0;
    let max = 0;

    props.game.colors.forEach((element) => {
        max += 1;
        if (element.active) {
            progress += 1;
        }
    });

    return (
        <dl className="game-status">
            <div className="game-status__item">
                <dt>Wins</dt>
                <dd>{props.game.wins}</dd>
            </div>
            <div className="game-status__item">
                <dt>
                    <label htmlFor="progress">Progress</label>
                </dt>
                <dd>
                    <progress id="progress" className="game-status__progress" max={max} value={progress}></progress>
                </dd>
            </div>
        </dl>
    );
}

export default GameStatus;
