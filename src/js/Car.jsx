import React from 'react';

function Car(props) {
    const label = props.color.active ? `${props.color.name} car, selected. Tap to unselect.` : `${props.color.name} car, not selected. Tap to select.`;

    return (
        <div key={props.color.index} className={`car car--${props.color.id} ${props.color.active ? 'car--active' : ''}`} style={{ '--car-index': props.color.index }}>
            <h2 className="car__title">{props.color.name}</h2>
            <button type="button" className="car__selector" aria-pressed={props.color.active} aria-label={label} onClick={() => props.onClick(props.color.index)}>
                <span className="car__status" aria-hidden="true"></span>
            </button>
        </div>
    );
}

export default Car;
