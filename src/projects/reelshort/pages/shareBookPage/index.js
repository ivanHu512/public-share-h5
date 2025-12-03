import React from 'react'
import ReactDOM from 'react-dom'
import { initRem } from '@/utils/rem'
import App from './App'
import 'lib-flexible'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
