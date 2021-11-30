import React from "react";
import CallBackUI from "./pages/callBackUI/index";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return <CallBackUI />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
