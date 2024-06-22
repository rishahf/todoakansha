import React from 'react';
import './Tabs.css'

const Filter = ({ setFilter }) => {
    return (
        <div className="container">
            <div className="header">
                <p>Filters</p>
                <div className="buttons">
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('weekly')}>Weekly</button>
                    <button onClick={() => setFilter('monthly')}>Monthly</button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
