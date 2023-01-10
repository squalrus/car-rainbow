import React from 'react';

function Car(props) {
    const selectText = props.color.active ? `Unselect ${props.color.name} car!` : `Select ${props.color.name} car!`;
    const checkText = props.color.active ? `${props.color.name} car active` : `${props.color.name} car inactive`;
    const checkState = props.color.active ? 'checked' : '';

    return (
        <div key={props.color.index} className={`car car--${props.color.id} ${props.color.active ? 'car--active' : ''}`}>
            <h2>{props.color.name}</h2>
            <input type="button" title={selectText} className="car__selector" onClick={() => props.onClick(props.color.index)} />
            <input type="checkbox" className="car__status" onClick={() => props.onClick(props.color.index)} checked={checkState} title={checkText} />
        </div>
    );
}

export default Car;
