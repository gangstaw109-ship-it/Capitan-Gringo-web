export type Faq = {
  id?: string;
  question: string;
  answer: string;
  sortOrder?: number;
};

export type HomepageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButton: string;
    whatsappButton: string;
    proof: Array<{ title: string; text: string }>;
  };
  quickBooking: {
    steps: Array<{ number: string; title: string; text: string }>;
    button: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    allToursPrefix: string;
    allToursSuffix: string;
  };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    button: string;
  };
  destinations: {
    eyebrow: string;
    title: string;
    button: string;
  };
  trust: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{ title: string; text: string }>;
  };
  gallery: {
    eyebrow: string;
    title: string;
    button: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: "Excursiones desde Bayahibe y Punta Cana",
    title: "El Caribe que viniste a vivir.",
    description:
      "Descubre Isla Saona y la República Dominicana con un equipo local, grupos reducidos y una forma más cercana de viajar.",
    primaryButton: "Ver excursiones",
    whatsappButton: "Escribir por WhatsApp",
    proof: [
      { title: "Grupos reducidos", text: "Una experiencia más personal" },
      { title: "Equipo local", text: "Especialistas de Bayahibe" },
    ],
  },
  quickBooking: {
    steps: [
      { number: "01", title: "Elige", text: "tu excursión" },
      { number: "02", title: "Envíanos", text: "tus fechas" },
      { number: "03", title: "Confirma", text: "por WhatsApp" },
    ],
    button: "Comenzar reserva →",
  },
  featured: {
    eyebrow: "Empieza por aquí",
    title: "Tres formas de sentir el Caribe.",
    description:
      "Naturaleza, privacidad o mundo submarino. Las experiencias destacadas reúnen los paisajes que definen a Capitán Gringo.",
    allToursPrefix: "Explorar las",
    allToursSuffix: "excursiones",
  },
  story: {
    eyebrow: "Una historia local",
    title: "Capitán de nuestro primer bote. Nombre de toda una experiencia.",
    description:
      "Capitán Gringo nació del apodo de su fundador, nativo de Bayahibe y capitán del primer bote de la compañía. Hoy, el equipo de Coligrin Tours sigue compartiendo el parque nacional con atención cercana, embarcaciones seguras y recorridos que llegan más lejos.",
    points: [
      "Especialistas en Isla Saona y su entorno",
      "Embarcaciones nuevas, seguras y aseguradas",
      "Trato personalizado: clientes que se sienten como familia",
    ],
    button: "Conoce nuestra historia",
  },
  destinations: {
    eyebrow: "Destinos",
    title: "Un país. Muchos mundos.",
    button: "Ver todos los destinos",
  },
  trust: {
    eyebrow: "Viaja con confianza",
    title: "Pequeños grupos. Grandes recuerdos.",
    description:
      "La diferencia está en conocer el mar, cuidar cada recorrido y estar disponible cuando necesitas ayuda.",
    cards: [
      { title: "Atención directa", text: "Reserva con el equipo de Capitán Gringo por teléfono, correo o WhatsApp." },
      { title: "Traslado incluido", text: "La compañía informa traslados de ida y vuelta desde el hotel en sus excursiones." },
      { title: "Seguros vigentes", text: "Pólizas de responsabilidad civil y de embarcaciones contratadas con SURA." },
    ],
  },
  gallery: {
    eyebrow: "Momentos reales",
    title: "Así se ve un día con nosotros.",
    button: "Abrir galería",
  },
  reviews: {
    eyebrow: "Opiniones verificables",
    title: "Lee lo que otros viajeros cuentan fuera de esta web.",
    description:
      "No reproducimos testimonios sin su fuente. Consulta directamente el perfil de Capitán Gringo en Tripadvisor.",
    button: "Ver opiniones externas",
  },
  faq: {
    eyebrow: "Antes de reservar",
    title: "Respuestas claras para viajar tranquilo.",
    description: "¿Te queda alguna duda? Escríbenos directamente y te ayudamos a elegir.",
  },
};

export const faqs: Faq[] = [
  {
    question: "¿Cómo se hace una reserva?",
    answer:
      "Envía el nombre de la reserva, teléfono disponible, hotel, número de adultos y niños, fechas de llegada y salida, y la excursión elegida. Puedes hacerlo desde nuestro formulario, que prepara el mensaje para WhatsApp.",
  },
  {
    question: "¿Las excursiones incluyen traslado?",
    answer:
      "Las excursiones incluyen traslado de ida y vuelta desde el hotel. Cada ficha detalla los puntos o zonas disponibles para ese recorrido.",
  },
  {
    question: "¿Cómo se pagan las excursiones?",
    answer:
      "Los precios publicados corresponden a pago en efectivo. Los pagos con tarjeta tienen un cargo del 10% y los pagos por PayPal, un 6%.",
  },
  {
    question: "¿Hay precios para niños?",
    answer:
      "Depende de la excursión. Saona Completa e Isla Catalina publican entrada gratuita hasta 2 años y mitad de precio de 3 a 11 años. Otras experiencias muestran sus edades y tarifas en la ficha correspondiente.",
  },
];

