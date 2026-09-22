/* OnePump landing pages — form, sticky bar, reveals.
   Conversions: calls are counted by Google's number-swap snippet in <head> (no click events
   here on purpose — double-counting). Email-button taps fire the "Email click (landing page)" conversion (secondary). */
(function () {
  'use strict';
  var page = document.body.getAttribute('data-page') || 'page';

  /* --- form: AJAX to Web3Forms, then thank-you ------------------------------ */
  var f = document.getElementById('estForm');
  if (f) {
    var msg = document.getElementById('fMsg');
    try {
      var q = new URLSearchParams(location.search);
      var src = (q.has('gclid') || q.has('gad_source') || q.has('gbraid') || q.has('wbraid')) ? 'Google Ads' : 'Direct / other';
      document.getElementById('fSource').value = src + ' — ' + page + ' — ' + location.href;
    } catch (e) {}
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var btn = f.querySelector('button[type=submit]'); var label = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…'; msg.style.display = 'none';
      fetch(f.action, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j.success !== false) { window.location.href = 'thank-you'; return; }
          throw new Error(res.j.message || 'Send failed');
        })
        .catch(function () {
          msg.textContent = "Something went wrong sending your request. Please call or text (361) 212-2245 and we'll get you taken care of.";
          msg.style.display = 'block'; btn.disabled = false; btn.textContent = label;
        });
    });
  }

  /* --- email clicks (no forms on these pages) — GA event + Google Ads conversion --- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (!a || typeof gtag !== 'function') return;
    gtag('event', 'email_click', { page_variant: page, loc: a.getAttribute('data-loc') || 'email' });
    /* Google Ads conversion "Email click (landing page)" (7787860763) — counts the tap, not a sent email */
    gtag('event', 'conversion', { send_to: 'AW-16970002943/ulF6CJumxYEdEP_j9ps_', value: 1.0, currency: 'USD' });
  });

  /* --- sticky call bar: only after the hero scrolls out of view --------------- */
  var bar = document.querySelector('.callbar');
  var hero = document.querySelector('.hero');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { bar.classList.toggle('show', !en.isIntersecting); });
    }, { threshold: 0 }).observe(hero);
  } else if (bar) { bar.classList.add('show'); }

  /* --- scroll reveals ---------------------------------------------------------- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }
})();
