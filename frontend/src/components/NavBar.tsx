import React from "react";
import { useState } from "react";

// Logos, Icons etc can be imported here
import logo from '../assets/logo.png';
import user from '../assets/user2.png';

function NavBarButtonClick() {
    const [activeButton, setActiveButton] = useState('QUEST');

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    return (
        <>
            <div className="nav-btn-group">
                <button className={`nav-button ${activeButton === 'QUEST' ? 'active' : ''}`} onClick={() => handleButtonClick('QUEST')}>
                    QUEST
                </button>
                <button className={`nav-button ${activeButton === 'SUBGUILDS' ? 'active' : ''}`} onClick={() => handleButtonClick('SUBGUILDS')}>
                    SUBGUILDS
                </button>
                <button className={`nav-button ${activeButton === 'RANKERS_HALL' ? 'active' : ''}`} onClick={() => handleButtonClick('RANKERS_HALL')}>
                    RANKER'S HALL
                </button>
                <button className={`nav-button ${activeButton === 'SCROLLS' ? 'active' : ''}`} onClick={() => handleButtonClick('SCROLLS')}>
                    SCROLLS
                </button>
                <button className={`nav-button ${activeButton === 'CODEX' ? 'active' : ''}`} onClick={() => handleButtonClick('CODEX')}>
                    CODEX
                </button>
            </div>
        </>
    );
}

function NavBar() {
    return (
        <div className="nav-bar">

            <a>
                <img src={logo} alt="Seeker 2.Q Logo" 
                className="nav-logo" 
                style={{
                    width: 'clamp(40px, 5vw, 60px)',
                    height: 'auto',
                    // width: '70px'
                }}/>
            </a>
            
            <NavBarButtonClick />
                
            <a>
                <img src={user} alt="User Icon"
                className="nav-user-icon" 
                style={{
                    width: 'clamp(40px, 5vw, 60px)',
                    height: 'auto',
                }}/>
            </a>
            
        </div>
    );
}

export default NavBar;