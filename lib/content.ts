// Contenido público de Azure Bootcamp by LEAD UTP.
// Fuente: Plan Operativo del Bootcamp (uso interno) — aquí solo se exponen
// los datos aprobados para comunicación externa. Edita este archivo para
// actualizar fechas, malla o copy: es la única fuente de verdad de la landing.

export const FORM_URL = "https://forms.cloud.microsoft/r/XHCTNPjmFj";

export const SITE = {
  name: "Azure Bootcamp",
  tagline: "De principiante a experto",
  organizer: "LEAD UTP",
  pillar: "Pilar de Excelencia Académica",
  // Dominio real de despliegue (Vercel). Todas las URLs absolutas (OG,
  // canonical, sitemap, JSON-LD) se derivan de este valor: si el proyecto
  // se muda a un dominio propio, este es el único lugar que hay que tocar.
  url: "https://azure-bootcamp.vercel.app",
  description:
    "Aprende Microsoft Azure gratis y en seis semanas: 100% virtual, un proyecto propio desplegado en la nube y una clausura presencial ante la industria.",
};

// Imagen compartida para WhatsApp, LinkedIn, Threads y X (Open Graph +
// Twitter Card leen el mismo archivo). El archivo real vive en
// app/opengraph-image.jpg y app/twitter-image.jpg (convención de Next.js,
// se aplica automáticamente a /aplicar y sus rutas hijas); esta constante
// solo se usa donde el código necesita la URL a mano, como el JSON-LD.
export const OG_IMAGE = {
  path: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Azure Bootcamp by LEAD UTP: de principiante a experto, gratuito y 100% virtual.",
};

export const DATES = {
  applyOpen: "20 de agosto",
  applyClose: "29 de agosto",
  classesStart: "1 de septiembre",
  classesEnd: "8 de octubre",
  closingDate: "10 de octubre",
  schedule: "Martes y jueves, 7:00 p. m. – 9:00 p. m.",
  // Mismas fechas en ISO, solo para datos estructurados (JSON-LD), que
  // necesitan un formato de fecha exacto en vez del texto en español.
  classesStartISO: "2026-09-01",
  classesEndISO: "2026-10-08",
  closingDateISO: "2026-10-10",
};

// Rutas absolutas con hash: estos links viven en el Navbar/Footer, que se
// renderizan en TODAS las rutas (incluida /aplicar). Un hash relativo como
// "#faq" se resolvería contra la URL actual (p. ej. /aplicar#faq, que no
// existe); con "/#faq" siempre apunta a la sección de la home sin importar
// desde qué página se haga clic.
export const NAV_LINKS = [
  { href: "/#programa", label: "Programa" },
  { href: "/#malla", label: "Malla" },
  { href: "/#clausura", label: "Clausura" },
  { href: "/#faq", label: "FAQ" },
  { href: "/badge", label: "Badge" },
];

export const CALL_FOR_SPEAKERS_URL = "/aplicar";

// Borrador del post de LinkedIn que abre el botón "Compartir" en /badge.
// La foto no viaja por la URL: LinkedIn no admite adjuntar imagen por query
// string, así que el generador descarga el PNG para que el usuario lo suba.
export const BADGE_LINKEDIN_TEXT = `¡Soy parte del Azure Bootcamp 2026 de LEAD UTP!

Postulé, y hoy recibí la confirmación: fui seleccionado/a para ser parte de esta experiencia intensiva donde vamos a construir, romper y volver a levantar cosas sobre Microsoft Azure ☁️

Lo que más me emociona no es solo aprender los servicios, sino hacerlo junto a una comunidad que se toma en serio el aprender haciendo: mentores, proyectos reales y gente con muchas ganas de crecer en cloud.

Nos vemos en el bootcamp. Vamos con todo 💪

Gracias a LEAD UTP por abrir estos espacios para los que queremos dar el siguiente paso en tecnología.

#AzureBootcamp #LEADUTP #Azure #Cloud #MicrosoftAzure #ComunidadTech #UTP

${SITE.url}`;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: CALL_FOR_SPEAKERS_URL, label: "Call for speakers" },
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/lead_utp",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://www.linkedin.com/company/lead-utp",
    label: "LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://linktr.ee/leadutp",
    label: "Linktree",
    icon: "linktree",
  },
] as const;

export const HIGHLIGHTS = [
  {
    icon: "CalendarRange",
    title: "6 semanas, 12 sesiones",
    description: "Martes y jueves en vivo, más la clausura presencial.",
  },
  {
    icon: "Laptop2",
    title: "100% virtual",
    description: "Clases por Microsoft Teams, con grabaciones disponibles.",
  },
  {
    icon: "Sparkles",
    title: "Totalmente gratuito",
    description: "Iniciativa estudiantil sin fines de lucro de LEAD UTP.",
  },
  {
    icon: "Rocket",
    title: "Proyecto real en la nube",
    description: "Despliegas y operas recursos en tu propia suscripción de Azure.",
  },
];

export const AUDIENCE = {
  intro:
    "Pensado para quienes quieren pasar de la teoría a operar Azure de verdad, sin importar en qué universidad estudian.",
  fits: [
    "Estudiantes de 8vo ciclo en adelante de carreras de tecnología, de cualquier universidad o instituto del Perú.",
    "Egresados con menos de un año desde su egreso.",
    "Equipo con conexión estable a internet y correo para activar Azure for Students.",
    "Compromiso de asistencia a las sesiones en vivo y entrega de los retos semanales.",
  ],
  nice_to_have: [
    "Fundamentos de redes",
    "Línea de comandos",
    "Control de versiones con Git",
    "Nociones de bases de datos",
  ],
};

export type CurriculumSession = {
  session: number;
  title: string;
  lab: string;
};

export type CurriculumWeek = {
  week: number;
  label: string;
  sessions: CurriculumSession[];
};

export const CURRICULUM: CurriculumWeek[] = [
  {
    week: 1,
    label: "Fundamentos y línea de comandos",
    sessions: [
      {
        session: 1,
        title: "Fundamentos de la nube y del ecosistema Azure",
        lab: "Suscripciones, grupos de recursos y primer despliegue desde el portal.",
      },
      {
        session: 2,
        title: "Azure CLI, Cloud Shell y modelo de costos",
        lab: "Despliegue del mismo recurso por línea de comandos y lectura de facturación.",
      },
    ],
  },
  {
    week: 2,
    label: "Cómputo y contenedores",
    sessions: [
      {
        session: 3,
        title: "Cómputo: máquinas virtuales y App Service",
        lab: "Publicación de una aplicación web en App Service.",
      },
      {
        session: 4,
        title: "Contenedores y Azure Container Apps",
        lab: "Construcción de imagen y despliegue de un contenedor.",
      },
    ],
  },
  {
    week: 3,
    label: "Redes y datos",
    sessions: [
      {
        session: 5,
        title: "Redes virtuales, subredes y seguridad de red",
        lab: "Aislamiento de la aplicación dentro de una red virtual.",
      },
      {
        session: 6,
        title: "Datos: Azure Storage y Azure SQL Database",
        lab: "Conexión de la aplicación a una base de datos administrada.",
      },
    ],
  },
  {
    week: 4,
    label: "Data Factory e identidad",
    sessions: [
      {
        session: 7,
        title: "Azure Data Factory: ingesta y orquestación",
        lab: "Pipeline de copia y transformación de datos hacia el almacenamiento del proyecto.",
      },
      {
        session: 8,
        title: "Identidad con Microsoft Entra ID y RBAC",
        lab: "Asignación de roles y acceso por identidad administrada.",
      },
    ],
  },
  {
    week: 5,
    label: "Seguridad e infraestructura como código",
    sessions: [
      {
        session: 9,
        title: "Secretos, cifrado y monitoreo",
        lab: "Key Vault y tableros de Azure Monitor sobre el proyecto.",
      },
      {
        session: 10,
        title: "Infraestructura como código con Bicep",
        lab: "Despliegue completo del entorno desde una plantilla versionada.",
      },
    ],
  },
  {
    week: 6,
    label: "DevOps e inteligencia artificial",
    sessions: [
      {
        session: 11,
        title: "Azure DevOps: repos, boards y pipelines",
        lab: "Pipeline de integración y despliegue continuo hacia Azure.",
      },
      {
        session: 12,
        title: "Azure AI Foundry: modelos y agentes",
        lab: "Integración de un servicio de inteligencia artificial al proyecto final.",
      },
    ],
  },
];

export const FORMAT_STEPS = [
  {
    icon: "ClipboardCheck",
    title: "Postula",
    description: `Completa el formulario oficial antes del ${DATES.applyClose}.`,
  },
  {
    icon: "Radio",
    title: "Sesiones en vivo",
    description: "Martes y jueves: una hora de concepto y una de laboratorio guiado.",
  },
  {
    icon: "Swords",
    title: "Reto semanal",
    description: "Practicas de forma asíncrona sobre tu propia suscripción de Azure.",
  },
  {
    icon: "Users",
    title: "Proyecto en equipo",
    description: "En equipos de 3 o 4, se construye semana a semana sobre lo ya desplegado.",
  },
  {
    icon: "Trophy",
    title: "Clausura",
    description: "Presentas el proyecto final ante profesionales de la industria.",
  },
];

export const CLOSING = {
  intro:
    "La clausura es la única actividad presencial del bootcamp. El aforo es limitado, así que el acceso se decide por participación real, no por orden de inscripción ni sorteo.",
  seatsNote:
    "Cupo limitado. La sede se confirmará y comunicará a los seleccionados más adelante.",
  board: [
    { criterion: "Asistencia en vivo a cada sesión", points: "10 pts / sesión" },
    { criterion: "Entrega del reto semanal", points: "15 pts / reto" },
    { criterion: "Participación en el canal de la comunidad", points: "Hasta 30 pts" },
    { criterion: "Apoyo a otros participantes", points: "Hasta 20 pts" },
    { criterion: "Proyecto final entregado a tiempo", points: "40 pts" },
  ],
  streamNote:
    "Quienes no ingresen al aforo presencial podrán seguir la clausura por transmisión en vivo.",
};

export const REQUIREMENTS = [
  "Laptop o PC con conexión estable a internet.",
  "Correo institucional o personal para activar Azure for Students.",
  "Compromiso de asistencia a las sesiones en vivo y entrega de los retos semanales.",
  "Deseable: fundamentos de redes, línea de comandos, Git y bases de datos (no excluyente).",
];

export type FaqItem = {
  question: string;
  answer: string;
  cta?: { label: string; href: string };
};

export const FAQ: FaqItem[] = [
  {
    question: "¿Cuánto cuesta el bootcamp?",
    answer:
      "Es completamente gratuito. Es una iniciativa estudiantil sin fines de lucro del Pilar de Excelencia Académica de LEAD UTP.",
  },
  {
    question: "¿Hay límite de cupos?",
    answer:
      "En la etapa virtual no hay límite: toda persona que cumpla el perfil de ingreso queda admitida. El único filtro real es la constancia durante las seis semanas.",
  },
  {
    question: "¿Qué pasa si no puedo ver una sesión en vivo?",
    answer:
      "Las clases se dictan por Microsoft Teams y quedan grabadas, así que puedes recuperarlas. Aun así, la asistencia en vivo suma puntos para la clausura.",
  },
  {
    question: "¿Necesito experiencia previa en la nube?",
    answer:
      "No. El programa empieza desde los fundamentos de Azure. Ayuda tener bases de redes, línea de comandos o Git, pero no son un requisito excluyente.",
  },
  {
    question: "¿Cómo se elige quién va a la clausura presencial?",
    answer:
      "Por un tablero de puntos público y actualizado cada semana, según asistencia, retos entregados, participación en la comunidad y el proyecto final. No es por orden de inscripción.",
  },
  {
    question: "¿Recibo alguna certificación?",
    answer:
      "Sí, una constancia digital de LEAD UTP por asistencia y proyecto entregado. Además, el contenido te deja encaminado hacia la certificación oficial AZ-900 de Microsoft.",
  },
  {
    question: "¿Es un programa oficial de Microsoft?",
    answer:
      "No. Es organizado por LEAD UTP, una comunidad estudiantil, usando recursos de Azure for Students y Microsoft Learn. La clausura se realiza con apoyo de Microsoft Perú.",
  },
  {
    question: "¿Puedo postular como speaker?",
    answer:
      "Sí. Buscamos un ponente distinto para cada una de las 12 sesiones del bootcamp. La postulación es gratuita y toma menos de dos minutos.",
    cta: { label: "Ver convocatoria de speakers", href: CALL_FOR_SPEAKERS_URL },
  },
];
