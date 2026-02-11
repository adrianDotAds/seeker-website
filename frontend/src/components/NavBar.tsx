// React Imports
import React, { useState } from 'react';
// Logos, Icons etc can be imported here
import logo from '../assets/logo.png';
import user from '../assets/user2.png';
import styles from './MainStyle.module.css';

// Components
import Profile from './Profile';

function NavBar({ activeButton, onButtonClick, handleLogout }: { activeButton: string, onButtonClick: (buttonName: string) => void, handleLogout: () => void }) {
    /* This is the Main navigation bar component to navigate between different sections */
    // Base height and width: 10% and 100% of the dashboard respectively
    
    // Variable Declarations
    const [isProfileVisible, setProfileVisible] = useState(false);
    
    function Main() {

        console.log(isProfileVisible)
        // Change styles based on window size
        if (window.innerWidth && window.innerWidth < 768) {
            // Mobile view adjustments
        }

        return (
            <div className={styles.navBarContainer}>
                <div style={{height:'100%', width:'10%'}}>
                    <img src={logo} alt="Logo" className={styles.imageStyle}/>
                </div>
                <div className={styles.navBarButtons}>
                    <div className={styles.hideOnMobile}>
                        <ClickableButton activeButton={activeButton} onButtonClick={onButtonClick} />
                    </div>
                </div>
                <div style={{height:'100%', width:'10%'}}>
                    <img src={user} alt="User" className={styles.imageStyle} onClick={() => profileToggle(isProfileVisible, setProfileVisible)}/>
                    <div className={styles.profileTab}>
                        <Profile handleLogout={() => {handleLogout()}}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        Main()
    );
}

function profileToggle(isProfileVisible: boolean, setProfileVisible: React.Dispatch<React.SetStateAction<boolean>>) {
    setProfileVisible(!isProfileVisible);
    // Display profile tab if isProfileVisible is True
    const profileTabElement = document.querySelector(`.${styles.profileTab}`) as HTMLElement;
    if (!isProfileVisible) {
        profileTabElement.style.display = 'block';
    }
    else {
        profileTabElement.style.display = 'none';
    }
}

export function ClickableButton({ activeButton, onButtonClick }: { activeButton: string, onButtonClick: (buttonName: string) => void }) {
    /* This component renders clickable buttons for navigation */
    function Main() {
        return (
            <div className={styles.navBarButtons}>
                <button className={`${styles.navButton} ${activeButton === 'QUEST' ? styles.active : ''}`} onClick={() => { onButtonClick('QUEST')}}>
                    QUEST
                </button>
                <button className={`${styles.navButton} ${activeButton === 'SUBGUILDS' ? styles.active : ''}`} onClick={() => { onButtonClick('SUBGUILDS')}}>
                    SUBGUILDS
                </button>
                <button className={`${styles.navButton} ${activeButton === 'RANKERS_HALL' ? styles.active : ''}`} onClick={() => { onButtonClick('RANKERS_HALL')}}>
                    RANKER'S HALL
                </button>
                <button className={`${styles.navButton} ${activeButton === 'SCROLLS' ? styles.active : ''}`} onClick={() => { onButtonClick('SCROLLS')}}>
                    SCROLLS
                </button>
                <button className={`${styles.navButton} ${activeButton === 'CODEX' ? styles.active : ''}`} onClick={() => { onButtonClick('CODEX')}}>
                    CODEX
                </button>
            </div>
        );
    }
    return (
        Main()
    );
}

export default NavBar;