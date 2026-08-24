const LIMA_TIME_ZONE = "America/Lima";

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatSlotDateParts(iso: string) {
  const date = new Date(iso);
  const weekday = capitalize(
    new Intl.DateTimeFormat("es-PE", {
      weekday: "long",
      timeZone: LIMA_TIME_ZONE,
    }).format(date)
  );
  const day = new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    timeZone: LIMA_TIME_ZONE,
  }).format(date);
  const month = capitalize(
    new Intl.DateTimeFormat("es-PE", {
      month: "long",
      timeZone: LIMA_TIME_ZONE,
    }).format(date)
  );
  const year = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    timeZone: LIMA_TIME_ZONE,
  }).format(date);
  return { weekday, day, month, year };
}

export function formatSlotTimeRange(startsAtIso: string, endsAtIso: string) {
  const formatter = new Intl.DateTimeFormat("es-PE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: LIMA_TIME_ZONE,
  });
  return `${formatter.format(new Date(startsAtIso))} – ${formatter.format(new Date(endsAtIso))}`;
}

export function formatSlotFullDate(iso: string) {
  const { weekday, day, month, year } = formatSlotDateParts(iso);
  return `${weekday}, ${day} de ${month} de ${year}`;
}
