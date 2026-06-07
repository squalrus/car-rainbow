import React from 'react';
import { version } from '../../package.json';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__version">v{version}</p>
        </footer>
    );
}

export default Footer;
