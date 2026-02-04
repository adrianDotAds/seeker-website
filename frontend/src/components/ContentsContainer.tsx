import { useState } from "react";

function ContentsContainer({ activeButton }) {
    return (
        <div className="contents-container">
            {activeButton === 'QUEST' && <div>Quest Content</div>}
            {activeButton === 'SUBGUILDS' && <div>Subguilds Content</div>}
            {activeButton === 'RANKERS_HALL' && <div>Rankers Hall Content</div>}
            {activeButton === 'SCROLLS' && <div>Scrolls Content</div>}
            {activeButton === 'CODEX' && <div>Codex Content</div>}
        </div>
    );
}

export default ContentsContainer;