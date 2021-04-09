import React from 'react'
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/react'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import JPLocale from '@fullcalendar/core/locales/ja'
import VILocal from '@fullcalendar/core/locales/vi'
import ListPlugin from '@fullcalendar/list'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import 'bootstrap/dist/css/bootstrap.css'
// import '@fortawesome/fontawesome-free/css/all.css'
// import BootstrapPlugin from '@fullcalendar/bootstrap'
import moment from 'moment'

interface DemoAppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
  selectable: boolean
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    selectable: false
  }


  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[DayGridPlugin, TimeGridPlugin, InteractionPlugin, ListPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={this.state.selectable}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            weekNumberCalculation='ISO'
            titleRangeSeparator=' - '
            locale={VILocal}
            scrollTime='00:00:00'
            slotDuration='00:30:00'
            slotLabelInterval='00:30:00'
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              omitZeroMinute: false,
              meridiem: 'lowercase'
            }}
            themeSystem='bootstrap'
            fixedWeekCount={false}
            showNonCurrentDates={false}
            allDaySlot={false}
            dateClick={(dateInfo) => {
              this.handleDateClick(dateInfo)
            }}
            navLinks={true}
            businessHours={{
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startTime: '08:00',
              endTime: '21:00',
            }}
          />
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    const timeBooking = moment(selectInfo.endStr).format('HH:mm:ss')
    if ('08:30:00' > timeBooking || timeBooking > '19:00:00') {
      alert('Không thể đặt lịch!')
    } else {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }
  }

  handleDateClick = (selectInfo: any) => {
    console.log(selectInfo)
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

