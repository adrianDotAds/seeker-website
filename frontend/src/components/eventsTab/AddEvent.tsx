import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from '../MainStyle.module.css';

function AddEvents() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [dateHeld, setDateHeld] = useState("");

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
                type='text'
                value={dateHeld}
                onChange={(e) => setDateHeld(e.target.value)}
                placeholder="Date Held"
            />
            <input 
                type="file"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <button type="submit">Add Events</button>
        </form>
    );
}

export default AddEvents