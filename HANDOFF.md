# N-AI — Project Handoff

> Documento de referencia para retomar el proyecto en cualquier momento.
> Sitio: https://n-ai.dev · Repo: https://github.com/nayrr25/WebSite_personal

---

## 🔗 URLs y accesos

| Recurso | URL | Notas |
| --- | --- | --- |
| **Sitio público** | https://n-ai.dev | Vercel + SSL Let's Encrypt + HSTS preload |
| **WWW redirect** | https://www.n-ai.dev | 308 → apex |
| **URL Vercel directa** | https://web-site-personal-gamma.vercel.app | Fallback |
| **Repo GitHub** | https://github.com/nayrr25/WebSite_personal | Privado, owner `nayrr25` |
| **Vercel Project** | https://vercel.com/nanyrr25-8753s-projects/web-site-personal | Plan Hobby (gratis) |
| **Porkbun (DNS)** | https://porkbun.com/account/domain_management | Registrar + DNS host |
| **Google Search Console** | https://search.google.com/search-console | Property: `n-ai.dev` (Domain) |
| **Bing Webmaster** | https://www.bing.com/webmasters | Importado desde GSC |
| **Sitemap** | https://n-ai.dev/sitemap.xml | Auto-generado por Next.js |
| **Robots** | https://n-ai.dev/robots.txt | Auto-generado |
| **LLMs.txt** | https://n-ai.dev/llms.txt | Para crawlers de IA |
| **OG image** | https://n-ai.dev/opengraph-image | Previews sociales |

---

## ⚙️ Stack técnico

- Next.js 14.2 (App Router) + TypeScript
- Tailwind CSS 3.4 + tokens custom
- Framer Motion (animaciones)
- Recharts (lazy-loaded, solo en case study)
- lucide-react (iconos)
- Inter (UI) + Instrument Serif (acentos editoriales)
- pnpm 9.15 (via corepack)
- Node 18.20.8 (via nvm)
- Vercel Hobby (hosting)
- Porkbun (registrar + DNS + email forwarding)

---

## 🚀 Arrancar localmente

```bash
cd ~/Documents/n-ai-site
pnpm install        # primera vez o después de pull
pnpm dev            # http://localhost:3000
pnpm build          # verificar que compila
pnpm lint           # ESLint
```

### Retomar en otra máquina

```bash
brew install node
npm install -g pnpm           # o `corepack enable`
git clone https://github.com/nayrr25/WebSite_personal.git ~/Documents/n-ai-site
cd ~/Documents/n-ai-site
pnpm install
pnpm dev
```

---

## 🚢 Cómo desplegar cambios

```bash
cd ~/Documents/n-ai-site
# edita lo que quieras
pnpm build              # (opcional) verificar build
git add -A
git commit -m "tu mensaje"
git push                # Vercel auto-deploya en ~90s
```

Después: `Cmd+Shift+R` en `n-ai.dev` para ver cambios sin cache.

---

## 📂 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx               # Root layout, metadata, font loading
│   ├── page.tsx                 # Composición de secciones
│   ├── globals.css              # Estilos globales + utilidades
│   ├── opengraph-image.tsx      # OG image dinámica (edge runtime)
│   ├── robots.ts                # /robots.txt
│   └── sitemap.ts               # /sitemap.xml
├── components/
│   ├── backgrounds/             # ParticleNetwork, AuroraGradient, GridGlow
│   ├── charts/                  # AnomalyChart, RiskScoreGauge, PipelineDiagram
│   ├── layout/                  # Nav, Footer, Container, Section, SkipToContent
│   ├── motion/                  # Reveal, StaggerChildren, MagneticHover
│   ├── sections/                # Hero, About, CaseStudy*, Pipeline, Demos, Capabilities, BIP, FAQ, Contact
│   ├── seo/                     # StructuredData (JSON-LD)
│   └── ui/                      # Logo, Badge, Button, GlassCard, KpiCard, Eyebrow, GradientText
├── content/
│   ├── i18n/
│   │   ├── es.ts                # Todo el texto en español (default)
│   │   └── en.ts                # Mismo en inglés (debe espejar las keys)
│   ├── site.ts                  # Brand name, contact, URL
│   ├── caseStudy.sicop.ts       # Datos no-traducibles del SICOP (institutions)
│   ├── demos.ts                 # slug → preview mapping
│   └── capabilities.ts          # Iconos para Capabilities (orden importa)
├── lib/
│   ├── cn.ts                    # Helper className (clsx + tailwind-merge)
│   ├── i18n.tsx                 # LanguageProvider + useT() + useLanguage()
│   └── motion.ts                # Variants compartidas
├── styles/
│   └── tokens.css               # Variables CSS
public/
├── favicon.svg                  # N-mark del favicon
├── logo.png                     # Logo original (no se usa, sustituido por HTML/CSS)
├── Nancy.png                    # Foto de Nancy para About
└── llms.txt                     # Documento para crawlers de IA
tailwind.config.ts               # Tokens de diseño en Tailwind
next.config.mjs                  # Config Next.js
vercel.json                      # Headers de seguridad, redirects, cache
DEPLOYMENT.md                    # Guía deploy + dominio detallada
HANDOFF.md                       # Este documento
```

---

## ✏️ Operaciones comunes

### Cambiar texto del Hero / About / FAQ
1. Edita `src/content/i18n/es.ts` (y/o `en.ts` para inglés)
2. Busca la sección (ej. `hero:`, `about:`, `faq:`)
3. Cambia el string. Si modificas `es.ts`, **debes mantener la misma key en `en.ts`** (TS te avisa).
4. `git add . && git commit && git push`

### Añadir una pregunta al FAQ
1. En `src/content/i18n/es.ts`, busca `faq.items`
2. Agrega un objeto `{ q: "...", a: "..." }` al final del array
3. Repite el mismo agregado en `src/content/i18n/en.ts`
4. Push (también queda en el JSON-LD `FAQPage` automáticamente)

### Cambiar tu foto
1. Reemplaza `public/Nancy.png` con la nueva (mismo nombre exacto, case-sensitive)
2. `git add public/Nancy.png && git commit -m "update photo" && git push`

### Cambiar el logo
- Está en HTML/CSS: `src/components/ui/Logo.tsx`
- `LogoMark`: SVG escalable (usado en Nav, Footer, About corner)
- `LogoFull`: lockup completo (usado en Hero)
- `public/favicon.svg`: el favicon del browser

### Añadir/quitar una sección
- **Añadir**: crear `src/components/sections/MiSeccion.tsx`, agregar strings a i18n, importar y montar en `src/app/page.tsx`
- **Quitar**: comenta/borra el import en `page.tsx`

### Cambiar colores / espaciado
- `tailwind.config.ts` (colores, animaciones, breakpoints)
- `src/styles/tokens.css` (variables CSS espejadas)
- `src/app/globals.css` (utilidades custom como `.text-display-xl`)

---

## 🌐 DNS — Records en Porkbun

| Tipo | Host | Valor | Propósito |
| --- | --- | --- | --- |
| `A` | (vacío) | `216.198.79.1` | Apex → Vercel |
| `CNAME` | `www` | `cname.vercel-dns.com` | www → Vercel |
| `MX` | (vacío) | `fwd1.porkbun.com` (prio 10) | Email forwarding |
| `MX` | (vacío) | `fwd2.porkbun.com` (prio 20) | Email forwarding backup |
| `TXT` | (vacío) | `v=spf1 include:_spf.porkbun.com ~all` | SPF anti-spam |
| `TXT` | (vacío) | `google-site-verification=g79tIWxK...` | GSC verification |

**⚠️ Importante:** No actives Porkbun DNSSEC sin coordinar con Vercel (rompe la resolución).

---

## 📧 Email

- **Tu email:** `nancyrodriguez@n-ai.dev`
- **Reenvía a:** Gmail (configurado en Porkbun → Email Forwarding)
- **Para migrar a mailbox real:** Google Workspace, Fastmail, Proton, Zoho — reemplazas los MX y TXT por los del nuevo proveedor.

---

## 🌍 Variables de entorno

### Vercel (Production / Preview / Development)

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://n-ai.dev` |

Para editar: Vercel → Project → Settings → Environment Variables.

### Local (opcional)

Si quieres testear con env vars distintas, crea `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🔄 Recuperar si se rompe algo

### Rollback rápido vía Vercel (sin git)

1. Vercel Dashboard → Deployments
2. Encuentra un deploy verde anterior
3. Click el menú `⋮` → **"Promote to Production"**

### Rollback con git

```bash
# Ver últimos commits
git log --oneline -10

# Revert (más seguro — crea un commit nuevo que deshace)
git revert <commit-hash>
git push

# Reset hard (peligroso — borra el commit del historial)
git reset --hard <commit-hash>
git push --force-with-lease
```

---

## 🔍 SEO / GEO — Lo que está optimizado

### Para Google
- ✅ Title + meta description optimizados con keywords comerciales
- ✅ Sitemap.xml submitted en GSC
- ✅ robots.txt
- ✅ JSON-LD: Organization (ProfessionalService) + Person + WebSite + 8 Services + FAQPage
- ✅ Canonical URL
- ✅ OpenGraph + Twitter Card
- ✅ HSTS preload + security headers

### Para AI (ChatGPT, Perplexity, Copilot, Gemini, Claude)
- ✅ `llms.txt` con citation capsules, FAQ comerciales, 8 servicios
- ✅ FAQPage schema con preguntas que los LLMs reciben literalmente
- ✅ Citation capsule visible en About
- ✅ `sameAs` en JSON-LD apunta a LinkedIn, Scholar y GitHub
- ✅ Bing indexado (cubre ChatGPT browse + Copilot + Perplexity)

### Keywords objetivo
1. Consultoría IA / consultoría inteligencia artificial Costa Rica
2. Inteligencia de datos LATAM / consultoría BI Latinoamérica
3. SICOP analytics / inteligencia de compras públicas
4. Segmentación RFM / consultoría CRM / inteligencia consumidor

---

## 📊 Cómo monitorear performance

| Servicio | Qué ver | Frecuencia recomendada |
| --- | --- | --- |
| **GSC** | Impressions, clicks, queries que te traen tráfico | Semanal |
| **Bing Webmaster** | Mismo pero para Bing/ChatGPT/Copilot | Semanal |
| **Vercel Analytics** | Visitas reales por país/dispositivo | Mensual |
| **ChatGPT / Perplexity / Gemini** | Pregúntales "¿conoces N-AI / Nancy Rodríguez?" | Cada 2 semanas |

---

## ✅ Estado actual del proyecto

### Funcionando
- Sitio completo en español (default) + inglés (toggle)
- Logo HTML/CSS (sin typos posibles)
- Foto Nancy + iconos sociales (LinkedIn, WhatsApp, GitHub, Scholar, Email)
- 9 secciones: Hero · About · Case Study · Deep Dive · Pipeline · Demos · Capabilities · Building in Public · FAQ · Contact
- Caso SICOP atribuido a Contraloría General de la República
- Citation capsule con dual meaning N-AI (Nancy / Neural)
- SEO completo: GSC, sitemap, 14 schemas JSON-LD, llms.txt
- Bing indexado vía import GSC

### Pendiente
- **Reemplazar 2 demos placeholder** con casos reales:
  - **RFM** — agencias de marketing (necesito: contexto, qué hiciste, impacto, tamaño de datos)
  - **Customer Profiles** — consumo masivo (mismas 4 preguntas)
  - Actualmente "HeatSight AI" e "Consumer Intelligence" están como "In Build"
- **Lista de publicaciones de Google Scholar** para añadir al About
- **Optimizar LinkedIn profile** (headline + about con N-AI / Nancy AI)
- **Crear entrada en Wikidata** para "Nancy Rodríguez" y "N-AI"
- **Submit a directorios**: Crunchbase, AIBase, There's An AI For That, Future Tools
- **Blog técnico** (`/blog`) — cuando quieras publicar content

---

## 🆘 Troubleshooting

| Síntoma | Causa probable | Fix |
| --- | --- | --- |
| `git push` falla HTTP 400 | Archivo grande en el commit | `git config http.postBuffer 524288000` |
| Vercel deploy falla | Algo no compila | Revisa Vercel → Deployments → Logs |
| Cambio no aparece en `n-ai.dev` | Cache del browser | `Cmd+Shift+R` o ventana incógnita |
| Foto/logo no carga | Archivo no está en `public/` o nombre con typo | Recuerda: Linux es case-sensitive (`Nancy.png` ≠ `nancy.png`) |
| SSL error | DNS roto o cert re-emitiéndose | Espera 5 min o revisa Vercel → Domains |
| Email no llega a Gmail | SPF / MX rotos en Porkbun | Verifica los 3 records: 2 MX + 1 TXT SPF |
| TS error sobre `Strings` (i18n) | Falta una key en `en.ts` que sí está en `es.ts` | Agregar la key faltante con la traducción |

---

## 📝 Commits importantes (timeline)

```
HEAD  SEO commercial intent + dual N-AI meaning (último)
     GEO Capa 1 — llms.txt, FAQ, citation capsule, social row, schemas
     Fix typo INGIGHTS → INSIGHTS; logo lockup como HTML/CSS
     SEO — JSON-LD structured data + keywords expandidos
     Logo PNG actualizado + LinkedIn fix + Nancy.png
     Integrar logo + favicon + Hero lockup
     i18n ES default + EN toggle + About rewrite
     Pass 2 — 8 secciones + charts
     Domain plumbing para n-ai.dev
     Pass 1 — Foundation + Hero
```

Ver historia completa: `git log --oneline` en la carpeta del proyecto.

---

## 💡 Para retomar el proyecto con Claude Code

```bash
cd ~/Documents/n-ai-site
claude              # arranca Claude Code con todo el contexto del repo
```

Y pídele "lee HANDOFF.md y dime el estado del proyecto" — tiene toda la info para continuar.

---

*Última actualización: 2026-05-10. Este documento debe actualizarse cuando cambien URLs, DNS, env vars o se complete una tarea pendiente.*
