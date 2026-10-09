/**
 * Genera el HTML de la firma de correo.
 *
 * Restricciones de los clientes de correo, que explican por que esto no se
 * parece a React normal:
 *  - Outlook renderiza con el motor de Word: nada de flexbox, grid ni CSS
 *    externo. La maquetacion tiene que ser <table> con estilos EN LINEA.
 *  - Las fuentes web no cargan. Se usa Arial, que existe en todas partes.
 *  - La imagen necesita una URL absoluta y publica: una ruta relativa se
 *    rompe en cuanto el correo sale del navegador.
 */

/** Dominio publico del sitio. Cambiar aqui si se migra a gldseafood.com. */
export const SITE_URL = 'https://nutellasimpdev.github.io/GldSeaFood';

/** Muestreados del propio logo para que la firma combine exacto. */
export const NAVY = '#0c3054';
export const GOLD = '#c09024';

export interface SignatureData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
}

const escapar = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildSignature(d: SignatureData): string {
  const nombre = escapar(d.fullName.trim()) || 'Your Name';
  const cargo = escapar(d.jobTitle.trim()) || 'Your Job Title';
  const correo = escapar(d.email.trim());
  const telefono = escapar(d.phone.trim());

  const fuente = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

  // Cada fila de contacto se construye aparte para poder omitir las vacias
  const filaContacto = (etiqueta: string, valor: string, href?: string) => {
    if (!valor) return '';
    const contenido = href
      ? `<a href="${href}" style="color:${NAVY};text-decoration:none;">${valor}</a>`
      : valor;
    return `<tr><td style="padding:1px 0;font-family:${fuente};font-size:13px;line-height:19px;color:${NAVY};">`
      + `<span style="color:${GOLD};font-weight:bold;">${etiqueta}</span>&nbsp;${contenido}`
      + `</td></tr>`;
  };

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:${fuente};">
  <tr>
    <td style="padding:0 18px 0 0;vertical-align:middle;">
      <img src="${SITE_URL}/images/logo-email.png" width="150" alt="Golden Seafood" style="display:block;width:150px;max-width:150px;height:auto;border:0;outline:none;text-decoration:none;" />
    </td>
    <td style="padding:0 0 0 18px;vertical-align:middle;border-left:2px solid ${GOLD};">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 1px 0;font-family:${fuente};font-size:17px;line-height:22px;font-weight:bold;color:${NAVY};">${nombre}</td>
        </tr>
        <tr>
          <td style="padding:0 0 7px 0;font-family:${fuente};font-size:13px;line-height:18px;font-weight:bold;color:${GOLD};letter-spacing:0.4px;text-transform:uppercase;">${cargo}</td>
        </tr>
        ${filaContacto('E', correo, `mailto:${correo}`)}
        ${filaContacto('T', telefono, `tel:${telefono.replace(/[^+\d]/g, '')}`)}
        ${filaContacto('W', 'www.gldseafood.com', 'https://www.gldseafood.com')}
        <tr>
          <td style="padding:7px 0 0 0;font-family:${fuente};font-size:11px;line-height:16px;color:#6b7a8d;">
            Direct Import &amp; Wholesale Seafood Logistics<br />
            Peru &middot; Mexico &middot; Colombia &middot; Costa Rica &middot; China &middot; Vietnam
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/** Version en texto plano, para clientes que no aceptan HTML. */
export function buildPlainText(d: SignatureData): string {
  const lineas = [
    d.fullName.trim() || 'Your Name',
    d.jobTitle.trim() || 'Your Job Title',
    '',
    d.email.trim() ? `E: ${d.email.trim()}` : '',
    d.phone.trim() ? `T: ${d.phone.trim()}` : '',
    'W: www.gldseafood.com',
    '',
    'Golden Seafood — Direct Import & Wholesale Seafood Logistics',
  ];
  return lineas.filter(l => l !== '' || true).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
