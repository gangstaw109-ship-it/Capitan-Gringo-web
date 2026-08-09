export const site = {
  name: "Capitán Gringo",
  legalName: "Coligrin Tours",
  phoneDisplay: "+1 809-753-9469",
  phoneHref: "+18097539469",
  whatsapp: "18097539469",
  email: "capitangringo@hotmail.com",
  address: "Playa de los Embarcadero de Bayahibe, La Altagracia, República Dominicana",
  officeHours: "10:00 a. m. – 6:00 p. m., hora del Caribe",
  facebook: "https://www.facebook.com/CapitanGringo",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g147292-d1963454-Reviews-Capitan_Gringo_Saona_Tours-La_Romana_La_Romana_Province_Dominican_Republic.html#REVIEWS",
};

export type Price = {
  label: string;
  value: string;
};

export type ItineraryStop = {
  title: string;
  description: string;
};

export type Tour = {
  slug: string;
  name: string;
  eyebrow: string;
  destination: string;
  shortDescription: string;
  intro: string;
  heroImage: string;
  cardImage: string;
  imageAlt: string;
  duration: string;
  schedule: string;
  pickup?: string;
  returnTime?: string;
  priceFrom: string;
  priceNote: string;
  featured?: boolean;
  tags: string[];
  itinerary: ItineraryStop[];
  includes: string[];
  recommendations: string[];
  restrictions?: string[];
  prices: Price[];
  bookingNote?: string;
  gallery: { src: string; alt: string }[];
};

export const paymentNotes = [
  "Los precios publicados corresponden a pago en efectivo.",
  "Los pagos con tarjeta de crédito tienen un cargo del 10%.",
  "Los pagos por PayPal tienen un cargo del 6% y se realizan a capitangringo@hotmail.com.",
];

export const tours: Tour[] = [
  {
    slug: "saona-completa-4-playas",
    name: "Saona Completa 4 Playas",
    eyebrow: "La experiencia insignia",
    destination: "Isla Saona",
    shortDescription:
      "Un día de exploración en lancha, con grupos reducidos, playas vírgenes, Mano Juan, manglares y piscina natural.",
    intro:
      "La excursión más completa de Isla Saona está pensada para quienes quieren vivir el parque nacional con espíritu explorador. El recorrido se realiza en lancha de ida y vuelta y prioriza los lugares más especiales de la isla.",
    heroImage: "/images/saona/canto-de-la-playa.webp",
    cardImage: "/images/saona/mano-juan.webp",
    imageAlt: "Cocoteros y arena blanca en Canto de la Playa, Isla Saona",
    duration: "Día completo",
    schedule: "Martes y viernes",
    pickup: "Punta Cana: entre 6:00 y 7:00 a. m.",
    returnTime: "Fin aproximado 5:00 p. m.; llegada a Punta Cana cerca de 7:30 p. m.",
    priceFrom: "US$60",
    priceNote: "desde Bayahibe",
    featured: true,
    tags: ["Grupos reducidos", "Lancha ida y vuelta", "Ideal para niños y adultos"],
    itinerary: [
      {
        title: "Traslado a Bayahibe",
        description:
          "Recogida en los hoteles de Punta Cana y traslado en autobuses modernos y cómodos hasta el punto de embarque.",
      },
      {
        title: "Canto de la Playa",
        description:
          "Llegada temprana a una de las playas más bonitas de Saona para disfrutar del Caribe con mayor tranquilidad.",
      },
      {
        title: "Snorkel y refrigerio",
        description:
          "Parada para hacer snorkel en una barrera de coral y tomar un refrigerio en la playa.",
      },
      {
        title: "Mano Juan",
        description:
          "Recorrido por el poblado de la isla para conocer cómo viven sus habitantes, sus costumbres y tradiciones.",
      },
      {
        title: "Almuerzo frente al Caribe",
        description:
          "Almuerzo en una zona reservada para los clientes, con parrillada, arroz, pasta fría, papas, ensalada y pan.",
      },
      {
        title: "Playa Toro y manglares",
        description:
          "Visita a Playa Toro y paso por la zona ecológica de manglares, hábitat de aves y vida marina.",
      },
      {
        title: "Piscina Natural",
        description:
          "Baño familiar al atardecer y observación de estrellas de mar, siempre sin sacarlas del agua.",
      },
    ],
    includes: [
      "Traslado de ida y vuelta desde el hotel",
      "Recorrido completo en lancha con grupos reducidos",
      "Refrigerio en la playa",
      "Almuerzo: pollo, chuletas de cerdo, arroz, pasta fría, papas, ensalada y pan",
      "Ron Brugal, Coca-Cola, Sprite y agua embotellada",
      "Parada de snorkel y visita a la piscina natural",
    ],
    recommendations: [
      "Protector solar",
      "Repelente de insectos",
      "Set personal de snorkel si eres aficionado",
      "Cámara acuática",
      "Ropa de playa y toalla",
    ],
    prices: [
      { label: "Desde Punta Cana", value: "US$70" },
      { label: "Desde Bayahibe", value: "US$60" },
      { label: "Desde Uvero Alto", value: "US$85" },
      { label: "Bahía Príncipe La Romana", value: "US$90" },
      { label: "Niños hasta 2 años", value: "Gratis" },
      { label: "Niños de 3 a 11 años", value: "50%" },
      { label: "Langosta entera (1 lb)", value: "+ US$20" },
    ],
    gallery: [
      { src: "/images/saona/mano-juan.webp", alt: "Pueblo de Mano Juan en Isla Saona" },
      { src: "/images/saona/piscina-natural.webp", alt: "Familia en la piscina natural de Isla Saona" },
      { src: "/images/saona/manglares.webp", alt: "Manglares del Parque Nacional del Este" },
    ],
  },
  {
    slug: "isla-saona-privado",
    name: "Isla Saona Privado",
    eyebrow: "Tu recorrido, tu ritmo",
    destination: "Isla Saona",
    shortDescription:
      "Una embarcación para tu grupo y la posibilidad de adaptar paradas, recorrido y horario.",
    intro:
      "Esta opción es para quienes prefieren hacer la excursión solos o modificarla a su gusto. Hay distintas lanchas según el tamaño del grupo y el presupuesto se prepara de acuerdo con el recorrido y el número de personas.",
    heroImage: "/images/boats/lancha.webp",
    cardImage: "/images/boats/catamaran-capitan-gringo.webp",
    imageAlt: "Lancha de Capitán Gringo navegando en el Caribe",
    duration: "Horario adaptable",
    schedule: "Según disponibilidad",
    priceFrom: "Consultar",
    priceNote: "según recorrido y grupo",
    featured: true,
    tags: ["Solo para tu grupo", "Paradas adaptables", "Varias lanchas"],
    itinerary: [
      {
        title: "Elige el recorrido",
        description:
          "Puedes solicitar el recorrido de Saona VIP, Saona Explorer o proponer una experiencia diferente.",
      },
      {
        title: "Seleccionamos la lancha",
        description:
          "La embarcación se elige en función del número de personas de tu grupo.",
      },
      {
        title: "Personaliza las paradas",
        description:
          "El principal beneficio es poder modificar las paradas y disfrutar el recorrido en tu propio horario.",
      },
    ],
    includes: [
      "Embarcación privada para el grupo",
      "Recorrido elegido con el equipo de Capitán Gringo",
      "Posibilidad de adaptar paradas y horario",
    ],
    recommendations: ["Indicar el número de personas", "Explicar el recorrido deseado", "Consultar disponibilidad por WhatsApp"],
    prices: [{ label: "Precio", value: "Presupuesto personalizado" }],
    bookingNote:
      "No existe una tarifa fija: el precio depende del recorrido y del número de personas.",
    gallery: [
      { src: "/images/boats/lancha.webp", alt: "Lancha rápida de Capitán Gringo" },
      { src: "/images/boats/catamaran-capitan-gringo.webp", alt: "Embarcación de Capitán Gringo en aguas del Caribe" },
      { src: "/images/saona/playa-saona.webp", alt: "Costa de Isla Saona" },
    ],
  },
  {
    slug: "isla-catalina-rio-chavon",
    name: "Isla Catalina y Río Chavón",
    eyebrow: "Naturaleza sobre y bajo el agua",
    destination: "Isla Catalina",
    shortDescription:
      "Río Chavón, marina de Casa de Campo, costa caribeña y dos puntos de snorkel en Isla Catalina.",
    intro:
      "Una excursión de día completo en lancha rápida que combina el cañón del Río Chavón, la marina de Casa de Campo y las aguas cristalinas de Isla Catalina, conocidas por sus corales y peces de colores.",
    heroImage: "/images/catalina/snorkel-catalina.webp",
    cardImage: "/images/catalina/playa-catalina.webp",
    imageAlt: "Playa de arena blanca y agua turquesa en Isla Catalina",
    duration: "Día completo",
    schedule: "Jueves",
    pickup: "Entre 6:00 y 7:00 a. m., según el hotel",
    returnTime: "Regreso aproximado al hotel entre 6:30 y 7:00 p. m.",
    priceFrom: "US$55",
    priceNote: "desde Bayahibe",
    featured: true,
    tags: ["Dos puntos de snorkel", "Grupos reducidos", "Lancha ida y vuelta"],
    itinerary: [
      {
        title: "Recogida y embarque",
        description:
          "Traslado desde hoteles de Punta Cana, Bávaro y Bayahibe hasta el punto de embarque.",
      },
      {
        title: "Río Chavón",
        description:
          "Recorrido por su majestuoso cañón, con vistas de la vegetación y la fauna de la zona.",
      },
      {
        title: "Casa de Campo",
        description:
          "Paseo por la marina y navegación junto a la costa antes de salir a mar abierto.",
      },
      {
        title: "Isla Catalina",
        description:
          "Tiempo de playa y dos puntos de snorkel, incluido un sector con profundidad aproximada de 5 a 10 metros.",
      },
    ],
    includes: [
      "Traslado de ida y vuelta desde hoteles de Punta Cana y Bayahibe",
      "Lancha con medidas de seguridad, salvavidas y techo para el sol",
      "Almuerzo y bebidas",
      "Gafas y tubo para snorkel disponibles",
      "Dos puntos de snorkel y tiempo de playa",
    ],
    recommendations: ["Protector solar", "Repelente de insectos", "Set personal de snorkel", "Cámara acuática", "Ropa de playa y toalla"],
    restrictions: ["No recomendada para personas con problemas de espalda", "No recomendada para personas embarazadas"],
    prices: [
      { label: "Desde Punta Cana", value: "US$65" },
      { label: "Desde Bayahibe", value: "US$55" },
      { label: "Desde Uvero Alto", value: "US$75" },
      { label: "Bahía Príncipe La Romana", value: "US$90" },
      { label: "Niños hasta 2 años", value: "Gratis" },
      { label: "Niños de 3 a 11 años", value: "50%" },
    ],
    bookingNote:
      "Se recomienda llevar un set personal de snorkel porque el material disponible es reutilizado.",
    gallery: [
      { src: "/images/rio-chavon/rio-chavon.webp", alt: "Aguas y vegetación del Río Chavón" },
      { src: "/images/catalina/marina-casa-campo.webp", alt: "Marina de Casa de Campo" },
      { src: "/images/catalina/playa-catalina.webp", alt: "Corales y peces de colores en Isla Catalina" },
    ],
  },
  {
    slug: "santo-domingo-ciudad-colonial",
    name: "Santo Domingo Ciudad Colonial",
    eyebrow: "Historia viva de América",
    destination: "Santo Domingo",
    shortDescription:
      "Catedral Primada, Parque Colón, Alcázar, Palacio Presidencial, Calle El Conde y Los Tres Ojos.",
    intro:
      "Una excursión cultural por la capital dominicana y sus lugares históricos, realizada los miércoles en grupos muy reducidos.",
    heroImage: "/images/santo-domingo/alcazar.webp",
    cardImage: "/images/santo-domingo/catedral.webp",
    imageAlt: "Arquitectura colonial del Alcázar de Colón en Santo Domingo",
    duration: "Día completo",
    schedule: "Miércoles",
    priceFrom: "US$70",
    priceNote: "por adulto",
    tags: ["Grupos muy reducidos", "Almuerzo incluido", "Entradas incluidas"],
    itinerary: [
      { title: "Catedral Primada de América", description: "Visita a la histórica catedral, de arquitectura gótica y barroca." },
      { title: "Parque Colón", description: "Paseo por uno de los espacios históricos centrales de la Ciudad Colonial." },
      { title: "Alcázar de Don Diego Colón", description: "Recorrido por el antiguo palacio virreinal y casa del gobernador." },
      { title: "Palacio Presidencial", description: "Parada exterior en la sede del gobierno de la República Dominicana." },
      { title: "Calle El Conde", description: "Paseo por una de las calles peatonales más antiguas de la ciudad." },
      { title: "Los Tres Ojos", description: "Visita al conjunto de cavernas y lagos subterráneos situado cerca de la ciudad." },
    ],
    includes: ["Almuerzo típico dominicano en un restaurante colonial", "Entradas a los monumentos", "Recorrido en grupo muy reducido"],
    recommendations: ["Ropa y calzado cómodos", "Gorra", "Protector solar", "Dinero para el pago y compras"],
    prices: [
      { label: "Adultos", value: "US$70" },
      { label: "Niños de 3 a 11 años", value: "50%" },
    ],
    bookingNote:
      "Si el tiempo lo permite y el grupo está de acuerdo, pueden añadirse otras paradas de interés o una visita a mercados artesanales.",
    gallery: [
      { src: "/images/santo-domingo/catedral.webp", alt: "Catedral Primada de América" },
      { src: "/images/santo-domingo/tres-ojos.webp", alt: "Lago subterráneo del Parque Nacional Los Tres Ojos" },
      { src: "/images/santo-domingo/calle-conde.webp", alt: "Calle peatonal El Conde en Santo Domingo" },
    ],
  },
  {
    slug: "buggies-y-quads",
    name: "Buggies y Quads",
    eyebrow: "Adrenalina entre playa y bosque",
    destination: "Punta Cana y Macao",
    shortDescription:
      "Playa Macao, caminos de tierra y lodo, bosque y una cueva de aguas subterráneas.",
    intro:
      "Una aventura para quienes disfrutan la adrenalina: conducción por caminos de tierra y lodo, parada en Playa Macao y baño en una cueva de aguas cristalinas.",
    heroImage: "/images/buggies/buggies.webp",
    cardImage: "/images/buggies/playa-macao.webp",
    imageAlt: "Buggy durante una excursión cerca de Playa Macao",
    duration: "4 horas aprox.",
    schedule: "Todos los días",
    returnTime: "Tiempo de conducción aproximado: 2 horas",
    priceFrom: "US$65",
    priceNote: "por vehículo",
    tags: ["Playa Macao", "Cueva de agua", "Seguro incluido"],
    itinerary: [
      { title: "Playa Macao", description: "Primera parada para disfrutar aproximadamente media hora de baño en una playa de la zona." },
      { title: "Caminos de tierra y lodo", description: "Conducción hacia el bosque por un recorrido en el que la ropa se ensucia." },
      { title: "Cueva de aguas cristalinas", description: "Parada en una cueva con aguas subterráneas para darse un baño." },
    ],
    includes: ["Vehículo reservado según la opción elegida", "Seguro de accidentes", "Recorrido guiado de aproximadamente cuatro horas"],
    recommendations: ["Llevar ropa que pueda ensuciarse mucho o desecharse"],
    restrictions: ["No apta para personas embarazadas", "No apta para niños menores de 4 años"],
    prices: [
      { label: "Buggy para 2 personas", value: "US$65" },
      { label: "Buggy familiar para 4", value: "US$100" },
      { label: "Quad", value: "US$65" },
      { label: "Terracross", value: "US$105" },
    ],
    gallery: [
      { src: "/images/buggies/buggies.webp", alt: "Buggy de dos plazas en el recorrido" },
      { src: "/images/buggies/playa-macao.webp", alt: "Playa Macao en República Dominicana" },
    ],
  },
  {
    slug: "safari-tour",
    name: "Safari Tour",
    eyebrow: "Conoce la vida dominicana",
    destination: "Higüey y Macao",
    shortDescription:
      "Campos, plantaciones, ranchos, Higüey, paseo a caballo y playa, en grandes camiones de safari.",
    intro:
      "Una excursión de día completo para acercarse a la vida de los campos y pueblos dominicanos, desde las plantaciones hasta la ciudad de Higüey y las playas de Macao.",
    heroImage: "/images/safari/safari-truck.webp",
    cardImage: "/images/safari/campo.webp",
    imageAlt: "Camión de safari utilizado en la excursión",
    duration: "Día completo",
    schedule: "Lunes a sábado",
    pickup: "Inicio aproximado: 7:30 a. m.",
    returnTime: "Fin aproximado: 5:30 p. m.",
    priceFrom: "US$70",
    priceNote: "por adulto desde Punta Cana",
    tags: ["Almuerzo incluido", "Bebidas incluidas", "Solo desde Punta Cana"],
    itinerary: [
      { title: "Campos y pueblos", description: "Visita a zonas rurales y escuelas para conocer la vida cotidiana de la comunidad." },
      { title: "Plantaciones", description: "Caña de azúcar, café, cacao y frutas tropicales, desde la planta hasta el producto final." },
      { title: "Higüey", description: "Recorrido por la ciudad y visita a su catedral." },
      { title: "Ranchos dominicanos", description: "Degustación de frutas, almuerzo dominicano y acercamiento a la vida del campo." },
      { title: "Caballos y Playa Macao", description: "Paseo a caballo y visita a las playas de la zona de Macao." },
    ],
    includes: ["Transporte en camiones de safari", "Almuerzo dominicano", "Bebidas durante el trayecto", "Paseo a caballo"],
    recommendations: ["Ropa cómoda", "Protector solar", "Calzado apropiado para una jornada de campo"],
    prices: [
      { label: "Adultos", value: "US$70" },
      { label: "Niños de 3 a 12 años", value: "50%" },
    ],
    bookingNote: "La tarifa publicada corresponde únicamente a salidas desde Punta Cana.",
    gallery: [
      { src: "/images/safari/safari-truck.webp", alt: "Camión grande utilizado en el Safari Tour" },
      { src: "/images/safari/higuey.webp", alt: "Catedral de Higüey" },
      { src: "/images/safari/campo.webp", alt: "Cacao durante la visita a plantaciones" },
    ],
  },
  {
    slug: "samana-via-terrestre",
    name: "Samaná vía terrestre",
    eyebrow: "Mar, montaña y cascada",
    destination: "Samaná",
    shortDescription:
      "Viaje por carretera y mar, safari de montaña, paseo a caballo, Cascada Limón e Isla Bacardí.",
    intro:
      "Una experiencia todoterreno que combina traslado en bus, navegación desde Miches, paisaje rural, caballo hasta la Cascada Limón y tiempo de playa en Isla Bacardí.",
    heroImage: "/images/samana/cayo-levantado.webp",
    cardImage: "/images/samana/caballo.webp",
    imageAlt: "Vista aérea de Cayo Levantado, conocido como Isla Bacardí",
    duration: "Día completo",
    schedule: "Se realiza por reserva",
    pickup: "Inicio aproximado: 6:30 a. m.",
    returnTime: "Fin aproximado: 6:30 p. m.",
    priceFrom: "US$115",
    priceNote: "Samaná terrestre",
    tags: ["Bus y embarcación", "Caballo", "Almuerzo y bebidas"],
    itinerary: [
      { title: "Punta Cana a Miches", description: "Trayecto en bus por la zona rural del noreste del país." },
      { title: "Navegación a Samaná", description: "Embarcación desde el pueblo costero de Miches hasta el puerto de Samaná." },
      { title: "Safari de montaña", description: "Recorrido en camión por campos y zonas rurales con un guía local." },
      { title: "Cascada Limón", description: "Paseo a caballo por la vegetación y baño al pie de la cascada." },
      { title: "Isla Bacardí", description: "Almuerzo dominicano y tiempo de playa antes del regreso." },
    ],
    includes: ["Traslado en bus desde Punta Cana y Bayahibe", "Embarcaciones del recorrido", "Safari en camión", "Paseo a caballo", "Almuerzo y bebidas"],
    recommendations: ["Reservar con antelación", "Llevar ropa cómoda", "Traje de baño", "Protector solar"],
    prices: [{ label: "Samaná terrestre", value: "US$115" }, { label: "Depósito para reservar", value: "US$20" }],
    bookingNote:
      "Durante la temporada de avistamiento de ballenas el costo puede aumentar. Las plazas se aseguran con 48 horas de antelación una vez el viajero está en su hotel.",
    gallery: [
      { src: "/images/samana/cayo-levantado.webp", alt: "Cayo Levantado o Isla Bacardí" },
      { src: "/images/samana/caballo.webp", alt: "Cascada Limón en Samaná" },
      { src: "/images/samana/ballena.webp", alt: "Ballena jorobada en aguas de Samaná" },
    ],
  },
];

export const featuredTours = tours.filter((tour) => tour.featured);

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);

export const destinations = [
  {
    name: "Isla Saona",
    description:
      "Playas de arena blanca, Mano Juan, manglares y la Piscina Natural dentro del entorno protegido del Parque Nacional del Este.",
    image: "/images/saona/canto-de-la-playa.webp",
  },
  {
    name: "Isla Catalina",
    description:
      "Una isla frente a La Romana con aguas cristalinas, corales vivos y condiciones especialmente atractivas para snorkel y buceo.",
    image: "/images/catalina/snorkel-catalina.webp",
  },
  {
    name: "Río Chavón",
    description:
      "Un recorrido entre vegetación y paredes de cañón que forma parte de la excursión a Isla Catalina.",
    image: "/images/rio-chavon/canon-rio-chavon.webp",
  },
  {
    name: "Bayahibe",
    description:
      "Pueblo costero fundado como aldea de pescadores y punto de salida de las excursiones marítimas hacia Isla Saona.",
    image: "/images/gallery/playa-bayahibe.webp",
  },
  {
    name: "Punta Cana",
    description:
      "Zona turística del este dominicano, conocida por su extensa costa de arena blanca, cocoteros y aguas turquesas.",
    image: "/images/gallery/palmeras.webp",
  },
  {
    name: "Santo Domingo",
    description:
      "Capital del país, con la Ciudad Colonial, monumentos históricos y el Parque Nacional Los Tres Ojos.",
    image: "/images/santo-domingo/calle-conde.webp",
  },
];

export const galleryImages = [
  { src: "/images/saona/mano-juan.webp", alt: "Camino principal del pueblo de Mano Juan" },
  { src: "/images/catalina/snorkel-catalina.webp", alt: "Playa de Isla Catalina" },
  { src: "/images/boats/equipo.webp", alt: "Equipo de Capitán Gringo junto a las embarcaciones" },
  { src: "/images/rio-chavon/canon-rio-chavon.webp", alt: "Vista elevada del cañón del Río Chavón" },
  { src: "/images/saona/piscina-natural.webp", alt: "Visitantes en la Piscina Natural de Isla Saona" },
  { src: "/images/samana/cayo-levantado.webp", alt: "Vista aérea de Cayo Levantado" },
  { src: "/images/santo-domingo/alcazar.webp", alt: "Alcázar de Colón en la Ciudad Colonial" },
  { src: "/images/boats/lancha.webp", alt: "Lancha rápida de Capitán Gringo navegando" },
  { src: "/images/safari/campo.webp", alt: "Cacao mostrado durante el Safari Tour" },
  { src: "/images/gallery/embarcacion.webp", alt: "Embarcación frente a una playa tropical" },
  { src: "/images/buggies/playa-macao.webp", alt: "Arena blanca y costa de Playa Macao" },
  { src: "/images/santo-domingo/tres-ojos.webp", alt: "Caverna y lago de Los Tres Ojos" },
];
