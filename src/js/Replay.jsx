import React, { forwardRef, useState } from 'react';

const COPIED_MESSAGE_DURATION = 2000;

const Replay = forwardRef(function Replay(props, ref) {
    const [copied, setCopied] = useState(false);
    const canShare = typeof navigator.share === 'function';

    async function shareResult() {
        if (canShare) {
            try {
                await navigator.share({ text: props.shareText });
            } catch (error) {
                // user dismissed the share sheet — nothing to report
            }
            return;
        }

        await navigator.clipboard.writeText(props.shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), COPIED_MESSAGE_DURATION);
    }

    return (
        <dialog ref={ref} className="dialog" aria-labelledby="replay-title">
            <h3 id="replay-title" className="dialog__title">
                🌈 You did it! 🌈
            </h3>
            <div className="dialog__options">
                <button type="button" className="button" onClick={() => props.replayClick()}>
                    Play again!
                </button>
                <button type="button" className="button button--ghost" onClick={shareResult}>
                    {canShare ? 'Share result' : copied ? 'Copied!' : 'Copy result'}
                </button>
                <p className="dialog__share-preview" aria-live="polite">
                    {props.shareText}
                </p>
            </div>
        </dialog>
    );
});

export default Replay;
