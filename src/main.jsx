import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './store'
import { Provider } from 'react-redux'
import './index.css'
import "bootswatch/dist/flatly/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>,
)
