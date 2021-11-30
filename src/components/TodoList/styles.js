import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
	list: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		textTransform: "capitalize",
		padding: 0,
	},

	input: {
		color: "#fff",
		minWidth: 200,
		margin: 8,
	},
	checkBox: {
		marginRight: 28,
	},
	icon: {
		color: "#212121",
	},

	parentDiv: {
		display: "flex",
		justifyContent: "center",
		height: "100%",
	},

	childDiv: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		color: "gray",
	},
});
