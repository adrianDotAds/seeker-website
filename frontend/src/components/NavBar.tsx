import React from "react";
import { useState } from "react";

// Logos, Icons etc can be imported here
import logo from '../assets/logo.png';
import user from '../assets/user2.png';

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
            
            <div className="nav-btn-group">
                <button className="nav-button">
                    QUEST
                </button>
                <button className="nav-button">
                    SUBGUILDS
                </button>
                <button className="nav-button"  >
                    RANKER'S HALL
                </button>
                <button className="nav-button">
                    SCROLLS
                </button>
                <button className="nav-button"  >
                    CODEX
                </button>
            </div>
                

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