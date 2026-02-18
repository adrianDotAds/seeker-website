import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './MainStyle.module.css';

function Tes_button2() {
    // 1. Initialize state as an empty array to avoid .map errors on first render
    const [events, setEvents] = useState<{name: string, url: string}[]>([]);

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

function addEvents() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleAddEvents = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }
        try {
            const response = await axios.post('/api/add-events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error adding events:', error);
        }
    };

    return (
        <form onSubmit={handleAddEvents} className={styles.addEventForm}>
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Title"
            />
            <input 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Event Description"
            />
            <input 
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <button type="submit">Add Events</button>
        </form>
    );
}
export default addEvents;  