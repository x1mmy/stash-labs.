const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

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
 * "01 / Received" from the email journey - table layout, inline styles and
 * web-safe fonts, because that is what mail clients actually render.
 */
export function receivedEmail(name: string) {
  const first = escape(name.split(' ')[0] || '');
  const greeting = first ? `Thanks, ${first}. It landed` : 'Thanks. It landed';

  const steps = STEPS.map(
    ([title, body], i) => `<tr>
      <td width="34" valign="top" style="width:34px; padding:14px 0; border-top:1px solid #DED7CA; font-family:'Courier New', Courier, monospace; font-size:12px; line-height:22px; color:#E5522A">0${i + 1}</td>
      <td valign="top" style="padding:14px 0; border-top:1px solid #DED7CA; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#55504A"><strong style="color:#16130F">${title}</strong><br />${body}</td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light dark" />
<title>We got your message</title>
<!--[if mso]><style>body,table,td,a{font-family:Arial,Helvetica,sans-serif !important}</style><![endif]-->
<style>
@media only screen and (max-width:620px){
  .wrap{width:100% !important}
  .pad{padding-left:22px !important; padding-right:22px !important}
  .h1{font-size:30px !important; line-height:34px !important}
}
</style>
</head>
<body style="margin:0; padding:0; background-color:#EDE8E0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%">
<span style="display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all">One of us has read it. A real reply is coming within one business day.</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#EDE8E0">
<tr><td align="center" style="padding:28px 12px 40px">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="wrap" style="width:600px; max-width:600px; background-color:#FBF9F5; border:1px solid #DED7CA; border-radius:4px">
  <tr><td class="pad" style="padding:22px 36px; border-bottom:1px solid #DED7CA">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
      <td align="left" style="font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold; color:#16130F; letter-spacing:-0.3px">Stash&nbsp;Labs<span style="color:#E5522A">.</span></td>
      <td align="right" style="font-family:'Courier New', Courier, monospace; font-size:11px; color:#6E675D; letter-spacing:1px; text-transform:uppercase">01 / Received</td>
    </tr></table>
  </td></tr>
  <tr><td class="pad" style="padding:38px 36px 0">
    <h1 class="h1" style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:36px; line-height:40px; font-weight:bold; color:#16130F; letter-spacing:-1px">${greeting}<br />with all three of us.</h1>
  </td></tr>
  <tr><td class="pad" style="padding:18px 36px 0">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#55504A">No auto-responder after this one. One of us reads what you sent, thinks about it, and writes back within one business day, usually with a question or two before anything else.</p>
  </td></tr>
  <tr><td class="pad" style="padding:28px 36px 0">
    <p style="margin:0; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:16px; letter-spacing:1.4px; text-transform:uppercase; color:#E5522A">What happens next</p>
  </td></tr>
  <tr><td class="pad" style="padding:16px 36px 0">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${steps}</table>
  </td></tr>
  <tr><td class="pad" style="padding:30px 36px 0"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="1" style="height:1px; background-color:#DED7CA; font-size:0; line-height:0">&nbsp;</td></tr></table></td></tr>
  <tr><td class="pad" style="padding:26px 36px 0">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; mso-line-height-rule:exactly; color:#55504A">If anything changed since you wrote, or you left something out, just reply to this email. It comes straight to us.</p>
  </td></tr>
  <tr><td class="pad" style="padding:30px 36px 38px">
    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:26px; color:#55504A">- The Stash Labs team<br />
    <span style="font-family:'Courier New', Courier, monospace; font-size:12px; color:#6E675D">Three people, Sydney</span></p>
  </td></tr>
  <tr><td class="pad" style="padding:26px 36px 30px; border-top:1px solid #DED7CA">
    <p style="margin:0 0 10px; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:18px; color:#6E675D">You are getting this because you sent us a message at stashlabs.com.au.</p>
    <p style="margin:0; font-family:'Courier New', Courier, monospace; font-size:11px; line-height:18px; color:#6E675D">Stash Labs &middot; Sydney NSW 2000, Australia<br />
    <a href="mailto:team@stashlabs.com.au" style="color:#E5522A; text-decoration:none">team@stashlabs.com.au</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
