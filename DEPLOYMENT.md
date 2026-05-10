# Deployment — N-AI on `n-ai.dev`

End-to-end checklist to take this repo from `main` to a live `https://n-ai.dev` with HTTPS, www → apex redirect, security headers and OG image.

---

## 1 · Push to GitHub

Repository name: **`WebSite_personal`** (per request).

```bash
# from repo root
git remote add origin https://github.com/<your-user>/WebSite_personal.git
git push -u origin main
```

If using `gh` CLI:

```bash
gh repo create WebSite_personal --private --source=. --remote=origin --push
```

> Use `--public` instead of `--private` if you want it open.

---

## 2 · Deploy to Vercel

### One-time

1. Sign in at https://vercel.com using the same GitHub account.
2. Click **Add New… → Project**.
3. Import `WebSite_personal` from your GitHub.
4. Framework preset auto-detects **Next.js**. Leave all defaults.
5. Add Environment Variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://n-ai.dev`
   - Apply to **Production**, **Preview**, **Development**.
6. Click **Deploy**.

You'll get a default URL like `https://website-personal-<hash>.vercel.app`. Verify it loads.

### Every push afterwards

- Pushes to `main` → production deploy on Vercel.
- Pushes to other branches → preview deploys with their own URL.

---

## 3 · Custom domain `n-ai.dev`

> `.dev` is on the **HSTS preload list**, which means every browser will refuse non-HTTPS access to your domain. Vercel auto-provisions SSL — this works seamlessly, but it does mean you cannot test over plain HTTP.

### 3.1 Add the domain in Vercel

In the Vercel project → **Settings → Domains**:

1. Add `n-ai.dev` → set as **primary**.
2. Add `www.n-ai.dev` → choose **Redirect to n-ai.dev (308)**.

Vercel will display the DNS records you need to set at your registrar.

### 3.2 DNS records to add

At your domain registrar (the place where you bought `n-ai.dev` — e.g. Google Domains/Squarespace, Namecheap, Cloudflare, Porkbun), open the DNS settings and add:

| Type    | Host / Name | Value               | TTL     |
| ------- | ----------- | ------------------- | ------- |
| `A`     | `@`         | `76.76.21.21`       | Auto / 3600 |
| `CNAME` | `www`       | `cname.vercel-dns.com.` | Auto / 3600 |

> Vercel may show a different IP — **always trust the value Vercel displays in the dashboard** over this table. The `A` record above is the current Vercel anycast IP at time of writing.

> If your registrar uses Cloudflare DNS proxy: set **DNS-only (grey cloud)**, not proxied. Vercel handles SSL itself; proxying through Cloudflare causes certificate issues unless you explicitly configure it.

### 3.3 Verify

After saving DNS, return to Vercel → Domains. The domain status will progress:

1. `Invalid Configuration` → DNS not yet propagated. Wait 1–30 minutes.
2. `Valid Configuration` → SSL cert auto-issued via Let's Encrypt.
3. ✅ green checkmark.

Test:

```bash
curl -I https://n-ai.dev
curl -I https://www.n-ai.dev   # should 308 → https://n-ai.dev/
```

---

## 4 · Security & headers

`vercel.json` already configures:

- HSTS (2 years, includeSubDomains, preload-ready)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, mic, geolocation, FLoC all denied)
- `Content-Security-Policy` (self + Vercel analytics + Google Fonts)
- Long-lived `Cache-Control: immutable` on static assets

To submit to the **HSTS preload list** (so first-time visitors are HTTPS-only):
1. Make sure HSTS has run for ≥ 1 week with `preload` header.
2. Submit at https://hstspreload.org/.

---

## 5 · Email on `n-ai.dev`

The site references `hello@n-ai.dev`. To make that mailbox actually receive mail you need MX + SPF + DKIM + DMARC at your registrar's DNS:

- **Cheapest route**: forward to your existing inbox via your registrar's "email forwarding" (most registrars include this free).
- **Real mailbox**: Google Workspace, Fastmail, Proton, Zoho.

| Type   | Host        | Value (example)                                  | Notes |
| ------ | ----------- | ------------------------------------------------ | ----- |
| `MX`   | `@`         | per provider                                     | priority varies |
| `TXT`  | `@`         | `v=spf1 include:_spf.<provider>.com ~all`        | SPF |
| `TXT`  | `_dmarc`    | `v=DMARC1; p=quarantine; rua=mailto:hello@n-ai.dev` | DMARC |
| `TXT`  | `<selector>._domainkey` | provided by mail provider             | DKIM |

Until you set these up, `hello@n-ai.dev` won't receive mail.

---

## 6 · Search engine onboarding

After production goes green:

1. **Google Search Console** — https://search.google.com/search-console
   - Add property `https://n-ai.dev`
   - Verify via DNS TXT record (Vercel → Domains shows the same screen).
   - Submit sitemap: `https://n-ai.dev/sitemap.xml`.
2. **Bing Webmaster Tools** — https://www.bing.com/webmasters
3. (Optional) Submit to https://hstspreload.org/.

---

## 7 · Local development

```bash
pnpm install
pnpm dev    # http://localhost:3000
pnpm build  # production build
```

Optional `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Troubleshooting

| Symptom | Fix |
| ------- | --- |
| `ERR_SSL_PROTOCOL_ERROR` on first load | Wait 5 min — `.dev` HSTS preload requires SSL active before browsers will connect. |
| `www` doesn't redirect to apex | Confirm in Vercel → Domains that `www.n-ai.dev` is set to **Redirect**, not Primary. |
| Cloudflare proxy → 526/525 errors | Set CNAME/A records to **DNS-only (grey cloud)**. |
| Old `n-ai.studio` references in cache | Hard refresh; metadata uses `NEXT_PUBLIC_SITE_URL` env. |
| OG image doesn't show on social | Validate at https://www.opengraph.xyz/url/https%3A%2F%2Fn-ai.dev. |
