import * as moment from 'moment';

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function getLocalDate(date: Date | string): string {
  return date ? moment(date).local().format('L, h:mm:ss a') : '';
}
