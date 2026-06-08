import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Car Rainbow crashed:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1 className="error-boundary__title">Something went wrong</h1>
                    <p className="error-boundary__message">Car Rainbow hit a snag. Reloading the page should get you back in the game.</p>
                    <button type="button" className="button" onClick={() => window.location.reload()}>
                        Reload
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
