import React from 'react';

function Replay(props) {
    return (
        <dialog id="replay" className="dialog">
            <h3 className="dialog__title">🌈 You did it! 🌈</h3>
            <div className="dialog__options">
                <button type="button" className="button" onClick={() => props.replayClick()}>
                    Play again!
                </button>
            </div>
        </dialog>
    );
}

export default Replay;
