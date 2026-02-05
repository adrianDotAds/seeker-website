import { useState } from "react";

function ContentsContainer({ activeButton }) {
    const [hide, setHide] = useState(false);

    const toggleHide = () => {
        if (activeButton === 'LOGO') {
            setHide(!hide);
        } else {
            setHide(false);
        }
    };

    const mainSelected = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    };

    const contentsSelected = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
    };

    return (
        <>
            <div className="contents-container" style={{ display: activeButton === 'LOGO' ? 'none' : 'block' }}>
                {activeButton === 'QUEST' && <div>Quest Content</div>}
                {activeButton === 'SUBGUILDS' && <div>Subguilds Content</div>}
                {activeButton === 'RANKERS_HALL' && <div>Rankers Hall Content</div>}
                {activeButton === 'SCROLLS' && <div>Scrolls Content</div>}
                {activeButton === 'CODEX' && <div>Codex Content</div>}
            </div>
            <div className="home-container" style={{display: activeButton === 'LOGO' ? 'block' : 'none'}}>
                {activeButton === 'LOGO' && <div>Our Journey</div>}
            </div>
        </>
            
    );
}

export default ContentsContainer;