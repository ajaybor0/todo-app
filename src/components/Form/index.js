import React from "react";
import { Button, Input, Stack, Alert } from "@mui/material";
import { useStyles } from "./styles";

const Form = ({ onAdd, onChangeInput, todo, isValid }) => {
	const classes = useStyles();
	return (
		<form onSubmit={onAdd} className={classes.form}>
			<Stack direction="column" spacing={2}>
				<Stack direction="row" spacing={2}>
					<Input
						className={classes.input}
						type="text"
						onChange={onChangeInput}
						value={todo}
						placeholder="Todo..."
					/>
					<Button variant="contained" type="submit">
						Add
					</Button>
				</Stack>
				{isValid ? (
					""
				) : (
					<Alert severity="warning">
						Todo can't be empty - Please enter your todo!
					</Alert>
				)}
			</Stack>
		</form>
	);
};

export default Form;
