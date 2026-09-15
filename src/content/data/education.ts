/**
 * Formación de la fundadora, tomada de su perfil de LinkedIn y confirmada por ella.
 * `credential` indica un título o certificado obtenido: la Maestría en Estadística
 * de la UCR está cursada sin tesis, así que se muestra como egresada y no se
 * declara como credencial en el schema.
 */
export type Education = {
  school: string;
  partner?: string;
  title: { es: string; en: string };
  years?: string;
  /** Estado cuando no es un título obtenido (por ejemplo, egresada sin tesis). */
  status?: { es: string; en: string };
  /** Institución que reconoce el título en Costa Rica (títulos del extranjero). */
  recognizedBy?: string;
  credential: "degree" | "certificate" | null;
};

export const EDUCATION: readonly Education[] = [
  {
    school: "UNIR · Universidad Internacional de La Rioja",
    title: { es: "Máster en Inteligencia Artificial", en: "Master's in Artificial Intelligence" },
    years: "2021–2022",
    recognizedBy: "Universidad de Costa Rica",
    credential: "degree",
  },
  {
    school: "Universidad Nacional de Costa Rica",
    title: { es: "Licenciatura en Economía", en: "Licentiate degree in Economics" },
    years: "2008–2013",
    credential: "degree",
  },
  {
    school: "Universidad de Costa Rica",
    title: { es: "Maestría Académica en Estadística", en: "Academic Master's in Statistics" },
    status: { es: "egresada", en: "coursework completed" },
    credential: null,
  },
  {
    school: "Universidad Tecnológica Nacional (Argentina)",
    partner: "Intel",
    title: { es: "Especialización en Inteligencia Artificial", en: "Specialization in Artificial Intelligence" },
    years: "2024",
    credential: "certificate",
  },
  {
    school: "LEAD University",
    title: { es: "Associate's degree en Transformación Digital", en: "Associate's degree in Digital Transformation" },
    years: "2025",
    credential: "degree",
  },
  {
    school: "Universidad Nacional de Costa Rica",
    title: { es: "Bachillerato en Filosofía", en: "Bachelor's degree in Philosophy" },
    credential: "degree",
  },
];
