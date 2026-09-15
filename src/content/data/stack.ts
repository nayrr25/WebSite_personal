/**
 * Herramientas que se muestran en la pared de bloques de la sección Método,
 * una capa por fase (Diagnóstico, Diseño, Construcción, Operación).
 * Las capas alternan 4 y 3 piezas para que queden intercaladas como ladrillos.
 */
export const STACK_LAYERS = [
  ["SQL", "BigQuery", "Salesforce", "R"],
  ["GCP", "Azure", "AWS"],
  ["Python", "Cloud Run", "Pipelines", "GitHub"],
  ["Power BI", "Looker", "Tableau"],
] as const;
