// Ranking publicado del Azure Bootcamp. El orden es el del Excel
// "Top 20 bootcamp.xlsx": más temas del proyecto final arriba y, en empate,
// más asistencia en vivo. Dos empates totales (puestos 11–12 y 15–16)
// conservan el orden del archivo. No reordenar esta lista en la UI.

export const PODIO_SESSIONS = 14;

export type PodioEntry = {
  rank: number;
  name: string;
  topics: number;
  attended: number;
  attendancePercent: number;
  country: string;
};

export const TOP_20: PodioEntry[] = [
  {
    rank: 1,
    name: "Diego Farid Solórzano Villegas",
    topics: 11,
    attended: 13,
    attendancePercent: 93,
    country: "Perú",
  },
  {
    rank: 2,
    name: "Rendo Alfonte Tarqui",
    topics: 11,
    attended: 10,
    attendancePercent: 71,
    country: "Perú",
  },
  {
    rank: 3,
    name: "Yan Franko Gonzales Segura",
    topics: 10,
    attended: 13,
    attendancePercent: 93,
    country: "Perú",
  },
  {
    rank: 4,
    name: "Miguel Angel Llusca Surco",
    topics: 10,
    attended: 11,
    attendancePercent: 79,
    country: "Perú",
  },
  {
    rank: 5,
    name: "John Andre Espinoza Ortiz",
    topics: 9,
    attended: 7,
    attendancePercent: 50,
    country: "Perú",
  },
  {
    rank: 6,
    name: "Isabel Cristhina López Huamani",
    topics: 8,
    attended: 5,
    attendancePercent: 36,
    country: "Perú",
  },
  {
    rank: 7,
    name: "Breigzon Turco Condori",
    topics: 7,
    attended: 8,
    attendancePercent: 57,
    country: "Perú",
  },
  {
    rank: 8,
    name: "Juan Esteban Morales Sandoval",
    topics: 6,
    attended: 14,
    attendancePercent: 100,
    country: "Colombia",
  },
  {
    rank: 9,
    name: "Carlos Fabricio Canlla Falcon",
    topics: 6,
    attended: 10,
    attendancePercent: 71,
    country: "Perú",
  },
  {
    rank: 10,
    name: "Laura Valentina Rodriguez Ore",
    topics: 6,
    attended: 9,
    attendancePercent: 64,
    country: "Perú",
  },
  {
    rank: 11,
    name: "David de Jesús Chavarría Hernández",
    topics: 6,
    attended: 5,
    attendancePercent: 36,
    country: "México",
  },
  {
    rank: 12,
    name: "Adrián Espí Peña",
    topics: 6,
    attended: 5,
    attendancePercent: 36,
    country: "España",
  },
  {
    rank: 13,
    name: "Aldair Miguel Angel Raymundo Valle",
    topics: 5,
    attended: 10,
    attendancePercent: 71,
    country: "Perú",
  },
  {
    rank: 14,
    name: "Diego Alonso Avila Saldaña",
    topics: 5,
    attended: 8,
    attendancePercent: 57,
    country: "Perú",
  },
  {
    rank: 15,
    name: "Wuidezon Isaias Burga Cabascango",
    topics: 4,
    attended: 12,
    attendancePercent: 86,
    country: "Ecuador",
  },
  {
    rank: 16,
    name: "Diego Jose Alonso Camayo Rivera",
    topics: 4,
    attended: 12,
    attendancePercent: 86,
    country: "Perú",
  },
  {
    rank: 17,
    name: "Zamia Marlene Guitarra De la Cruz",
    topics: 4,
    attended: 6,
    attendancePercent: 43,
    country: "Ecuador",
  },
  {
    rank: 18,
    name: "Linder Lopez",
    topics: 3,
    attended: 10,
    attendancePercent: 71,
    country: "Perú",
  },
  {
    rank: 19,
    name: "Emely Tamara Moreira Pino",
    topics: 3,
    attended: 4,
    attendancePercent: 29,
    country: "Ecuador",
  },
  {
    rank: 20,
    name: "Andy Gustavo Fuertes Fuertes",
    topics: 1,
    attended: 13,
    attendancePercent: 93,
    country: "Perú",
  },
];
