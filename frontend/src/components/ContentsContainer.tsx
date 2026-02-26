import { useEffect, useState } from "react";
import axios from "axios";

import styles from './MainStyle.module.css';

// Components
import AddEvents from "./eventsTab/AddEvent";

// svg imports
import { FcAddImage } from "react-icons/fc";

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
        // 1. Initialize state as an empty array to avoid .map errors on first render
        const [events, setEvents] = useState<{name: string, url: string, description: string, date: string}[]>([]);
        const [showEventForm, setEventForm] = useState(true)

        const showAddEvent = async () => {
            // Hide or Unhides Event Form
            setEventForm(!showEventForm)
            console.log("showEventForm:", showEventForm);

            if (showEventForm) {
                // Show Event Form
                document.getElementsByClassName(styles.addEventFormContainer)[0].setAttribute("style", "display: flex; background-color: rgba(0, 0, 0, 0.76); position: absolute; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center;");
                // document.getElementsByClassName(styles.addEventForm)[0]?.setAttribute("style", "display: none;");
                console.log("showEventForm if:", showEventForm);
            } else {
                // Hide Event Form
                document.getElementsByClassName(styles.addEventFormContainer)[0].setAttribute("style", "display: none; background-color: rgba(192, 30, 30, 0.76); position: absolute; top: 0; left: 0; width: 100%; height: 100%; justify-content: center; align-items: center;");
                // document.getElementsByClassName(styles.addEventForm)[0]?.setAttribute("style", "display: flex;");
                console.log("showEventForm else:", showEventForm);
            }
        }

        useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/getevents');
                const fetchedData = response.data.events;
                console.log("Fetched events data:", fetchedData);
                
                // 2. Transform the object into an array if needed
                const eventList = Object.keys(fetchedData).map(key => ({
                    name: fetchedData[key].title,
                    url: fetchedData[key].imageURL,
                    description: fetchedData[key].description,
                    date: fetchedData[key].date
                }));

                // 3. Update state once with the full list
                setEvents(eventList);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array ensures this runs only once on mount

        return (
            <>
                <div className={styles.eventContainer}>
                    {/* 4. Map through the events state array */}
                    {events.map((event) => (
                        <div key={event.name} className={styles.eventCard}>
                            <div className={styles.imageEventNameDateContainer}>
                                <img className={styles.eventImage} src={event.url} alt={event.name} />
                                <div className={styles.titleAndDate}>
                                    <h3 className={styles.eventName}>{event.name}</h3>
                                    <p className={styles.eventDate}>{event.date}</p>
                                </div>
                            </div>
                            <p className={styles.description}>{event.description}</p>
                        </div>
                    ))}
                    <FcAddImage className={styles.addEvent} onClick={showAddEvent}/>
                    <div className={styles.addEventFormContainer}>
                        <AddEvents />
                    </div>
                </div>
            </>
                
        );
    }

    function HackatonTab() {
        return (
            <div className={styles.questNavContents}>
                HACKATON TAB CONTENT
            </div>
        );
    }

    function WorkShopTab() {
        return (
            <div className={styles.questNavContents}>
                WORKSHOP TAB CONTENT
            </div>
        );
    }

    function RecreationalTab() {
        return (
            <div className={styles.questNavContents}>
                RECREATIONAL TAB CONTENT
            </div>
        );
    }

    function OnlineLearningTab() {
        return (
            <div className={styles.questNavContents}>
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
            <div className={styles.questContent}>
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