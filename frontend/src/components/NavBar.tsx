// React Imports

// Logos, Icons etc can be imported here
import logo from '../assets/logo.png';
import user from '../assets/user2.png';

function NavBar({ activeButton, onButtonClick }: { activeButton: string, onButtonClick: (buttonName: string) => void }) {
    /* This is the Main navigation bar component to navigate between different sections */
    // Base height and width: 10% and 100% of the dashboard respectively
    function Main() {
        const navBarButtonsStyle: React.CSSProperties = {
            height: '100%', 
            width: '77%'
        };

        // Change styles based on window size
        if (window.innerWidth && window.innerWidth < 768) {
            // Mobile view adjustments
            navBarButtonsStyle.visibility = 'hidden' as 'hidden';
        }

        return (
            <div className='navBarContainerStyle' style={navBarContainerStyle}>
                <div style={{height:'100%', width:'10%'}}>
                    <img src={logo} alt="Logo" style={imageStyle} />
                </div>
                <div className='navBarButtonsStyle' style={navBarButtonsStyle}>
                    <div className='hideOnMobile'>
                        <ClickableButton activeButton={activeButton} onButtonClick={onButtonClick} />
                    </div>
                </div>
                <div style={{height:'100%', width:'10%'}}>
                    <img src={user} alt="User" style={imageStyle}/>
                </div>
            </div>
        );
    }

    
    const navBarContainerStyle: React.CSSProperties = {
        backgroundColor: '#065c22', //To Delete later
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        alignItems: 'center',
        flexDirection: 'row' as 'row',
        justifyContent: 'center',
    };

    const imageStyle: React.CSSProperties = {
        // Size
        width: '100%',
        height: '100%',

        // Content
        objectFit: 'contain' as 'contain',
    };
    return (
        Main()
    );
}

export function ClickableButton({ activeButton, onButtonClick }: { activeButton: string, onButtonClick: (buttonName: string) => void }) {
    /* This component renders clickable buttons for navigation */
    function Main() {
        return (
            <div className='navBarButtonsStyle' style={navBarButtonsStyle}>
                <button className={`nav-button ${activeButton === 'QUEST' ? 'active' : ''}`} onClick={() => { onButtonClick('QUEST')}}>
                    QUEST
                </button>
                <button className={`nav-button ${activeButton === 'SUBGUILDS' ? 'active' : ''}`} onClick={() => { onButtonClick('SUBGUILDS')}}>
                    SUBGUILDS
                </button>
                <button className={`nav-button rhbutt ${activeButton === 'RANKERS_HALL' ? 'active' : ''}`} onClick={() => { onButtonClick('RANKERS_HALL')}}>
                    RANKER'S HALL
                </button>
                <button className={`nav-button ${activeButton === 'SCROLLS' ? 'active' : ''}`} onClick={() => { onButtonClick('SCROLLS')}}>
                    SCROLLS
                </button>
                <button className={`nav-button ${activeButton === 'CODEX' ? 'active' : ''}`} onClick={() => { onButtonClick('CODEX')}}>
                    CODEX
                </button>
            </div>
        );
    }
    // Styles
    const navBarButtonsStyle: React.CSSProperties = {
        // Size
        height: '100%',
        // Flex
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1%',
        // Colors
        backgroundColor: '#065c22', //To Delete later  
    };
    return (
        Main()
    );
}

export default NavBar;