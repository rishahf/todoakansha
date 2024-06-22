import React from 'react';
import './Tabs.css'

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="container">
            <div className="header">
                <p>Tabs</p>
                <div className="buttons">
                    <button onClick={() => setActiveTab('all')}>All Tasks</button>
                    <button onClick={() => setActiveTab('deleted')}>Deleted Tasks</button>
                    <button onClick={() => setActiveTab('completed')}>Completed Tasks</button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
