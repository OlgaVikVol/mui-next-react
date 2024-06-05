'use client'

import React, { useState } from 'react';
import { List, ListItem, Typography, Checkbox, Button, TextField } from "@mui/material";
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TaskEditingForm } from '../TaskEditingForm/TaskEditingForm';

interface Task {
  id: string;
  label: string;
  checked: boolean;
  editing?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTask: (id: string, newIndex: number) => void; 
  startEdit: (id: string) => void;
  cancelEdit: (id: string) => void;
  saveEdit: (id: string, label: string) => void;
}

export const TaskList = (props: TaskListProps) => {
  const { 
    tasks, 
    toggleTask, 
    deleteTask, 
    reorderTask, 
    startEdit, 
    cancelEdit, 
    saveEdit 
  } = props;
  const nodeRef = React.useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (id: string) => {
    if(isHovered) return;

    setIsHovered(true);
    startEdit(id);
  }

  const handleOnCancel = (id: string) => {
    setIsHovered(false);
    cancelEdit(id);
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {tasks.map((task, index) => (
        <Draggable
          nodeRef={nodeRef}
          key={task.id}
          axis="y"
          grid={[0, 58]}
          bounds="parent"
          onStop={(e, data) => {
            if (data.lastY >= 58) { // Dragged downwards
              console.log('here');
              if (index < tasks.length - 1) {
                reorderTask(task.id, index + 1);
              }
            } else if (data.lastY <= -58) { // Dragged upwards
              if (index > 0) {
                reorderTask(task.id, index - 1);
              }
            }
          }}
        >
          <ListItem
            ref={nodeRef}
            sx={{ display: 'flex', alignItems: 'center', gap: "16px", cursor: 'grab' }}
          >
            {task.editing ? (
              <TaskEditingForm 
                id={task.id} 
                setIsHover={() => setIsHovered(false)} 
                saveEdit={(id: string, value: string) => saveEdit(id, value)}
                label={task.label} 
                onCancel={() => handleOnCancel(task.id)}
                />
            ) : (
              <React.Fragment>
                <DragIndicatorIcon />
                <Checkbox
                  checked={task.checked}
                  onChange={() => toggleTask(task.id)}
                  inputProps={{ 'aria-label': 'Checkbox' }}
                />
                <Typography 
                  variant="body1" 
                  sx={{ textDecoration: task.checked ? 'line-through' : 'none', flexGrow: 1 }}
                  onMouseEnter={() => handleMouseEnter(task.id)}
                >
                  {task.label}
                </Typography>
                <Button variant="outlined" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </React.Fragment>
            )}
          </ListItem>
        </Draggable>
      ))}
    </List>
  );
};

