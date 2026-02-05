
// Logos, Icons etc can be imported here
import logo from '../assets/logo.png';
import user from '../assets/user2.png';

function NavBarButtonClick({ activeButton, onButtonClick }: { activeButton: string, onButtonClick: (buttonName: string) => void }) {


    return (
        <>
            <div className="nav-btn-group">
                <button className={`nav-button ${activeButton === 'QUEST' ? 'active' : ''}`} onClick={() => { onButtonClick('QUEST')}}>
                    QUEST
                </button>
                <button className={`nav-button ${activeButton === 'SUBGUILDS' ? 'active' : ''}`} onClick={() => { onButtonClick('SUBGUILDS')}}>
                    SUBGUILDS
                </button>
                <button className={`nav-button ${activeButton === 'RANKERS_HALL' ? 'active' : ''}`} onClick={() => { onButtonClick('RANKERS_HALL')}} style={{ fontSize: 'clamp(10px, 2vw, 16px)' }}>
                    RANKER'S HALL
                </button>
                <button className={`nav-button ${activeButton === 'SCROLLS' ? 'active' : ''}`} onClick={() => { onButtonClick('SCROLLS')}}>
                    SCROLLS
                </button>
                <button className={`nav-button ${activeButton === 'CODEX' ? 'active' : ''}`} onClick={() => { onButtonClick('CODEX')}}>
                    CODEX
                </button>
            </div>
        </>
    );
}

function NavBar({ activeButton, onButtonClick }: { activeButton: string, onButtonClick: (buttonName: string) => void }) {
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
            
            <NavBarButtonClick activeButton={activeButton} onButtonClick={onButtonClick} />
                
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