import ErrorDisplayComponent from "components/errorDisplayComponent";
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, history, location } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <ErrorDisplayComponent />
        </div>
      );
    }

    return children;
  }
}
