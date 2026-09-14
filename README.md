# matteo0001.com

A static personal site. No build step, no framework — HTML, CSS, and ES
modules. Content lives in `/data`, so adding a role or a project never
means touching layout or animation code.

## Structure

```
index.html             Main site: hero, about, experience, work,
                        certifications, involvement, contact
about.html             Where it came from — the upbringing behind the
                        professional record, told in numbered chapters with
                        a sticky navigator, linked from the hero
css/
  main.css             Tokens + all shared styles
js/
  main.js              Nav, scroll reveal + parallax, greeting, clocks,
                        chapter navigator, counting figures
  render-home.js       Renders index.html's sections from /data
  render-about.js      Renders about.html from /data
data/
  about.js             Chapters + capabilities for about.html
  config.js            Links and domain
  experience.js        Roles, reverse-chronological
  projects.js          Write-ups
  skills.js            Certifications
  involvement.js       Involvement: roles, societies, volunteering
assets/
  hca-healthcare.pdf   Bluegrass equity research report, Apr 2026
  marathon-petroleum.pdf  UK 2026 Stock Pitch Competition deck
CNAME                  Custom domain for GitHub Pages
robots.txt
sitemap.xml
.nojekyll              Stops GitHub Pages running Jekyll over the repo
```

## Design

- **Colour** — deep navy base (`--navy-900: #070c16`), bone text
  (`--bone: #e9e7e1`), one accent: a muted brass (`--accent: #c2a878`),
  used sparingly on hover, active nav, and index numbers. All the tokens
  are at the top of `css/main.css`; change them there and the whole site
  follows.
- **Type** — Instrument Serif for display, IBM Plex Sans for body, IBM
  Plex Mono for metadata (dates, labels, section indices). Dates use
  tabular figures so columns line up.
- **Structure** — each section is a sticky left rail (index + label) beside
  a content column. Everything is separated by hairlines rather than
  cards, and every hairline aligns to the same right edge.
- **Motion** — the greeting rises out of a mask on load; hairlines draw
  themselves left-to-right as you reach them, with content fading in just
  behind. Scrolling away from the hero drifts it upward and dissolves it,
  and a brass hairline across the top of the window tracks progress through
  the page. On the About page a spine beside the chapter list fills as you
  read, and the headline figures count up the first time they scroll into
  view. Links underline with a wipe. All of it is off under
  `prefers-reduced-motion` — the figures just appear at their final value.
- **The greeting** reads the *visitor's* own clock, not a server's: "Good
  morning" before noon, "Good afternoon" until 18:00, "Good evening" after.
  Thresholds are in `initGreeting()` in `js/main.js`. The location line
  beneath it ("from Atlanta, Georgia") is static and is Matteo's, not the
  visitor's; nothing on the site geolocates anyone.
- **Market clocks** in the footer — New York, London, Singapore. Each
  `<time data-clock="America/New_York">` names its own IANA zone in
  `index.html`, so adding or swapping a city is a markup change, not a code
  change.

## Editing content

- **Add a role** → push an object onto the array in `data/experience.js`.
  Each role is `summary` (a short paragraph about what the work actually
  was) plus `artifacts` (the concrete things that came out of it) under an
  `artifactsLabel` you choose per role — "What I built", "The call", "The
  numbers". Deliberately not a resume bullet list.
- **Add a write-up** → `data/projects.js`.
- **The long-form story** → `data/about.js`. `chapters` render in order and
  each one picks up a numbered entry in the sticky chapter navigator
  automatically, `stats` are the headline figures that count up when they
  scroll into view (`value` plus optional `prefix`/`suffix`), `operating` is
  the 2019–2022 record with its real figures, and `capabilities` is grouped
  rather than a badge wall.
- **Certifications / involvement** → same pattern in `data/skills.js` and
  `data/involvement.js`.
- **Links** → `data/config.js`. Note the LinkedIn and email links are also
  hardcoded in `index.html` so they still work if a script fails to load —
  if you change one, change both.
- **The About facts table** (study, standing, abroad, languages, focus) and
  the hero copy live directly in `index.html`.

The hero copy is deliberately evergreen — it names the degree and school
and nothing that expires, so it doesn't need editing every time a role
changes. Anything time-bound belongs in `data/experience.js`.

## The two pages

`index.html` is the professional record: experience, work, certifications,
involvement. Everything on it is time-bound and lives in `/data`.

`about.html` is the upbringing behind it — sneakers at fourteen, Sneaker
Twitter, the subscription business, the detour through medicine, and the
route into finance. It's a normal indexable page linked from the hero.

There used to be a separate hidden `/ventures` page listing the operating
companies one by one with a `noindex` tag and a toggle to hide the link.
That's been folded into `data/about.js` and deleted. One honest account of
those years beats a public version plus a hidden one — and the About page
frames the period the way that market is now actually understood: an
infrastructure business with real price discovery and brutal retention
economics, which is a framing a finance reader can evaluate.

## Running locally

The pages use `<script type="module">`, so opening `index.html` over
`file://` won't work — browsers block module imports from the filesystem.
Serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploying to GitHub Pages

1. **Settings → General → Default branch** must be `main`. Changing this
   needs the confirmation dialog; it does not save until you accept it.
2. **Settings → Pages → Source**: `Deploy from a branch`, branch `main`,
   folder `/ (root)`. Pages keeps its own branch setting, so changing the
   default branch does **not** repoint Pages on its own.
3. **Custom domain**: `matteo0001.com`. GitHub rewrites the `CNAME` file to
   match whatever you enter here.
4. Once DNS resolves and GitHub issues the certificate, tick **Enforce
   HTTPS**.

## Analytics

Off by default. Both fields in `config.analytics` (`data/config.js`) are
empty, and while they are, no script loads and no third-party request is
made — the site behaves as if analytics were never added. Fill in
whichever account you have; filling in both just double-counts.

Either option is free, cookieless and needs no consent banner, and both
report the same things: page views, visitors, referrers (so a LinkedIn
click is distinguishable from someone typing the domain), country, device,
and which of the two pages people actually read. Neither can tell you who
an individual visitor was, and no analytics product honestly can — the
ones that claim to are guessing from IP addresses.

**GoatCounter** — the simpler signup. Create an account at
goatcounter.com, pick a subdomain, and put that word in `goatCounterCode`.
If the dashboard is at `matteo.goatcounter.com`, the value is `matteo`,
not the full URL.

**Cloudflare Web Analytics** — Analytics & Logs → Web Analytics → Add a
site → `matteo0001.com`, then copy the token out of the `data-cf-beacon`
snippet into `cloudflareToken`. Two things reliably derail this flow:

- The hostname field is a combobox. Typing does not commit the value; the
  dropdown entry offering to use the typed hostname has to be clicked, or
  Done silently does nothing.
- If Done spins forever, a content blocker is eating the request. The API
  path contains the word "analytics", which most filter lists block. A
  private window, where extensions are off, gets through it.

Cloudflare will also say the hostname does not belong to a website on the
account. That is expected — this domain's DNS is at Squarespace — and the
JS snippet works regardless.

Either token is meant to be public. It identifies the site, not the
account, and ships in the page source of every site that uses it.

`initAnalytics()` in `js/main.js` does the injection.

## DNS (Squarespace)

The domain is registered and its DNS is managed at **Squarespace**
(`account.squarespace.com` → Domains → matteo0001.com → DNS Settings), not
at the registrar-plus-CDN setup an earlier version of this file described.
Nothing is on Cloudflare.

Records currently live, all verified resolving:

| Type | Name | Data | What it is |
|---|---|---|---|
| A | `@` | `185.199.108.153` | GitHub Pages |
| A | `@` | `185.199.109.153` | GitHub Pages |
| A | `@` | `185.199.110.153` | GitHub Pages |
| A | `@` | `185.199.111.153` | GitHub Pages |
| CNAME | `www` | `matteo-develop.github.io` | so `www.` reaches the site |
| MX | `@` | `mx01.mail.icloud.com` (priority 10) | iCloud Mail |
| MX | `@` | `mx02.mail.icloud.com` (priority 10) | iCloud Mail |
| TXT | `@` | `v=spf1 include:icloud.com ~all` | SPF, for mail |
| TXT | `@` | `apple-domain=...` | Apple domain verification |
| CNAME | `sig1._domainkey` | `sig1.dkim.matteo0001.com.at.icloudmailadmin.com` | DKIM, for mail |
| CNAME | `gltiuypwhvdw` | `gv-...dv.googlehosted.com` | Google site verification |

The four `A` records and the `www` `CNAME` are what serve the site. **Do
not delete the MX, SPF, DKIM or Apple records** — those carry mail on the
domain, and removing them silently breaks email rather than the website,
which is the kind of breakage you notice a week late.

Optionally, the matching `AAAA` records for IPv6:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### HTTPS

Live and enforced. `http://matteo0001.com` redirects to `https://`, so
there is nothing outstanding here.

Worth knowing for next time: GitHub issues the certificate only after its
own DNS check passes, which can take up to 24 hours after the records are
correct, and **Enforce HTTPS is a manual checkbox** that has to be ticked
afterwards. Nothing prompts you. Until it is ticked the site serves over
plain `http://` and browsers label it "Not secure", which on a site being
sent to employers undoes a good deal of what the design is for.

If the certificate ever lapses or the check gets stuck, the usual causes
are a `CAA` record blocking Let's Encrypt (there is none on this domain)
or a stale `CNAME` file in the repo. Removing and re-entering the custom
domain under Settings → Pages restarts the check.

Every URL the site declares about itself is already `https://` — the
canonicals, both `og:url` values, `sitemap.xml`, `robots.txt` and
`config.site.url` — and no asset is fetched over plain HTTP, so there is
no mixed content to warn about. The two `http://` strings that turn up in
a grep are XML namespace identifiers in `sitemap.xml` and the inline SVG
in `main.css`; those are opaque identifiers rather than addresses, and
they stay as they are.

If you ever change the domain, update `CNAME`, `config.site.url` in
`data/config.js`, the canonical and `og:url` values in `index.html`, and
the URLs in `sitemap.xml` and `robots.txt`.

## Notes

Note on `about.operating`: those four roles and their figures (400+
subscribers, a team of 15, $100k/month across two people, 6,000+ users,
$10M+ in annual transactions, 70% ticket reduction) came from a LinkedIn
export taken before those entries were deleted from the profile. The team
sizes are Matteo's own account of businesses he ran, and take precedence
over the export where the two differ. The website is now the only public
place any of it appears, so there is no second source to check it
against.

Treat that as a hard boundary: these are **website narrative, not
application fact**. They are fine here, telling his own story on his own
site. They should not migrate onto a resume, a job application, or any
form where an employer would reasonably expect to verify them. Everything
else on the site can be checked against the resume or the two PDFs in
`assets/`; these cannot.
There is no photo anywhere in the current design — it's entirely
type-driven, which is a deliberate choice and reads well for finance. If
you want a headshot, that's a layout change, not a drop-in; say so and it
can be worked into the hero or About.
