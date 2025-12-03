import React from 'react'
import ReactDOM from 'react-dom'
import { initRem } from '@/utils/rem'
import App from './App'
import { HashRouter as Router, BrowserRouter } from 'react-router-dom'
// import 'antd-mobile-v5/es/global'
import 'lib-flexible'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
