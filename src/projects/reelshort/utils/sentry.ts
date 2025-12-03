import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://363f09ff1788a96821366db4b1c56187@sentry.crazymaplestudios.com/5',
  environment: process.env.REACT_APP_ENV,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1
})
