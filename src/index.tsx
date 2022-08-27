import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
import reportWebVitals from './reportWebVitals'
import { QueryParamProvider } from 'use-query-params'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
      <QueryParamProvider history={history as any}>
        <App />
      </QueryParamProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
