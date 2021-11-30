import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodoApp from "./pages/todoApp/index";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<TodoApp />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
