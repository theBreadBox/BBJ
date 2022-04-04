import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/BBJ_LOGO1.png.webp';
import clouds from "../images/clouds.png";

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
            <div className="d-flex flex-row order-2 order-lg-3">
                
                <button
                    className="navbar-toggler"
                    color="black"
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
                        <a className="nav-link px-2" href="https://discord.gg/BakedBlueJays"><span className="fab fa-discord"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://twitter.com/BakedBlueJays"><span className="fab fa-twitter"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://www.instagram.com/BakedBlueJays/"><span className="fab fa-instagram"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link px-2" href="https://opensea.io/collection/BakedBlueJays"><span className="fa fa-ship"></span></a>
                    </li>
                </ul>
            </div>

            <a href="#">
                <img
                    width="150px"
                    height="75px"
                    padding-left="10px"
                    src={logo}
                    className="d-inline-block align-top footer-logo"
                                    
                    />
                
            </a>

            

        </nav>

    )
}

export default Nav
