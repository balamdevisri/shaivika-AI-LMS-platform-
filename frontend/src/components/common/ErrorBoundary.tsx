import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-['Sora'] select-none">
          <div className="max-w-md space-y-5 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto text-2xl font-bold">
              !
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Kaizen Q Session Recovered
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              An unexpected display state was detected. Click below to reload the interactive platform seamlessly.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-[#1D4ED8] to-[#2563EB] text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:scale-102 transition-all cursor-pointer"
              >
                Reload Kaizen Q Platform
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
