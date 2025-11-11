import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux_slice/store';
import './styles/index.css'
import App from './App.jsx'

//createRoot(document.getElementById('root')).render(
//    <StrictMode>
       
//            <App />
        
//     </StrictMode>,
//);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);


