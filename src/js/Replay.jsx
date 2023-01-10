import React from 'react';

function Replay(props) {
    return (
        <dialog id="replay" className="dialog">
            <h3 className="dialog__title">You won! Play again?</h3>
            <ul className="dialog__options">
                <li>
                    <button type="button" className="button" onClick={() => props.replayClick()}>
                        Yes
                    </button>
                </li>
                <li>
                    <button type="button" className="button" onClick={() => props.cancelClick()}>
                        No
                    </button>
                </li>
            </ul>
        </dialog>
    );
}

export default Replay;
