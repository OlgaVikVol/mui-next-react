import { createSlice } from "@reduxjs/toolkit";
import { v4 } from 'uuid';

const initialState = [
	{ id: v4(), label: "Go to the gym", checked: false, editing: false},
  { id: v4(), label: "Water plants", checked: false, editing: false},
  { id: v4(), label: "Walk the dog", checked: false, editing: false},
]

export const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action) => {
		state.push({ id: v4(), label: action.payload.label, checked: false, editing: false})
		},
		deleteTask: (state, action) => {
		return state.filter(task => task.id !== action.payload);
		},
		toggleTask: (state, action) => {
			const task = state.find(task => task.id === action.payload)
			if(task) {
				task.checked = !task.checked;
			}
		},
		startEdit: (state, action) => {
			const task = state.find(task => task.id === action.payload);
			if(task) {
			  task.editing = true;
			}
		},
		cancelEdit: (state, action) => {
			const task = state.find(task => task.id === action.payload);
			if(task) {
			  task.editing = false;
			}
		},
		saveEdit: (state, action) => {
			const { id, label} = action.payload;
			const task = state.find(task => task.id === id);
			if(task) {
				task.label = label;
				task.editing = false;
			}
		},
		reorderTasks: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, removed);
    },
  }
});

export const { addTask, deleteTask, toggleTask, reorderTasks, startEdit, cancelEdit, saveEdit } = tasksSlice.actions;

export default tasksSlice.reducer;
