import React, { useState, useEffect } from "react";
import Form from "../../components/Form/index";
import TodoList from "../../components/TodoList/index";
import { schema } from "../../validations/inputValidation";
import { Stack } from "@mui/material";
import { v4 as uuid } from "uuid";

const getTodos = () => {
	const todo = localStorage.getItem("todos");
	if (todo) {
		return JSON.parse(todo);
	} else {
		return [];
	}
};

const TodoApp = () => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState(getTodos());
	const [editing, setEditing] = useState(null);
	const [editingText, setEditingText] = useState("");
	const [isValidTodo, setIsValidTodo] = useState(true);

	const handleChange = e => setTodo(e.target.value);

	const onChangeEdit = e => setEditingText(e.target.value);

	const handleSumbit = async e => {
		e.preventDefault();
		const newTodo = {
			id: uuid(),
			text: todo,
			// complete: false,
		};

		setTodos(prev => {
			if (!newTodo.text) {
				return [...prev];
			} else {
				return [...prev, newTodo];
			}
		});
		setTodo("");

		const isValid = await schema.isValid(newTodo);
		setIsValidTodo(isValid);
	};

	const deleteTodo = id => {
		setTodos(
			[...todos].filter(todo => {
				return todo.id !== id;
			}),
		);
	};

	const handleEditSubmit = id => {
		setTodos(
			todos.map(todo => {
				if (todo.id === id) {
					todo.text = editingText;
				}
				return todo;
			}),
		);
		setEditing(null);
		setEditingText("");
	};

	const handleCancelEdit = () => {
		setEditing(null);
	};

	// const toggleComplete = id => {
	// 	setTodos(
	// 		todos.map(todo => {
	// 			if (todo.id === id) {
	// 				todo.complete = !todo.complete;
	// 			}
	// 			return todo;
	// 		}),
	// 	);
	// };

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div>
			<Stack direction="column" spacing={6}>
				<Form
					onAdd={handleSumbit}
					onChangeInput={handleChange}
					todo={todo}
					isValid={isValidTodo}
				/>

				<TodoList
					todos={todos}
					editing={editing}
					editingText={editingText}
					onDelete={deleteTodo}
					onChangeEditInput={onChangeEdit}
					onEditSubmit={handleEditSubmit}
					onEditing={setEditing}
					onCancelEdit={handleCancelEdit}
					// onComplete={toggleComplete}
				/>
			</Stack>
		</div>
	);
};

export default TodoApp;
