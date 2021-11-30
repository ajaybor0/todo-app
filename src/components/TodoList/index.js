import React, { useState, useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
// import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

import { useStyles } from "./styles";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = ({
	todos,
	editing,
	onChangeEditInput,
	onDelete,
	onEditSubmit,
	onEditing,
	onCancelEdit,
	// onComplete,
}) => {
	const classes = useStyles();
	const [columns, setColumns] = useState({
		[uuid()]: {
			name: "Todo",
			items: todos,
		},
		[uuid()]: {
			name: "In Progress",
			items: [],
		},
		[uuid()]: {
			name: "Done",
			items: [],
		},
	});

	useEffect(() => {
		setColumns({
			[uuid()]: {
				name: "To Do",
				items: todos,
			},
			[uuid()]: {
				name: "In Progress",
				items: [],
			},
			[uuid()]: {
				name: "Done",
				items: [],
			},
		});
	}, [todos]);

	const onDragEnd = (result, columns, setColumns) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [...sourceColumn.items];
			const destItems = [...destColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...sourceColumn,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destColumn,
					items: destItems,
				},
			});
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};

	return (
		<div className={classes.parentDiv}>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(columns).map(([id, column]) => {
					return (
						<div className={classes.childDiv}>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable droppableId={id} key={id}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													backgroundColor: snapshot.isDraggingOver
														? "#bbdefb"
														: "#eeeeee",
													border: "none",
													width: 400,
													minHeight: 500,
												}}
											>
												{column.items.map((todo, index) => {
													return (
														<Draggable
															key={todo.id}
															draggableId={todo.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			userSelect: "none",
																			// padding: 16,
																			margin: "0 0 8px 0",
																			// minHeight: "50px",
																			backgroundColor: snapshot.isDragging
																				? "#2196f3"
																				: "#1769aa",
																			color: "white",
																			...provided.draggableProps.style,
																		}}
																	>
																		<List
																			key={todo.id}
																			className={classes.list}
																		>
																			<Box>
																				{todo.id === editing ? (
																					<Input
																						className={classes.input}
																						type="text"
																						onChange={onChangeEditInput}
																						defaultValue={todo.text}
																						onKeyDown={e =>
																							e.key === "Enter" &&
																							onEditSubmit(todo.id)
																						}
																						onBlur={e => onEditSubmit(todo.id)}
																					/>
																				) : (
																					<ListItem
																					// sx={{
																					// 	textDecoration: todo.complete
																					// 		? "line-through"
																					// 		: "",
																					// 	color: todo.complete
																					// 		? "gray"
																					// 		: "",
																					// }}
																					>
																						{/* <Tooltip title="Complete">
																							<Checkbox
																								className={classes.checkBox}
																								checked={todo.complete}
																								onChange={() =>
																									onComplete(todo.id)
																								}
																							/>
																						</Tooltip> */}
																						{todo.text}
																					</ListItem>
																				)}
																			</Box>

																			<Box>
																				<Stack direction="row">
																					<Button
																						onClick={() => onDelete(todo.id)}
																					>
																						<Tooltip title="Delete">
																							<DeleteIcon
																								className={classes.icon}
																							/>
																						</Tooltip>
																					</Button>
																					{todo.id === editing ? (
																						<Stack direction="row" spacing={2}>
																							<Button>
																								<Tooltip title="Cancel Edit">
																									<CancelIcon
																										onClick={() =>
																											onCancelEdit(todo.id)
																										}
																										className={classes.icon}
																									/>
																								</Tooltip>
																							</Button>
																						</Stack>
																					) : (
																						<Button
																							onClick={() => {
																								onEditing(todo.id);
																								onChangeEditInput({
																									target: { value: todo.text },
																								});
																							}}
																						>
																							<Tooltip title="Edit">
																								<EditIcon
																									className={classes.icon}
																								/>
																							</Tooltip>
																						</Button>
																					)}
																					<Button>
																						<Tooltip title="Drag & Drop">
																							<DragHandleIcon
																								className={classes.icon}
																							/>
																						</Tooltip>
																					</Button>
																				</Stack>
																			</Box>
																		</List>
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
};

export default TodoList;

/* <Box>
	{todos.map(todo => {
		return (
			<List key={todo.id} className={classes.list}>
				<Box>
					{todo.id === editing ? (
						<Input
							className={classes.input}
							type="text"
							onChange={onChangeEditInput}
							defaultValue={todo.text}
							onKeyDown={e => e.key === "Enter" && onEditSubmit(todo.id)}
							onBlur={e => onEditSubmit(todo.id)}
						/>
					) : (
						<ListItem
							sx={{
								textDecoration: todo.complete ? "line-through" : "",
								color: todo.complete ? "gray" : "",
							}}
						>
							<Tooltip title="Complete">
								<Checkbox
									className={classes.checkBox}
									checked={todo.complete}
									onChange={() => onComplete(todo.id)}
								/>
							</Tooltip>
							{todo.text}
						</ListItem>
					)}
				</Box>

				<Box>
					<Stack direction="row">
						<Button onClick={() => onDelete(todo.id)}>
							<Tooltip title="Delete">
								<DeleteIcon className={classes.icon} />
							</Tooltip>
						</Button>
						{todo.id === editing ? (
							<Stack direction="row" spacing={2}>
								<Button>
									<Tooltip title="Cancel Edit">
										<CancelIcon
											onClick={() => onCancelEdit(todo.id)}
											className={classes.icon}
										/>
									</Tooltip>
								</Button>
							</Stack>
						) : (
							<Button
								onClick={() => {
									onEditing(todo.id);
									onChangeEditInput({ target: { value: todo.text } });
								}}
							>
								<Tooltip title="Edit">
									<EditIcon className={classes.icon} />
								</Tooltip>
							</Button>
						)}
						<Button>
							<Tooltip title="Drag & Drop">
								<DragHandleIcon className={classes.icon} />
							</Tooltip>
						</Button>
					</Stack>
				</Box>
			</List>
		);
	})}
</Box> */

// const data = {
// 	todo : [],
// 	inProgress: [],
// 	done: []
// }

// const [todoData, setTodoData] = useState(data);

// setTodoData({
// 	todo : todoData.filter,
// 	inProgress: [...inProgress, newData],

// })
