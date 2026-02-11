

function Profile({ handleLogout }: { handleLogout: () => void }) {
    return (
        <div className="profile-container">
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
}

export default Profile;