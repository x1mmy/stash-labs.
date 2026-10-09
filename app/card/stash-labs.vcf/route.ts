import { buildVCard } from '@/lib/card';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildVCard(), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      // inline, not attachment: iOS then opens its "Add contact" sheet straight
      // away instead of asking to download a file first.
      'Content-Disposition': 'inline; filename="stash-labs.vcf"',
    },
  });
}
