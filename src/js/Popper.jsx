import React, { useMemo } from 'react';

const EMOJIS = ['🌈', '🚗', '🚙', '🚕', '🏎️', '🚓', '🚌', '🚐'];
const PIECE_COUNT = 28;

function randomPiece(index) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 240;

    return {
        id: index,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.round(Math.cos(angle) * distance),
        y: Math.round(Math.sin(angle) * distance),
        rotation: Math.round(Math.random() * 720 - 360),
        delay: (Math.random() * 0.3).toFixed(2),
        duration: (1.1 + Math.random() * 0.9).toFixed(2),
    };
}

function Popper(props) {
    const pieces = useMemo(() => {
        if (!props.active) {
            return [];
        }

        return Array.from({ length: PIECE_COUNT }, (_, index) => randomPiece(index));
    }, [props.active]);

    if (!props.active) {
        return null;
    }

    return (
        <div className="popper" aria-hidden="true">
            {pieces.map((piece) => (
                <span
                    key={piece.id}
                    className="popper__piece"
                    style={{
                        '--popper-x': `${piece.x}px`,
                        '--popper-y': `${piece.y}px`,
                        '--popper-rotation': `${piece.rotation}deg`,
                        '--popper-delay': `${piece.delay}s`,
                        '--popper-duration': `${piece.duration}s`,
                    }}
                >
                    {piece.emoji}
                </span>
            ))}
        </div>
    );
}

export default Popper;
