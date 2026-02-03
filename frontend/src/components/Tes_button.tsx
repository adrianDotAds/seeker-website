import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

// URLS
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8085';

function Tes_button() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/test-button")}>Login</button>
        </div>
    );
}

export default Tes_button;  