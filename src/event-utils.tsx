import { EventInput } from '@fullcalendar/react'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: '2021-04-11'
  // },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: '2021-04-10'
  // }
]

export function createEventId() {
  return String(eventGuid++)
}
