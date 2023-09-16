import { Component, ReactNode, ErrorInfo, Suspense } from 'react';
import PageError from '../../widgets/pageError/PageError';
import Loader from '../../components/loader/Loader';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info)
    }

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (<Suspense fallback={<Loader />}>
                <PageError />
            </Suspense>);
        }

        return children;
    }
}

export default ErrorBoundary;