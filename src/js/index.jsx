import React from 'react';
import ReactDOM from 'react-dom/client';
import CarRainbow from './CarRainbow';
import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('app')).render(
    <ErrorBoundary>
        <CarRainbow />
    </ErrorBoundary>
);
