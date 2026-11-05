/* TurboAds slapukų juosta + Google Consent Mode v2.
   Šis failas turi būti įkeltas <head> dalyje PRIEŠ Google Tag Manager kodą. */
(function () {
  var KEY = 'turboads_consent_v2';
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Numatytai viskas išjungta, kol žmogus nepasirinko.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function apply(choice) {
    var on = choice === 'all' ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: on,
      ad_user_data: on,
      ad_personalization: on,
      analytics_storage: on
    });
    dataLayer.push({ event: 'consent_update', consent_choice: choice });
  }

  var saved = read();
  if (saved) apply(saved);

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;
    var css = document.createElement('style');
    css.textContent =
      '#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:720px;margin:0 auto;' +
      'background:#fff;color:#0f172a;border:1px solid #e2e8f0;border-radius:14px;box-shadow:0 10px 30px rgba(15,23,42,.18);' +
      'padding:18px 20px;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
      '#cookie-banner p{margin:0 0 14px}#cookie-banner a{color:#e4560a}' +
      '#cookie-banner .cb-btns{display:flex;gap:10px;flex-wrap:wrap}' +
      '#cookie-banner button{flex:1 1 160px;padding:11px 16px;border-radius:10px;font:inherit;font-weight:700;cursor:pointer;border:1px solid #15181c}' +
      '#cookie-banner .cb-yes{background:#ff6a13;border-color:#ff6a13;color:#fff}#cookie-banner .cb-no{background:#fff;color:#15181c}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.id = 'cookie-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Slapukų nustatymai');
    box.innerHTML =
      '<p><b>Naudojame slapukus.</b> Būtini slapukai reikalingi, kad svetainė veiktų. Su jūsų sutikimu naudosime ir ' +
      'Google Analytics, Google Ads ir Meta slapukus lankomumui bei reklamos rezultatams matuoti. <a href="/slapukai">Daugiau apie slapukus</a></p>' +
      '<div class="cb-btns"><button type="button" class="cb-no">Tik būtini</button>' +
      '<button type="button" class="cb-yes">Sutinku su visais</button></div>';
    document.body.appendChild(box);

    function choose(v) { save(v); apply(v); box.remove(); }
    box.querySelector('.cb-yes').onclick = function () { choose('all'); };
    box.querySelector('.cb-no').onclick = function () { choose('necessary'); };
  }

  // Leidžia atidaryti juostą iš naujo (nuoroda „Slapukų nustatymai“ apačioje).
  window.openCookieSettings = function () { showBanner(); return false; };

  if (!saved) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }
})();
