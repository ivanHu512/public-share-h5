import React from 'react'
import ReactDOM from 'react-dom'
// import { getAppLang } from '@/utils/web-view'
import { getLocationVars } from '@/utils/utils'
import App from './App'

const { lang } = getLocationVars()

if (lang) localStorage?.setItem('lang', lang)

async function init() {
  // await getAppLang()
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

init()
