/**
 * Datos del negocio, centralizados en un solo lugar.
 */
export const siteConfig = {
  name: "Administración del Valle",
  shortName: "ADV",
  tagline: "Administración de consorcios en CABA",
  administrator: "Walter Carrizo",

  whatsapp: "5491173685981",
  whatsappDisplay: "+54 9 11 7368-5981",

  email: "admdelvalle.wc@gmail.com",

  address: {
    street: "Avenida Francisco Beiró 3316",
    cityZip: "C1419 Buenos Aires, CABA",
    country: "Argentina",
    full: "Avenida Francisco Beiró 3316, C1419 Buenos Aires, CABA, Argentina",
  },

  hours: [
    { day: "Lunes", time: "10:00 – 16:00", closed: false },
    { day: "Martes", time: "10:00 – 16:00", closed: false },
    { day: "Miércoles", time: "10:00 – 16:00", closed: false },
    { day: "Jueves", time: "10:00 – 16:00", closed: false },
    { day: "Viernes", time: "10:00 – 16:00", closed: false },
    { day: "Sábado", time: "Cerrado", closed: true },
    { day: "Domingo", time: "Cerrado", closed: true },
  ],

  servicios: [
    {
      numero: "01",
      titulo: "Liquidación de expensas",
      descripcion:
        "Armado mensual de la liquidación, con el detalle de gastos comunes, ordinarios y extraordinarios listo para repartir.",
    },
    {
      numero: "02",
      titulo: "Pago a proveedores",
      descripcion:
        "Coordinación y control de pagos a contratistas, mantenimiento, limpieza y demás servicios del edificio.",
    },
    {
      numero: "03",
      titulo: "Archivo y documentación",
      descripcion:
        "Organización de actas, pólizas, reglamentos y toda la documentación del consorcio, ordenada y disponible.",
    },
    {
      numero: "04",
      titulo: "Gestión y atención",
      descripcion:
        "Atención directa a los reclamos y necesidades diarias del consorcio, desde la consulta hasta la resolución.",
    },
  ],
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
