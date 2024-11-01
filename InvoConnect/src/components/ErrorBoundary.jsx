import React from 'react';
import { Button, Callout, Spinner } from '@blueprintjs/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, isLoading: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <Callout intent="danger" title="An error occurred">
            {this.state.error?.message}
            <Button onClick={this.handleResetError} text="Try Again" intent="primary" />
          </Callout>
        </div>
      );
    }

    // Loading indicator could be placed here if needed
    if (this.state.isLoading) {
      return <Spinner size={50} />;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
