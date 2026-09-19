const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

const LOGO_URL = 'https://www.stashlabs.com.au/apple-touch-icon.png';

const STEPS: [string, string][] = [
  ['We read it properly', 'A real reply from a person, about your actual problem.'],
  [
    'We say if we are the wrong fit',
    'If an off-the-shelf tool solves it cheaper, we name the tool.',
  ],
  [
    'Scope in writing before work starts',
    'A fixed scope, a fixed number, a date. Nothing off a verbal maybe.',
  ],
];

/**
 * Confirmation email after a contact form submit.
 * Table layout, inline styles, web-safe fonts — what mail clients actually render.
 * No book-a-call CTA: the point is "we got it, a person will reply".
 */
export function receivedEmail(name: string) {
  const first = escape(name.trim().split(/\s+/)[0] ?? '');
  const greeting = first
    ? `Thanks, ${first}. It landed`
    : 'Thanks. It landed';

  const steps = STEPS.map(([title, body], i) => {
    const last = i === STEPS.length - 1;
    const border = last
      ? 'border-top:1px solid #DED7CA; border-bottom:1px solid #DED7CA;'
      : 'border-top:1px solid #DED7CA;';
    return `<tr>
      <td width="18" valign="top" style="width:18px; padding:15px 0; ${border} font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#E5522A">&bull;</td>
      <td valign="top" style="padding:15px 0; ${border} font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#55504A"><strong style="color:#16130F">${title}</strong><br>${body}</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>We got your message</title>
<!--[if mso]><style>body,table,td,a{font-family:Arial,Helvetica,sans-serif !important}</style><![endif]-->
<style>
@media only screen and (max-width:620px){
  .wrap{width:100% !important}
  .pad{padding-left:24px !important; padding-right:24px !important}
  .h1{font-size:29px !important; line-height:33px !important}
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#EDE8E0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%">

<span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all">One of us has read it. A real reply is coming within one business day.</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#EDE8E0">
<tr><td align="center" style="padding:32px 12px 44px">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px; background-color:#FBF9F5; border:1px solid #DED7CA; border-radius:4px">

  <tr><td class="pad" style="padding:24px 36px; border-bottom:1px solid #DED7CA">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td width="32" valign="middle" style="width:32px; padding-right:12px">
          <img src="${LOGO_URL}" alt="Stash Labs" width="32" height="32" style="display:block; width:32px; height:32px; border-radius:8px; border:0; outline:none; text-decoration:none">
        </td>
        <td valign="middle" style="font-family:Arial, Helvetica, sans-serif; font-size:19px; font-weight:bold; color:#16130F; letter-spacing:-0.3px">Stash&nbsp;Labs<span style="color:#E5522A">.</span></td>
      </tr>
    </table>
  </td></tr>

  <tr><td class="pad" style="padding:40px 36px 0">
    <h1 class="h1" style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:36px; line-height:40px; font-weight:bold; color:#16130F; letter-spacing:-1px">${greeting}<br>with all three of us.</h1>
  </td></tr>

  <tr><td class="pad" style="padding:18px 36px 0">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#55504A">No auto-responder after this one. One of us reads what you sent, thinks about it, and writes back within one business day, usually with a question or two before anything else.</p>
  </td></tr>

  <tr><td class="pad" style="padding:30px 36px 0">
    <p style="margin:0; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:16px; letter-spacing:1.4px; text-transform:uppercase; color:#E5522A">What happens next</p>
  </td></tr>

  <tr><td class="pad" style="padding:16px 36px 0">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${steps}</table>
  </td></tr>

  <tr><td class="pad" style="padding:28px 36px 0">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#55504A">If anything changed since you wrote, or you left something out, just reply to this email. It comes straight to us.</p>
  </td></tr>

  <tr><td class="pad" style="padding:30px 36px 40px">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; color:#55504A">The Stash Labs team<br>
    <span style="font-family:'Courier New', Courier, monospace; font-size:12px; color:#6E675D">Three people, Sydney</span></p>
  </td></tr>

  <tr><td class="pad" style="padding:26px 36px 30px; border-top:1px solid #DED7CA">
    <p style="margin:0 0 10px; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:18px; color:#6E675D">You are getting this because you sent us a message at stashlabs.com.au.</p>
    <p style="margin:0; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:18px; color:#6E675D">Stash Labs, Sydney NSW 2000, Australia<br>
    <a href="mailto:team@stashlabs.com.au" style="color:#E5522A; text-decoration:none">team@stashlabs.com.au</a></p>
  </td></tr>

</table>
</td></tr>
</table>

</body>
</html>`;
}
