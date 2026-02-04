import { useNavigate } from 'react-router-dom';


function Tes_button() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/test-button")}>Login</button>
        </div>
    );
}

export default Tes_button;  