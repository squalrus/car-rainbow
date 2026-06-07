import React from 'react';
import { version } from '../../package.json';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="footer__version">v{version}</p>
            <p className="footer__credit">
                © {year} Chad Schulz · Built by{' '}
                <a className="footer__link" href="https://squalr.us" target="_blank" rel="noreferrer">
                    Chad Schulz
                </a>
            </p>
        </footer>
    );
}

export default Footer;
