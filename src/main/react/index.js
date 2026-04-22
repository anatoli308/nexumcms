'use strict';

const React = require('react');
import { createRoot } from 'react-dom/client';
import NexusCMSApp from './NexusCMS.js';

// After
const container = document.getElementById('react');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<NexusCMSApp />);