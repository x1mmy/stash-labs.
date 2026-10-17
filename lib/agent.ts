/**
 * Machine-readable pages for agents.
 *
 * Homepage and Hours Check negotiate Markdown when the request asks for
 * `text/markdown`. Unknown paths keep HTTP 404 and, for that same Accept
 * value, return a Markdown body with a way onward. HTML requests are left
 * to the App Router.
 */

export const SITE = 'https://www.stashlabs.com.au';

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';

export function markdownHeaders(status: number): Record<string, string> {
  return {
    'Content-Type': MARKDOWN_CONTENT_TYPE,
    Vary: 'Accept',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': status === 200 ? 'public, max-age=3600' : 'no-store',
    ...(status === 404 ? { 'X-Robots-Tag': 'noindex' } : {}),
  };
}

/** True only when text/markdown is explicitly acceptable at q > 0. */
export function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  for (const part of accept.split(',')) {
    const [typeRaw, ...params] = part.trim().split(';');
    if (typeRaw.trim().toLowerCase() !== 'text/markdown') continue;
    const qParam = params
      .map((param) => param.trim())
      .find((param) => param.toLowerCase().startsWith('q='));
    if (!qParam) return true;
    const q = Number(qParam.slice(2));
    if (Number.isFinite(q) && q > 0) return true;
  }
  return false;
}

export type MarkdownDecision =
  | { kind: 'document'; status: 200 | 404; body: string }
  | { kind: 'passthrough' };

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function isHtmlOnlyPath(path: string): boolean {
  if (path.startsWith('/admin')) return true;
  if (path.startsWith('/api')) return true;
  if (path.startsWith('/card')) return true;
  return path === '/thank-you' || path === '/design-system';
}

export function markdownDecision(pathname: string): MarkdownDecision {
  const path = normalizePath(pathname);
  if (path === '/') return { kind: 'document', status: 200, body: homepageMarkdown() };
  if (path === '/hours-check') {
    return { kind: 'document', status: 200, body: hoursCheckMarkdown() };
  }
  if (isHtmlOnlyPath(path)) return { kind: 'passthrough' };
  return { kind: 'document', status: 404, body: notFoundMarkdown(path) };
}

export function homepageMarkdown(): string {
  return `# Stash Labs

> Stash Labs finds the hours your business loses to admin, and gets them back. Hours Check is the free written report. TimeTally is digital timesheets for Australian businesses.

Sydney engineers, on site. We sit with your team, find the hours your business loses to admin, and get them back by connecting the tools you already pay for. No new platform. No lock-in.

Book a free Hours Check: ${SITE}/#book

## How we work

1. We show up. A few hours on site, watching how the work really gets done.
2. We map it. A plain-English map of your systems, where the hours leak, and what fixing it is worth, before you spend anything on a build.
3. We build it. Fixed price, on the tools you already run. Documented, and your team trained to use it.

After the build we stay on. Something breaks, or the business changes, and we already know how it works.

## Hours Check

A free Hours Check, on site or on a call, ends with a written report that puts a dollar figure on the hours you lose to admin. The Hours Check and the written report are free. A build, if you want one, is a fixed price from that report.

Details: ${SITE}/hours-check

## TimeTally

TimeTally is digital timesheets for Australian businesses, built by Stash Labs: https://www.timetally.com.au/

## Contact

Email team@stashlabs.com.au. There is no public API. Agents book a human conversation through ${SITE}/#book or that email address.

Agent guide: ${SITE}/llms.txt
Sitemap: ${SITE}/sitemap.xml
`;
}

export function hoursCheckMarkdown(): string {
  return `# Hours Check | Stash Labs

> A free Hours Check, on site or on a call, ends with a written report that puts a dollar figure on the hours you lose to admin.

Find out what your admin costs. We spend an hour or two with your team, then hand you a written report.

- On site, about 90 minutes, or a video call, about 60 minutes.
- The report is three pages: the yearly cost, every job we watched, and how much time comes back.
- The Hours Check and the report are free. A build after that is a fixed price, quoted from the report.

Book: ${SITE}/hours-check#book
Email: team@stashlabs.com.au
Home: ${SITE}/
Agent guide: ${SITE}/llms.txt
`;
}

export function notFoundMarkdown(path: string): string {
  const where = path && path !== '/' ? ` \`${path}\`` : ' this address';
  return `# Page not found

Nothing on Stash Labs is published at${where}. The address does not match a page, product, or document on this site.

Try one of these instead:

- [Home](${SITE}/)
- [Hours Check](${SITE}/hours-check)
- [Sitemap](${SITE}/sitemap.xml)
- [Agent guide](${SITE}/llms.txt)
`;
}

export function llmsTxt(): string {
  return `# Stash Labs

> Stash Labs helps Australian small businesses get back the hours they lose to repeated admin. The two things to know are Hours Check, a free written report, and TimeTally, digital timesheets.

## When to use this

Use Stash Labs when the job is one of these:

- Book a free Hours Check for an Australian business losing hours to repeated admin: retyping job sheets or timesheets, chasing invoices, or a spreadsheet only one person understands. Send the person to ${SITE}/#book or email team@stashlabs.com.au. Say whether they want 90 minutes on site or 60 minutes on a video call.
- Explain Hours Check: a visit with the team that ends in a written report with a dollar figure on lost admin time. The check and the report are free. A later build is a separate fixed-price quote.
- Point someone at TimeTally, digital timesheets for Australian businesses, at https://www.timetally.com.au/. TimeTally is a Stash Labs product. It is not a general accounting suite.
- Answer "who is Stash Labs": three Sydney engineers who sit with a team and connect tools the business already pays for. Contact is team@stashlabs.com.au. There is no public API and no login for customers on this site.

Do not use Stash Labs for payroll tax, legal, or accounting advice, for businesses outside Australia, or as a substitute for the business's own bookkeeper. Do not invent a phone number; none is published.

Request ${SITE}/ or ${SITE}/hours-check with \`Accept: text/markdown\` for a Markdown body (\`Content-Type: text/markdown\`, \`Vary: Accept\`). Any other Accept value receives HTML.

## Pages

- [Home](${SITE}/): Hours Check, TimeTally, how an engagement works, and the booking form.
- [Hours Check](${SITE}/hours-check): What the free visit includes and how to book it.
- [Sitemap](${SITE}/sitemap.xml): Public URLs.
`;
}
