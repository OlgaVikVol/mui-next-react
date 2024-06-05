import { Button, TextField } from "@mui/material"
import React, { useState } from "react"

interface TaskEditingFormProps {
	id: string;
	setIsHover: () => void;
	saveEdit: (id: string, label: string) => void;
	label: string;
	onCancel: () => void;
}

export const TaskEditingForm = (props: TaskEditingFormProps) => {
	const { 
		id,
		setIsHover,
		saveEdit,
    label, 
    onCancel, 
  } = props;

	const [editingValue, setEditingValue] = useState<string>(label);

	const handleOnSave = () => {
		setIsHover();

		saveEdit(id, editingValue);
	}

	return (
		<React.Fragment>
			<TextField
				value={editingValue}
				onChange={(e) => setEditingValue(e.target.value)}
			/>
				<Button onClick={() => handleOnSave()}>Save</Button>
			<Button onClick={() => onCancel()}>Cancel</Button>
		</React.Fragment>
	);
}
