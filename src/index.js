import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DiscordProvider } from './DiscordContext';

ReactDOM.render(<DiscordProvider><App /></DiscordProvider>, document.getElementById('root'));
