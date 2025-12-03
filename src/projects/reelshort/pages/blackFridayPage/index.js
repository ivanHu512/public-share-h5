import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { checkIsApp } from '@/utils/web-view'
import 'lib-flexible'

async function init() {
 
  await checkIsApp()
  ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
init()
