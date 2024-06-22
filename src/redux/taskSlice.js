import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    deletedTasks: JSON.parse(localStorage.getItem('deletedTasks')) || [],
    completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
              state.tasks[index].title = action.payload.title;
              localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
          },
        deleteTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
                state.deletedTasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
                localStorage.setItem('deletedTasks', JSON.stringify(state.deletedTasks));
            }
        },
        completeTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
                state.completedTasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
                localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks));
            }
        },
    },
});

export const { addTask, editTask, deleteTask, completeTask } = taskSlice.actions;

export default taskSlice.reducer;
