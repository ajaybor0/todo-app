import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useStyles } from "./styles";

const CallBackUI = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<ErrorOutlineIcon className={classes.icon} />
			<h1 className={classes.heading}>Whoopsy Daizy</h1>
			<p className={classes.text}>
				Something went wrong and It's your fault, loser.
			</p>
		</div>
	);
};

export default CallBackUI;
