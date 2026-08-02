import Script from "next/script";

/**
 * Google Tag Manager.
 *
 * El ID NO va hardcodeado: se lee de `NEXT_PUBLIC_GTM_ID`. Ventajas:
 *  - el mismo repo sirve para producción y para los previews de Vercel sin
 *    mezclar datos (basta con no definir la variable en preview);
 *  - si algún día cambia el contenedor, no hay que tocar código;
 *  - en local, sin la variable, no se carga nada y no ensuciás las métricas
 *    con tu propio tráfico de desarrollo.
 *
 * Si la variable no está definida, ambos componentes devuelven `null` y el
 * sitio funciona exactamente igual.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Snippet 1 — el que GTM pide "lo más arriba posible en <head>".
 *
 * Usamos `next/script` con `afterInteractive` en lugar de una etiqueta
 * <script> cruda: Next lo inyecta correctamente en el documento y evita que
 * bloquee el primer render. GTM funciona igual y el sitio carga más rápido.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null;

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
  if (!GTM_ID) return null;

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
