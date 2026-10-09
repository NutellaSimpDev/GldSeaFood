import { useMemo, useRef, useState } from 'react';
import { buildSignature, buildPlainText, SITE_URL, type SignatureData } from './buildSignature';

type Estado = 'idle' | 'ok' | 'error';

const CAMPOS: { id: keyof SignatureData; label: string; placeholder: string; type: string; hint?: string }[] = [
  { id: 'fullName', label: 'Full name', placeholder: 'Carlos Mendoza', type: 'text' },
  { id: 'jobTitle', label: 'Job title', placeholder: 'Export Sales Manager', type: 'text' },
  { id: 'email', label: 'Email address', placeholder: 'carlos.mendoza@gldseafood.com', type: 'email' },
  { id: 'phone', label: 'Phone', placeholder: '+51 1 617 4200', type: 'tel', hint: 'Optional' },
];

export default function SignatureApp() {
  const [data, setData] = useState<SignatureData>({ fullName: '', jobTitle: '', email: '', phone: '' });
  const [copiado, setCopiado] = useState<Estado>('idle');
  const [copiadoHtml, setCopiadoHtml] = useState<Estado>('idle');
  const previewRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => buildSignature(data), [data]);

  const set = (k: keyof SignatureData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [k]: e.target.value }));

  /**
   * Copia la firma como contenido ENRIQUECIDO. Si solo copiaramos texto, al
   * pegar en Gmail u Outlook se perderia el logo y todo el formato.
   */
  const copiarFirma = async () => {
    const plano = buildPlainText(data);

    // 1) Via moderna: escribe HTML y texto plano a la vez.
    try {
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plano], { type: 'text/plain' }),
          }),
        ]);
        setCopiado('ok');
        setTimeout(() => setCopiado('idle'), 2600);
        return;
      }
    } catch {
      // Puede fallar por permisos o porque el documento perdio el foco.
      // No se aborta: abajo esta el respaldo.
    }

    // 2) Respaldo: seleccionar la vista previa y copiar la seleccion.
    //    Funciona en navegadores sin ClipboardItem y cuando la via moderna
    //    se bloquea por permisos.
    const nodo = previewRef.current;
    const sel = window.getSelection();
    if (nodo && sel) {
      const rango = document.createRange();
      rango.selectNodeContents(nodo);
      sel.removeAllRanges();
      sel.addRange(rango);
      try {
        if (document.execCommand('copy')) {
          sel.removeAllRanges();
          setCopiado('ok');
          setTimeout(() => setCopiado('idle'), 2600);
          return;
        }
      } catch {
        // cae al estado de error
      }
      // 3) Ultimo recurso: se deja la firma SELECCIONADA para que baste Ctrl+C.
    }
    setCopiado('error');
    setTimeout(() => setCopiado('idle'), 5000);
  };

  const copiarHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiadoHtml('ok');
    } catch {
      setCopiadoHtml('error');
    }
    setTimeout(() => setCopiadoHtml('idle'), 2600);
  };

  const completo = data.fullName.trim() && data.jobTitle.trim() && data.email.trim();

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <header className="text-center mb-10 sm:mb-14">
          <a href={`${import.meta.env.BASE_URL}`} className="inline-block mb-6">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Golden Seafood"
              style={{ height: '52px', width: 'auto' }}
              className="mx-auto"
            />
          </a>
          <p className="text-[var(--gold-bright)] text-xs tracking-[3px] uppercase mb-3 font-semibold">
            Internal Tool
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold mb-3">Email Signature Generator</h1>
          <p className="text-white/70 max-w-xl mx-auto font-light text-sm sm:text-base">
            Fill in your details, then copy the signature straight into Gmail or Outlook.
            Everyone on the team gets the same layout, fonts and logo.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">

          {/* Formulario */}
          <section className="glass rounded-3xl p-6 sm:p-8 border border-[var(--gold)]/30">
            <h2 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[1.8px] uppercase pb-3 mb-5 border-b border-white/10">
              Your details
            </h2>

            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              {CAMPOS.map(c => (
                <div key={c.id}>
                  <label
                    htmlFor={`f-${c.id}`}
                    className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2"
                  >
                    {c.label}
                    {c.hint && <span className="ml-2 text-white/40 normal-case tracking-normal font-normal">{c.hint}</span>}
                  </label>
                  <input
                    id={`f-${c.id}`}
                    type={c.type}
                    value={data[c.id]}
                    onChange={set(c.id)}
                    placeholder={c.placeholder}
                    autoComplete="off"
                    className="form-input text-sm"
                  />
                </div>
              ))}
            </form>

            <div className="mt-7 space-y-3">
              <button
                onClick={copiarFirma}
                disabled={!completo}
                className="btn-gold w-full justify-center text-xs py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiado === 'ok' ? '✓ Signature copied' : copiado === 'error' ? 'Selected — press Ctrl+C' : 'Copy signature'}
              </button>

              <button
                onClick={copiarHtml}
                disabled={!completo}
                className="btn-outline w-full justify-center text-xs py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copiadoHtml === 'ok' ? '✓ HTML copied' : copiadoHtml === 'error' ? '✕ Copy failed' : 'Copy HTML source'}
              </button>

              {!completo && (
                <p className="text-white/45 text-[0.7rem] text-center pt-1">
                  Fill in name, job title and email to enable copying.
                </p>
              )}
            </div>
          </section>

          {/* Vista previa */}
          <section className="space-y-6">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/15">
              <h2 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[1.8px] uppercase pb-3 mb-5 border-b border-white/10">
                Preview
              </h2>
              {/* Fondo blanco: es como se vera dentro del correo, no sobre el azul del sitio */}
              <div className="bg-white rounded-xl p-5 sm:p-6 overflow-x-auto">
                <div ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />
              </div>
              <p className="text-white/45 text-[0.7rem] mt-4 leading-relaxed">
                The signature uses Arial on purpose: email clients cannot load the web fonts
                used on the website.
              </p>
            </div>

            {/* Instrucciones */}
            <div className="glass rounded-3xl p-6 sm:p-8 border border-white/15">
              <h2 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[1.8px] uppercase pb-3 mb-5 border-b border-white/10">
                How to install it
              </h2>

              <div className="space-y-5 text-sm">
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">Gmail</h3>
                  <ol className="text-white/70 text-xs leading-relaxed list-decimal pl-4 space-y-1 font-light">
                    <li>Click <strong className="text-white/90">Copy signature</strong> above.</li>
                    <li>In Gmail go to <strong className="text-white/90">Settings → See all settings → General</strong>.</li>
                    <li>Scroll to <strong className="text-white/90">Signature</strong>, create one and paste with <code className="text-[var(--gold-bright)]">Ctrl+V</code>.</li>
                    <li>Save changes at the bottom of the page.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">Outlook (desktop)</h3>
                  <ol className="text-white/70 text-xs leading-relaxed list-decimal pl-4 space-y-1 font-light">
                    <li>Click <strong className="text-white/90">Copy signature</strong> above.</li>
                    <li>Go to <strong className="text-white/90">File → Options → Mail → Signatures</strong>.</li>
                    <li>Create a new signature and paste with <code className="text-[var(--gold-bright)]">Ctrl+V</code>.</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">Outlook on the web</h3>
                  <ol className="text-white/70 text-xs leading-relaxed list-decimal pl-4 space-y-1 font-light">
                    <li>Go to <strong className="text-white/90">Settings → Mail → Compose and reply</strong>.</li>
                    <li>Paste into the signature box and save.</li>
                  </ol>
                </div>

                <p className="text-white/45 text-[0.7rem] leading-relaxed pt-1 border-t border-white/10">
                  <strong className="text-white/70">Use “Copy HTML source”</strong> only if your mail
                  system asks for raw HTML code instead of a formatted paste.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="text-center mt-12 sm:mt-16 pt-8 border-t border-white/10">
          <a
            href={`${import.meta.env.BASE_URL}`}
            className="text-white/50 hover:text-[var(--gold-bright)] text-xs transition-colors"
          >
            ← Back to goldenseafood website
          </a>
          <p className="text-white/30 text-[0.65rem] mt-3">
            The logo is loaded from {SITE_URL.replace('https://', '')} — it must stay online for the
            signature to display in recipients’ inboxes.
          </p>
        </footer>
      </div>
    </div>
  );
}
