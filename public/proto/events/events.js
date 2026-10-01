// Pieces every What's happening option shares. Needs shell.js first.
window.ev = {
  // the plain facts, as a definition list
  facts: (e = EVENT) => `
    <dl class="ev-facts">
      <div><dt>WHEN</dt><dd>${eventDate()} · ${e.start} to ${e.end}</dd></div>
      <div><dt>WHERE</dt><dd><a class="ev-map" href="${e.map}" aria-label="${e.street}: open in Google Maps">${e.street}</a></dd></div>
      <div><dt>COST</dt><dd>Free</dd></div>
      <div><dt>SIGN-UPS</dt><dd>At the door, 6 to 6:15pm</dd></div>
    </dl>`,
  rsvp: (e = EVENT) => `<a class="ev-btn" href="${e.rsvp}" target="_blank" rel="noopener">RSVP on Partiful <span aria-hidden="true">&#8599;</span></a>`,
  ask: (e = EVENT) => `<p class="sm ev-ask">Questions? Call ${e.contact.name} at <a class="tel" href="tel:${e.contact.tel}">${e.contact.phone}</a></p>`,
  // phones: the flyer folds behind a tap; desktop shows it in its own column
  flyerToggle: (e = EVENT) => `
    <details class="ev-fold"><summary>See the flyer</summary>
      <img src="${e.poster}" alt="${e.alt}" width="1019" height="1320" loading="lazy"></details>`,
  flyer: (e = EVENT) => `<img class="ev-poster" src="${e.poster}" alt="${e.alt}" width="1019" height="1320" loading="lazy">`,
  // the section, or nothing once the event is over
  section: (inner) => eventWhen() ? `<section class="ev" aria-labelledby="ev-h"><p class="lbl ev-lbl" id="ev-h">WHAT'S HAPPENING</p>${inner}</section>` : "",
};
