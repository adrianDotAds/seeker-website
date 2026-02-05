import { useState } from "react";

// Styles for QUEST Component
const questStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    width: '100%',
};

const questNavBar = {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: '4px',
    width: '100%',
};

const questNavBtn = {
    backgroundImage: 'none',
    backgroundColor: '#737373',
    gap: '2%',
    color: 'white',
    borderRadius: '12px 12px 0px 0px',
    width: '100%',
};

const questNavBtnActive = {
    width: '100%',
    backgroundImage: 'none',
    borderTop: '3px solid #B89E68',
    borderRadius: '12px 12px 0px 0px',
    backgroundColor: 'white',
    color: '#004AAD',
}

const questNavContents = {
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
};

// Main Contents Container Component - Ito yung irerender sa dashboard depende sa active button [Quest, Subguilds, Rankers Hall, Scrolls, Codex]
function ContentsContainer({ activeButton }: { activeButton: string }) {
    return (
        <>
            {/* Contents Container - Ipapakita sa contents under navbar */}
            <div className="contents-container" style={{ display: activeButton === 'LOGO' ? 'none' : 'block', fontFamily: 'Cinzel, serif' }}>
                {activeButton === 'QUEST' && <QUESTContent />}
                {activeButton === 'SUBGUILDS' && <SUBGUILDSContent />}
                {activeButton === 'RANKERS_HALL' && <RANKERS_HALLContent />}
                {activeButton === 'SCROLLS' && <SCROLLSContent />}
                {activeButton === 'CODEX' && <CODEXContent />}
            </div>
            <div className="home-container" style={{display: activeButton === 'LOGO' ? 'block' : 'none'}}>
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
        <div className="quest-container" style={questStyle}>
            <div style={questNavBar}>
                <button style={activeQuestTab === 'EVENTS' ? questNavBtnActive : questNavBtn} onClick={() => setActiveQuestTab('EVENTS')}>QEvents</button>
                <button style={activeQuestTab === 'HACKATONS' ? questNavBtnActive : questNavBtn} onClick={() => setActiveQuestTab('HACKATONS')}>HACKATONS</button>
                <button style={activeQuestTab === 'WORKSHOPS' ? questNavBtnActive : questNavBtn} onClick={() => setActiveQuestTab('WORKSHOPS')}>WORKSHOPS</button>
                <button style={activeQuestTab === 'RECREATIONAL' ? questNavBtnActive : questNavBtn} onClick={() => setActiveQuestTab('RECREATIONAL')}>RECREATIONAL</button>
                <button style={activeQuestTab === 'ONLINE_LEARNING' ? questNavBtnActive : questNavBtn} onClick={() => setActiveQuestTab('ONLINE_LEARNING')}>ONLINE_LEARNING</button>
            </div>
            <div style={{width: '100%'}}>
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