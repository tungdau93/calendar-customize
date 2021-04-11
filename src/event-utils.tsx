import { EventInput } from '@fullcalendar/react'

let eventGuid = 1
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'Đã đầy',
    start: '2021-04-10 12:30:00',
    end: '2021-04-10 13:00:00',
    // display: 'background',
    color: 'red',
    classNames: ['myclass1']
  },
  {
    id: createEventId(),
    title: 'Đã đầy',
    start: '2021-04-10 13:00:00',
    end: '2021-04-10 13:30:00',
    // display: 'background',
    color: 'red',
    classNames: ['myclass1']
  },
  {
    id: createEventId(),
    title: 'Đã đầy',
    start: '2021-04-10 13:30:00',
    end: '2021-04-10 14:00:00',
    // display: 'background',
    color: 'red',
    classNames: ['myclass1']
  },
  {
    id: createEventId(),
    title: 'Đã đầy',
    start: '2021-04-11 13:30:00',
    end: '2021-04-11 14:00:00',
    // display: 'background',
    color: 'red',
    classNames: ['myclass1']
  }
]

export function createEventId() {
  return String(eventGuid++)
}
