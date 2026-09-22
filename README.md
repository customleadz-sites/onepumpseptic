# OnePump Septic — Google Ads landing pages

**Read this before editing anything.** Built + DEPLOYED 2026-09-22.
**LIVE: https://onepumpseptic.vercel.app** (repo `customleadz-sites/onepumpseptic`, git repo lives inside this `site/` folder, Vercel project `onepumpseptic` / prj_Claj39a8l4f8Z3PeaLxJHNAxhoza, team custom-leadz, cleanUrls). Push to `main` = production deploy.
Client brief: `../info/client-brief.md`. Campaign: `../google-ads/campaigns/launch-plan.md` + `build-spec.json`.

## The pages

| File | URL | Ad groups it serves | Angle |
|---|---|---|---|
| `index.html` | `/` (+ `#aerobic`, `#area`, `#estimate` sitelink anchors) | Septic Tank Pumping · Septic Tank Cleaning · Septic Service & Companies · Aerobic System Pumping | H1 "Septic Tank Pumping & Cleaning — Licensed & Insured" (Kennedy cut "in Victoria, TX" 2026-09-22). Differentiator = "tanks pumped all the way down" (CSS tank-gauge graphic), owner-answers trust, 5 real reviews |
| `emergency.html` | `/emergency` | Emergency & Same-Day | Call-first. Red urgent band, H1 "Septic Backing Up? We Can Usually Get There Today." Shorter, form secondary |
| `thank-you.html` | `/thank-you` | — | Unused today (no forms); kept in case a form returns. Fires no conversion. |
| `privacy.html` | `/privacy` | — | From the local-landing-page skill template (SMS/STOP + call-recording clauses). Only footer link |
| `404.html` | — | — | Phone + link back |

Brand pulled from onepumpseptic.com (navy `#0C3050`, red `#B5202A`, cream, Barlow Condensed + Barlow) so ad → page → his real site feels like one business. Signature motif: the red/navy "reflective tape" stripe between sections + the skimmed-vs-OnePump tank gauge. All photos are Matt's real trucks/jobs (`images/`, WebP, from his site). Logo from his site.

## ⚠️ Before the campaign is enabled

1. **`index.html` has NO form (Kennedy's call, 2026-09-22)** — the estimate section is a "Send us an email" card: a `mailto:layne@onepumpseptic.com` button with a prefilled subject + outline (name/phone/town/tank/what's going on). Email-button taps fire the Google Ads conversion **"Email click (landing page)"** (`AW-16970002943/ulF6CJumxYEdEP_j9ps_`, action 7787860763, category Contact, SECONDARY — it's a tap, not a sent email) plus a GA `email_click` event. `emergency.html` got the same treatment (Kennedy, 2026-09-22) — **neither page has a form now.** `thank-you.html` is kept as a real URL in case a form ever comes back; nothing links to it and it fires no conversion.
2. ~~Web3Forms key~~ — not needed anymore; no forms on either page. Web3Forms keys are tied to an email address and need a verification click, so Kennedy has to create it (web3forms.com → enter the lead email → confirm → paste the key in both files). Until then the form fails gracefully — visitor sees "call or text (361) 212-2245" — but **no leads are delivered**. After pasting: submit one live test in a real browser (Web3Forms blocks curl), confirm the email arrives and `/thank-you` loads.
   - Lead email per Matt: **layne@onepumpseptic.com** — confirm Matt actually reads it (Layne is his dad, no longer in the business). The Web3Forms key should be made for whichever inbox Matt really checks.
3. **Tracking is LIVE in the code (not stubbed):** Google Ads tag `AW-16970002943` on every page; website-call number swap `AW-16970002943/PFsgCJimxYEdEP_j9ps_` (conversion "Calls from website", 7787860760) with `phone_conversion_number: (361) 212-2245`; the email buttons fire `AW-16970002943/ulF6CJumxYEdEP_j9ps_` ("Email click (landing page)", 7787860763, secondary). **The number-swap snippet is on ALL five pages** (index, emergency, thank-you, privacy, 404) and every visible number is the exact `(361) 212-2245` string, so Google can swap every one of them. Every call button shows the number as plain text so Google's swap can latch on. **No tel-click conversions in main.js on purpose** — the swap counts calls; click events would double-count. Verify with Tag Assistant after deploy.
4. **Google reviews: 5.0 across 76** (count from Kennedy, 2026-09-22) — shown in the `.gbar` strip and the reviews banner on both pages. Update the number when it grows.

## Constraints (don't break these)
- Pumping/cleaning ONLY. No repairs, installs, part replacement, aerobic maintenance contracts. The page says so three times on purpose (cards, form "heads up", FAQ) — Matt asked that form leads know this.
- Claims on the page are sourced: TCEQ #25629, liability insured, family owned since 2019, 5.0 on Google, the five reviews verbatim — all from his live site / his answers. Don't add "24/7", guarantees, or years-of-experience beyond 2019.
- Kennedy cut these phrases from the ad HEADLINES (2026-09-22) — they're fine in body copy but don't promote them to H1s: "Usually There The Same Day", "7 Counties Around Victoria", "No Mess Left In Your Yard", "Talk To The Man With The Truck", "The Price Quoted Is The Price".
- No nav, no social links, no links to onepumpseptic.com — the only footer link is Privacy Policy.
- Sitelinks in the campaign point at THESE pages only (never the main website) so every click lands somewhere tracked.
- `noindex` on all pages is deliberate (ads pages; his real site is onepumpseptic.com).

## Tech notes
- Static HTML + one `style.css` + one `main.js` (form AJAX → `/thank-you`, sticky bar after hero, scroll reveals).
- Safari bars recipe from the skill: sticky header with 100vh shield above, sticky (not fixed) bottom bar with shield below, `html{background:navy-ink}`, no theme-color. **Gotcha found on this build:** anything rendered ABOVE the sticky header (`.infobar`, `.urgent`) needs `position:relative; z-index:101` or the header's shield paints over it (fixed in `style.css`).
- `vercel.json`: cleanUrls, images immutable, CSS/JS `max-age=0, must-revalidate`. Bump `?v=` on `style.css`/`main.js` links when they change.
- Initial payload on `/` ≈ 200 KB (hero 104 KB mobile / 306 KB desktop). Everything below the fold is `loading="lazy"`.
- Local review: double-click `Preview Site.command` (gitignored) → http://localhost:8765. If 8765 is busy, a stale preview server from another client is probably running — `lsof -iTCP:8765` and kill it.

## Deploy (read the git-deploy skill first)
Deployed 2026-09-22. To ship a change: edit → `git add <files>` → commit as Kennedy → push `main` (keychain token per git-deploy) → Vercel auto-deploys. Bump `?v=` on `style.css`/`main.js` links when they change. Still to do before enabling campaign 24273051777: Tag Assistant check on the live URL, a test call from an ad-tagged visit (forwarding number should appear), one email-button tap registering as "Email click".
