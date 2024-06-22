import React, { useCallback } from 'react'
import { useState } from 'react';
import './AddTask.css'
import Card from './Card';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [type, setType] = useState('weekly');

    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const task = { id: Date.now(), title, date, timeSlot, type };
        dispatch(addTask(task));
        setTitle('');
        setDate('');
        setTimeSlot('');
        setType('weekly');
    }, [dispatch, title, date, timeSlot, type]);


    return (
        <Card>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            /><br/>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            /><br/>
            <input 
                type="text" 
                value={timeSlot} 
                onChange={(e) => setTimeSlot(e.target.value)} 
                placeholder="Time Slot" 
                required 
            /><br/>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select><br/>
            <button type="submit">Add Task</button>
        </form>
        </Card>
    );
}

export default AddTask
