import React from 'react';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Find Donor</a>
                <a className="link link-hover">Blood Bank</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;