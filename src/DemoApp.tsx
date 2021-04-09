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
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[DayGridPlugin, TimeGridPlugin, InteractionPlugin, ListPlugin]}
            // customButtons={{
            //   myCustomButton: {
            //     text: 'custom!',
            //     click: function () {
            //       alert('clicked the custom button!');
            //     }
            //   }
            // }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            weekNumberCalculation='ISO'
            titleRangeSeparator=' - '
            // titleFormat={{
            //   year: 'numeric', month: 'long', day: 'numeric'
            // }}
            locale={VILocal}
            scrollTime='00:00:00'
            slotDuration='00:30:00'
            slotLabelInterval='00:30:00'
            // slotMinTime='08:00:00'
            // slotMaxTime='21:00:00'
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
            events={[
              {
                // daysOfWeek: [3, 4],
                // startTime: 'T00:00:00',
                // endTime: 'T10:00:00',
                // display: 'background',
                // color: '#dcdcdc',
              }
            ]}
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
    // console.log(selectInfo)
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

