/** The one source for the contact card: the popup, /card, and the .vcf file. */
export const CARD = {
  name: 'Stash Labs',
  tagline: 'Sydney engineers, on site',
  blurb:
    'We sit with your team, find where the hours go, and connect the tools you already pay for.',
  email: 'team@stashlabs.com.au',
  // No shared number yet. Fill this in (E.164, e.g. +61400000000) and the
  // card and the saved contact both pick it up.
  phone: '',
  url: 'https://www.stashlabs.com.au',
  locality: 'Sydney',
  region: 'NSW',
  country: 'Australia',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/stash-labs/' },
    { label: 'Instagram', url: 'https://www.instagram.com/stash.labs/' },
  ],
};

export type Card = typeof CARD;

/** Where the card lives. */
export const CARD_PATH = '/card';
export const VCARD_PATH = '/card/stash-labs.vcf';
export const QR_PATH = '/card/qr.svg';

/**
 * The card's permanent address: what goes on an NFC tag, in the QR code and
 * into the share sheet. Always production, so a link shared from a preview
 * deploy still works next month.
 */
export const CARD_URL = `${CARD.url}${CARD_PATH}`;

/** vCard text values treat backslash, comma, semicolon and newline as syntax. */
const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\r?\n/g, '\\n');

/**
 * vCard 3.0, the version both iOS and Android contacts import cleanly.
 * Saved as a company: an empty N plus X-ABShowAs stops iOS filing it as a person.
 */
export function buildVCard(card: Card = CARD): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(card.name)}`,
    'N:;;;;',
    `ORG:${esc(card.name)}`,
    'X-ABShowAs:COMPANY',
    `EMAIL;TYPE=INTERNET,WORK:${card.email}`,
    card.phone && `TEL;TYPE=WORK,VOICE:${card.phone}`,
    `URL:${card.url}`,
    `ADR;TYPE=WORK:;;;${esc(card.locality)};${esc(card.region)};;${esc(card.country)}`,
    ...card.socials.map(
      (s) => `X-SOCIALPROFILE;TYPE=${s.label.toLowerCase()}:${s.url}`
    ),
    'END:VCARD',
  ];

  // The spec wants CRLF, and some Android importers reject bare LF.
  return lines.filter(Boolean).join('\r\n') + '\r\n';
}
