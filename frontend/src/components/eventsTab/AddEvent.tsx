import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from '../MainStyle.module.css';

function AddEvents() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [dateHeld, setDateHeld] = useState("");
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            setImage(file);

            // Create a preview URL for the selected image
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        } else {
            setImage(null);
            setPreview(null);
        }
    };

    useEffect(() => {
        // Clean up the preview URL when the component unmounts or when a new image is selected
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

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
            <div>
                {preview ? (
                    <img src={preview} alt="Event Preview" className={styles.previewImage} />
                ) : (
                    <p style={{color: 'white'}}>No image selected</p>
                )}
            </div>
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
                type='date'
                value={dateHeld}
                onChange={(e) => setDateHeld(e.target.value)}
                placeholder="Date Held"
            />
            <input 
                type="file"
                onChange={handleFileChange}
            />
            <button type="submit">Add Events</button>
        </form>
    );
}

export default AddEvents