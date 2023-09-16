import { Temporal } from "temporal-polyfill";

export const getDate = (date: Temporal.PlainDateTime) => {
    const day = date.day;
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.year;

    return `Дата: ${day} ${month} ${year}`;
}