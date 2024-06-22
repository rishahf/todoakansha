import './App.css';
import AddTask from './components/AddTask';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import TaskList from './components/TaskList';

function App() {

  return (
    <>
      <Provider store={store}>
        <div style={{marginTop: '-22px', height: '70px', background: 'teal', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h1 style={{color: 'white', marginBottom: '10px'}}>YOUR TASK MANAGER!</h1>
        </div>
        <AddTask />
        <TaskList />
      </Provider>
    </>
  );
}

export default App;
