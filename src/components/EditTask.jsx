import React from 'react'
import { editTask } from '../redux/taskSlice';
import { useDispatch } from 'react-redux';

const EditTask = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(task.title);

    const handleEdit = useCallback(() => {
        dispatch(editTask({ id: task.id, updatedTask: { title, date, timeSlot } }));
    }, [dispatch, task.id, title]);

    return (
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleEdit}>Save Changes</button>
        </div>
    );s
}

export default EditTask
