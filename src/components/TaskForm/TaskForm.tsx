import { Box, Button, TextField } from "@mui/material";

interface TaskFormProps {
	newTask: string;
	setNewTask: React.Dispatch<React.SetStateAction<string>>;
	addNewTask: () => void;
}

export const TaskForm = ({ newTask, setNewTask, addNewTask}: TaskFormProps) => {
 return (
	<Box
		component="form"
		sx={{
			'& > :not(style)': { m: 1, width: '25ch' },
				display: 'flex', 
				alignItems: 'center', 
		}}
		noValidate
		autoComplete="off"
		>
			<TextField
				id="outlined-basic" 
				label="Add new task" 
				variant="outlined" 
				sx={{ height: 56 }}
				value={newTask}
				onChange={(e) => {
					setNewTask(e.target.value)
				}} 
			/>
			<Button 
				variant="contained" 
				sx={{ height: 56 }} 
				onClick={addNewTask}
			>
				Submit
			</Button>
	</Box>
 )
}
