'use client'

import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { addTask, cancelEdit, deleteTask, reorderTasks, saveEdit, startEdit, toggleTask } from '../lib/features/tasks/tasksSlice'
import { RootState } from '../lib/store';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [newTask, setNewTask] = useState('');
  const [isClientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!isClientReady) {
    return <div className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-p-24">Loading...</div>; 
  }

  return (
      <main className="tw-flex tw-min-h-screen tw-flex-col tw-gap-y-2 tw-items-center tw-p-24">
        <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
          TODO List
        </Typography>
        <TaskForm 
          newTask={newTask} 
          setNewTask={setNewTask} 
          addNewTask={() => {
            dispatch(addTask({ label: newTask.trim(), checked: false}));
            setNewTask('')
           }} 
        />
        <Grid item xs={12} md={6}>
          <TaskList 
            tasks={tasks} 
            toggleTask={(id) => dispatch(toggleTask(id))} 
            deleteTask={(id) => dispatch(deleteTask(id))}
            reorderTask={(id, newIndex) => {
              const currentIndex = tasks.findIndex(task => task.id === id);
              dispatch(reorderTasks({ startIndex: currentIndex, endIndex: newIndex }));
            }}
            startEdit={(id) => dispatch(startEdit(id))}
            cancelEdit={(id) => dispatch(cancelEdit(id))}
            saveEdit={(id, label) => dispatch(saveEdit({id, label}))}
          />
        </Grid>
      </main>
  );
}
