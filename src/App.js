import React from "react";
import Routes from "./Routes";
import "./index.css";
import ErrorBoundary from "../src/errorBoundary/ErrorBoundary";

const App = () => {
	return (
		<div>
			<ErrorBoundary>
				<Routes />
			</ErrorBoundary>
		</div>
	);
};

export default App;
