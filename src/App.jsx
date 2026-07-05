import React, { useState } from 'react';
import ConfigView from './components/ConfigView';
import GameView from './components/GameView';
import { AnimatePresence, motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: '2rem', color: 'red', background: 'white', zIndex: 9999, border: '5px solid red' }}>
        <h2>App Crashed!</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</pre>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.stack}</pre>
      </div>;
    }
    return this.props.children;
  }
}

function App() {
  // Starta direkt i spelet — inställningarna nås via tillbaka-pilen
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            key="config"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', minHeight: '100vh' }}
          >
            <ConfigView onStartPlay={() => setIsPlaying(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, type: "spring" }}
            style={{ width: '100%', minHeight: '100vh' }}
          >
            <ErrorBoundary>
              <GameView onBack={() => setIsPlaying(false)} />
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
