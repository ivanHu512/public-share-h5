import React from 'react'
import ReactDOM from 'react-dom'
import { initRem } from '@/utils/rem'
import App from './App'
import 'lib-flexible'
import { getLocationVars } from '@/utils/utils'

const { lang } = getLocationVars()

if (lang) localStorage?.setItem('lang', lang)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
