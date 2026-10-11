import { CARD_URL } from '@/lib/card';
import { qrSvg } from '@/lib/qr';

export const dynamic = 'force-static';

export function GET() {
  return new Response(qrSvg(CARD_URL), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
