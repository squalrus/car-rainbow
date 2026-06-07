let audioContext;

function getContext() {
    if (!audioContext) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContextClass();
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    return audioContext;
}

function playTone(context, frequency, startTime, duration, type, peakGain) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

export function playCheckSound(active) {
    const context = getContext();
    playTone(context, active ? 660 : 392, context.currentTime, 0.14, 'triangle', 0.12);
}

export function playReplaySound() {
    const context = getContext();
    const now = context.currentTime;
    playTone(context, 392, now, 0.12, 'sine', 0.1);
    playTone(context, 523.25, now + 0.08, 0.16, 'sine', 0.1);
}

// A short victory melody, played note by note like a tiny MIDI tune.
const WIN_SONG = [
    [523.25, 0.16], // C5
    [659.25, 0.16], // E5
    [783.99, 0.16], // G5
    [1046.5, 0.3], // C6
    [783.99, 0.16], // G5
    [1046.5, 0.45], // C6
];

export function playWinSong() {
    const context = getContext();
    let time = context.currentTime + 0.05;

    WIN_SONG.forEach(([frequency, duration]) => {
        playTone(context, frequency, time, duration, 'square', 0.15);
        time += duration * 0.85;
    });
}
