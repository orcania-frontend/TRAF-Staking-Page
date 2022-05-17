/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import { DisconnectButton, useCelesteSelector, ConnectedWrapper, ConnectButton } from '@celeste-js/react';

import { useState, useEffect } from 'react';
import { providers } from '@celeste-js/core/dist/constants';

import NavbarMenu from './navbar-menu';

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise(resolve => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

const getAddressReduced = address => `${address.slice(0, 6)}...${address.slice(-4)}`;

const Navbar = () => {
    // local state
    const [mobileActive, setMobileActive] = useState(false);
    const [burgerActive, setBurgerActive] = useState(false);
    const [bgColor, setBgColor] = useState(false);
    const [scrollingDown, setScrollingDown] = useState(false);

    const { walletReducer } = useCelesteSelector(state => state);

    const handleHamburgerClick = e => {
        e.preventDefault();

        const newValue = !mobileActive;

        setBurgerActive(newValue);

        if (!newValue) {
            animateCSS('.navbar-menu', 'fadeOutLeft').then(() => {
                setMobileActive(newValue);
            });
        } else {
            setMobileActive(newValue);
        }
    };

    useEffect(() => {
        const elmnt = document.getElementById('__next');
        let oldScroll = 0;
        elmnt.addEventListener('scroll', () => {
            if (elmnt.scrollTop > 50) setBgColor(true);
            else setBgColor(false);

            if (oldScroll && oldScroll > elmnt.scrollTop) setScrollingDown(false);
            else setScrollingDown(true);

            oldScroll = elmnt.scrollTop;
        });
    }, []);

    return (
        <nav
            className="navbar has-centered-menu has-font-spacegrotesk is-fixed-top pb-3"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container is-fluid">
                <div className="navbar-brand">
                    <Image className="navbar-item py-2" src="/media/logos/traf-logo.png" width={40} height={52} />
                    <a
                        role="button"
                        className={`navbar-burger has-text-hamber ${burgerActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={handleHamburgerClick}
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div className={`navbar-menu ${mobileActive ? 'is-active animate__animated animate__fadeInLeft' : ''}`}>
                    <div className="navbar-start">
                        <NavbarMenu />
                    </div>
                    <ul className="navbar-end">
                        <li className="navbar-list is-flex is-align-items-center">
                            <ConnectedWrapper
                                disconnectedComponent={
                                    <div className="navbar-item">
                                        <ConnectButton
                                            className="button is-rounded has-text-hamber has-background-hgrao5 has-text-weight-bold is-shadowless is-borderless"
                                            providerType={providers.INJECTED}
                                            onErrorCB={e => {
                                                console.log(e);
                                            }}
                                        >
                                            <span className="icon">
                                                <i className="fas fa-wallet" />
                                            </span>
                                            <span>Connect Wallet</span>
                                        </ConnectButton>
                                    </div>
                                }
                            >
                                <div className="navbar-item dropdown is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button
                                            className="button is-rounded has-text-hamber has-background-hgrao5 has-font-ptmono is-shadowless is-borderless"
                                            type="button"
                                        >
                                            <span>
                                                {walletReducer.address && getAddressReduced(walletReducer.address)}
                                            </span>
                                            <span className="icon is-small">
                                                <i className="fas fa-chevron-down" />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            <div className="dropdown-item">
                                                <DisconnectButton
                                                    className="button is-rounded has-text-hamber has-background-hgrao5 is-shadowless is-borderless"
                                                    type="button"
                                                    onErrorCB={e => {
                                                        console.log(e);
                                                    }}
                                                >
                                                    <span className="icon">
                                                        <i className="fas fa-sign-out-alt" />
                                                    </span>
                                                    <span>Disconnect Wallet</span>
                                                </DisconnectButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ConnectedWrapper>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;