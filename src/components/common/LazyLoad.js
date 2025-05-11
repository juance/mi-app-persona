import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ErrorFallback = ({ error }) => (
  <div className="error-boundary">
    <h2>Lo sentimos, ha ocurrido un error</h2>
    <p>{error.message}</p>
    <button onClick={() => window.location.reload()}>Recargar página</button>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en LazyLoad:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const LazyLoad = ({ component: Component, fallback = <LoadingSpinner text="Cargando..." />, ...props }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoad;
