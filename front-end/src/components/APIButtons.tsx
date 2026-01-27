import React from 'react';

export default function APIButtons() {
    return (
        <div>
            <button onClick={async () => {
                const response = await fetch('/api/log');
                const data = await response.json();
                console.log(data);
            }}>
                Test API Button
            </button>
        </div>
    );
}