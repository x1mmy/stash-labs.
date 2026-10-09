import qrcode from 'qrcode-generator';

// Scanners want dark modules on a light plate, so these stay fixed rather than
// following the theme: the paper ink on white.
const DARK = '#16130f';
const LIGHT = '#ffffff';
/** The blank border the QR spec asks for, in modules. */
const QUIET = 4;

/** A QR code for `text` as a standalone SVG document, one unit per module. */
export function qrSvg(text: string): string {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();

  const n = qr.getModuleCount();
  let path = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.isDark(y, x)) path += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;
    }
  }

  const size = n + QUIET * 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">` +
    `<rect width="${size}" height="${size}" fill="${LIGHT}"/>` +
    `<path d="${path}" fill="${DARK}"/>` +
    `</svg>`
  );
}
