import './App.css';
import React from "react";

function LandingPage({ onGetStartedClick }) {
    return (
        <div className="landing-page">
            <h1>Welcome to the Quiz</h1>
            <p>Click the button below to get started!</p>
            <button class="btn" onClick={onGetStartedClick}>
                <div>GET STARTED</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path d="M11.6801 14.62L14.2401 12.06L11.6801 9.5" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M4 12.0601H14.17" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
    );
}

export default LandingPage;