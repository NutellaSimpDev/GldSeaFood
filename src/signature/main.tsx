import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import SignatureApp from './SignatureApp.tsx'

/**
 * Entrada de la subpagina /signature/.
 * No monta I18nProvider ni SmoothScrollProvider a proposito: esta pagina es
 * una herramienta interna, solo en ingles, y el scroll inercial estorbaria
 * en un formulario.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignatureApp />
  </StrictMode>,
)
