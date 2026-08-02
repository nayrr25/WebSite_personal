import Script from "next/script";

/**
 * Google Analytics 4 — carga directa con gtag.js.
 *
 * Por qué directo y no a través de GTM:
 * GTM es un CONTENEDOR — carga etiquetas, pero no mide nada por sí mismo.
 * Para que GA4 reciba datos vía GTM hay que crear la etiqueta de configuración
 * dentro de GTM y publicar el contenedor; si cualquiera de esos dos pasos
 * falta, Analytics queda en "No data received" sin ningún error visible.
 * Cargando gtag.js directo, GA4 mide desde el primer despliegue y no depende
 * de que nadie recuerde publicar nada.
 *
 * GTM sigue instalado y es útil para lo que sí hace bien: agregar píxeles de
 * LinkedIn, Meta, mapas de calor, etc. sin tocar código. Los dos conviven sin
 * problema — comparten el mismo `dataLayer`, que es como Google lo diseñó.
 *
 * Igual que GTM, solo se activa en producción (`NEXT_PUBLIC_VERCEL_ENV`), de
 * modo que ni `pnpm dev` ni los previews de Vercel ensucian las métricas.
 */

const DEFAULT_GA_ID = "G-JY9LF05GHJ";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;

const ENABLED =
  Boolean(GA_ID) &&
  (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
    process.env.NEXT_PUBLIC_GA_FORCE === "1");

export default function GoogleAnalytics() {
  if (!ENABLED) return null;

  return (
    <>
      {/* La librería de GA4. `afterInteractive` la baja sin bloquear el render. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* Inicialización + primer page_view. */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
