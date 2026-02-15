import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './MainStyle.module.css';

function Tes_button2() {
    // 1. Initialize state as an empty array to avoid .map errors on first render
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/getevents');
                const fetchedData = response.data.events;
                
                // 2. Transform the object into an array if needed
                const eventList = Object.keys(fetchedData).map(key => ({
                    name: key,
                    url: fetchedData[key].public_url
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
        <div className={styles.eventContainer}>
            {/* 4. Map through the events state array */}
            {events.map((event) => (
                <div key={event.name} className={styles.eventCard}>
                    <div className={styles.imageEventNameDateContainer}>
                        <img className={styles.eventImage} src={event.url} alt={event.name} />
                        <div className={styles.titleAndDate}>
                            <h3 className={styles.eventName}>{event.name}</h3>
                            <p className={styles.eventDate}>date</p>
                        </div>
                    </div>
                    <p className={styles.description}>description</p>
                </div>
            ))}
        </div>
    );
}
export default Tes_button2;  