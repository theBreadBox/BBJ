import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/BBJ_LOGO1.png.webp'
import clouds from '../images/clouds.png'

const Nav = () => {
    let navRef = useRef(null);
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const onScroll = e => {
            if (e.target.documentElement.scrollTop > navRef.current.clientHeight) { setIsScroll(true); }
            else { setIsScroll(false); }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, []);


    return (
        

        <nav ref={navRef} className={`navbar navbar-expand-lg navbar-dark fixed-top navbar-fixed-top ${isScroll ? "scrolled" : ""}`}>
            <div className="navbar">
                
                <button
                    className="navbar-toggler"
                    color="white"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                >
                    <span className="navbar-toggler-icon"> </span>
                </button>
            </div>

            <div
                className="collapse navbar-collapse order-3 order-lg-2"
                id="navbarNavDropdown"
            >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://discord.gg/n5XQrMBy"><span className="fab fa-discord"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://twitter.com/alivacious"><span className="fab fa-twitter"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://www.instagram.com/alivacious/"><span className="fab fa-instagram"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://opensea.io/collection/alivacious"><span className="fa fa-ship"></span></a>
                    </li>
                </ul>
            </div>

            <a href="#">
                <img
                    width="50px"
                    height="50px"
                    padding-left="-10px"
                    src={logo}
                    className="d-inline-block align-top footer-logo"
                                    
                    />
                
            </a>

            

        </nav>

    )
}

export default Nav
