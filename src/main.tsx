import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { SmoothScrollProvider } from './lib/smooth-scroll'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" desactiva las animaciones de motion cuando el
        sistema pide movimiento reducido, sin tocar cada componente. */}
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </I18nProvider>
    </MotionConfig>
  </StrictMode>,
)
