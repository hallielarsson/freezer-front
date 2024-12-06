export type ISODateString = `${number}-${number}-${number}T${number}:${number}:${number}${'Z' | `+${number}${number}:${number}${number}` | `-${number}${number}:${number}${number}`}`;

// export const isValidISODate = (date: string): date is ISODateString => {
//     const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|([+-]\d{2}:\d{2}))$/;
//     return isoDateRegex.test(date);
// };
