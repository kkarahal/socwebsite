import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Create a root container instead of using ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

registerServiceWorker();