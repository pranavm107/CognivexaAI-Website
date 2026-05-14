import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            // Minimal specialized fallback UI
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b1220] p-6 text-center">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md shadow-2xl backdrop-blur-md">
                        {/* Warning Icon */}
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2 font-['Montserrat',sans-serif]">
                            System Encountered an Error
                        </h1>
                        <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                            Something went wrong while rendering this component. Our engineering team has been notified.
                        </p>

                        <button
                            onClick={this.handleReload}
                            className="px-6 py-3 bg-[#6C4CF4] hover:bg-[#5b3ddb] text-white font-medium rounded-lg transition-all shadow-[0_4px_14px_0_rgba(108,76,244,0.39)] hover:shadow-[0_6px_20px_rgba(108,76,244,0.23)] hover:-translate-y-1 active:scale-95 text-sm"
                        >
                            Reload Application
                        </button>
                    </div>
                    {/* Build Signature */}
                    <p className="fixed bottom-6 text-xs text-white/20 font-mono">
                        ERR_CODE: COMPONENT_CRASH
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
