import React, { forwardRef } from 'react';

const Replay = forwardRef(function Replay(props, ref) {
    return (
        <dialog ref={ref} className="dialog" aria-labelledby="replay-title">
            <h3 id="replay-title" className="dialog__title">
                🌈 You did it! 🌈
            </h3>
            <div className="dialog__options">
                <button type="button" className="button" onClick={() => props.replayClick()}>
                    Play again!
                </button>
            </div>
        </dialog>
    );
});

export default Replay;
