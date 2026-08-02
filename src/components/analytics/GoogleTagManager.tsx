import Script from "next/script";

/**
 * Google Tag Manager.
 *
 * Cero configuración manual: no hay que declarar nada en el panel de Vercel.
 *
 * `NEXT_PUBLIC_VERCEL_ENV` la inyecta Vercel sola en cada build y vale
 * "production", "preview" o "development". La usamos para cargar GTM
 * ÚNICAMENTE en producción, de modo que:
 *  - los previews de cada Pull Request no cuentan como visitas;
 *  - `pnpm dev` en tu máquina tampoco;
 *  - las métricas de n-ai.dev quedan limpias de tráfico propio desde el día uno.
 *
 * El ID del contenedor puede ir en el código sin problema: es un
 * identificador público que viaja al navegador en cada visita, no un secreto.
 * Aun así, `NEXT_PUBLIC_GTM_ID` lo sobreescribe si algún día hay que apuntar
 * a otro contenedor sin tocar código.
 *
 * Para probar GTM en un preview o en local, basta con definir
 * NEXT_PUBLIC_GTM_FORCE=1 en ese entorno.
 */

const DEFAULT_GTM_ID = "GTM-P84F759S";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? DEFAULT_GTM_ID;

/**
 * Cuándo se activa — misma lógica que GoogleAnalytics.tsx.
 *
 * `NEXT_PUBLIC_VERCEL_ENV` solo existe si el proyecto tiene activada la opción
 * "Automatically expose System Environment Variables" en Vercel. Cuando está
 * apagada, la variable es `undefined` y el script jamás se renderiza, sin
 * error visible. Por eso la base ahora es `NODE_ENV`, que Next define siempre.
 */
const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
const FORCED = process.env.NEXT_PUBLIC_GTM_FORCE === "1";

const ENABLED =
  Boolean(GTM_ID) &&
  (FORCED || (process.env.NODE_ENV === "production" && !IS_PREVIEW));

/**
 * Snippet 1 — el que GTM pide "lo más arriba posible en <head>".
 *
 * Usamos `next/script` con `afterInteractive` en lugar de una etiqueta
 * <script> cruda: Next lo inyecta correctamente en el documento y evita que
 * bloquee el primer render. GTM funciona igual y el sitio carga más rápido.
 */
export function GoogleTagManager() {
  if (!ENABLED) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * Snippet 2 — el <noscript> que va "justo después de la etiqueta <body>".
 *
 * Solo actúa para visitantes con JavaScript desactivado. Es una fracción
 * mínima del tráfico, pero GTM lo pide y no cuesta nada.
 */
export function GoogleTagManagerNoScript() {
  if (!ENABLED) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
