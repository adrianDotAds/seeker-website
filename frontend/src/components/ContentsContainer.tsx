import { useState } from "react";

import styles from './MainStyle.module.css';

const questNavBtnActive = {
    fontSize: '1.2vw',
    width: '90%',
    height: '80%',
    backgroundImage: 'none',
    borderTop: '3px solid #B89E68',
    borderRadius: '12px 12px 0px 0px',
    backgroundColor: 'green',
    color: '#004AAD',
}

const questNavContents = {
    fontSize: 'clamp(7px, 2vw, 15px)',
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
};

// QuestButton Contents Styles
const questButtonContentsStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

const QUESTContentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    height: '90%',
};

// Main Contents Container Component - Ito yung irerender sa dashboard depende sa active button [Quest, Subguilds, Rankers Hall, Scrolls, Codex]
function ContentsContainer({ activeButton }: { activeButton: string }) {
    return (
        <>
            {/* Contents Container - Ipapakita sa contents under navbar */}
            <div className={styles.contentsContainer} style={{ display: activeButton === 'LOGO' ? 'none' : 'flex', fontFamily: 'Cinzel, serif', color: '#004AAD' }}>
                {activeButton === 'QUEST' && <QUESTContent />}
                {activeButton === 'SUBGUILDS' && <SUBGUILDSContent />}
                {activeButton === 'RANKERS_HALL' && <RANKERS_HALLContent />}
                {activeButton === 'SCROLLS' && <SCROLLSContent />}
                {activeButton === 'CODEX' && <CODEXContent />}
            </div>
            <div className={styles.homeContainer} style={{display: activeButton === 'LOGO' ? 'block' : 'none'}}>
                {activeButton === 'LOGO' && <div>Our Journey</div>}
            </div>
        </>
            
    );
}

// QUEST Content Component
function QUESTContent() {
    // State to manage active tab [Events, Hackatons, Workshops, Recreational, Online Learning]
    const [activeQuestTab, setActiveQuestTab] = useState('EVENTS');
    
    function EventTab() {
        return (
            <div style={questNavContents}>
                EVENT TAB CONTENT
            </div>
        );
    }

    function HackatonTab() {
        return (
            <div style={questNavContents}>
                HACKATON TAB CONTENT
            </div>
        );
    }

    function WorkShopTab() {
        return (
            <div style={questNavContents}>
                WORKSHOP TAB CONTENT
            </div>
        );
    }

    function RecreationalTab() {
        return (
            <div style={questNavContents}>
                RECREATIONAL TAB CONTENT
            </div>
        );
    }

    function OnlineLearningTab() {
        return (
            <div style={questNavContents}>
                ONLINE LEARNING TAB CONTENT
            </div>
        );
    }

    return (
        // QUEST Container with Navigation Bar
        <div className={styles.questContainer}>
            <div className={styles.questNavBar}>
                <button className={activeQuestTab === 'EVENTS' ? styles.questNavBtnActive : styles.questNavBtn} onClick={() => setActiveQuestTab('EVENTS')}>
                    EVENTS
                </button>
                <button className={activeQuestTab === 'HACKATONS' ? styles.questNavBtnActive : styles.questNavBtn} onClick={() => setActiveQuestTab('HACKATONS')}>
                    HACKATONS
                </button>
                <button className={activeQuestTab === 'WORKSHOPS' ? styles.questNavBtnActive : styles.questNavBtn} onClick={() => setActiveQuestTab('WORKSHOPS')}>
                    WORKSHOPS
                </button>
                <button className={activeQuestTab === 'RECREATIONAL' ? styles.questNavBtnActive : styles.questNavBtn} onClick={() => setActiveQuestTab('RECREATIONAL')}>
                    RECREATIONAL
                </button>
                <button className={activeQuestTab === 'ONLINE_LEARNING' ? styles.questNavBtnActive : styles.questNavBtn} onClick={() => setActiveQuestTab('ONLINE_LEARNING')}>
                    ONLINE LEARNING
                </button>
            </div>

            {/* QUEST Contents based on active tab */}
            <div className="quest-content" style={QUESTContentStyle}>
            {activeQuestTab === 'EVENTS' && <EventTab />}
            {activeQuestTab === 'HACKATONS' && <HackatonTab />}
            {activeQuestTab === 'WORKSHOPS' && <WorkShopTab />}
            {activeQuestTab === 'RECREATIONAL' && <RecreationalTab />}
            {activeQuestTab === 'ONLINE_LEARNING' && <OnlineLearningTab />}
            </div>
            

        </div>
    );
}

// SUBGUILDS Content Component
function SUBGUILDSContent() {
    return (
        <div>
            SUBGUILDS CONTENT
        </div>
    );
}

// RANKERS HALL Content Component
function RANKERS_HALLContent() {
    return (
        <div>
            RANKERS HALL CONTENT
        </div>
    );
}

// SCROLLS Content Component
function SCROLLSContent() {
    return (
        <div>
            SCROLLS CONTENT
        </div>
    );
}

// CODEX Content Component
function CODEXContent() {
    return (
        <div>
            CODEX CONTENT
        </div>
    );
}

export default ContentsContainer;