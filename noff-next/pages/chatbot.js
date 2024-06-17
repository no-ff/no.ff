import React from 'react';

const Chatbot = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div id="chatbot" style={{border: '1px solid lightgray', borderRadius: '10px', padding: '20px', overflow: 'auto' }}>
                    <h1>Chatbot</h1>
                    <p>Welcome to our website! We are a team of talented individuals dedicated to providing high-quality solutions.</p>
                    <p>Feel free to explore our website and learn more about our services.</p>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;