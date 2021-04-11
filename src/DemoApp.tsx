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
import format from './format'
import { Modal, Button, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css"
interface DemoAppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
  startBooking: string
  endBooking: string
  startWorking: string
  endWorking: string
  offWorking: string
  holiday: string
  show: boolean
  title: string
}

export default class DemoApp extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    startBooking: '08:00:00',
    endBooking: '19:00:00',
    startWorking: '08:00:00',
    endWorking: '21:00:00',
    offWorking: '2021-04-13',
    holiday: '2021-04-30',
    show: false,
    title: ''
  }

  render() {
    return (
      <div className='demo-app d-flex flex-column'>
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
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            displayEventTime={false}
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
            navLinks={true}
            businessHours={{
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startTime: this.state.startWorking,
              endTime: this.state.endWorking,
            }}
            events={[
              {
                title: 'Ngày salon nghỉ!',
                start: this.state.offWorking,
                end: this.state.offWorking,
                display: 'background',
                color: 'green',
              },
              {
                title: 'Ngày nghỉ lễ!',
                start: this.state.holiday,
                end: this.state.holiday,
                display: 'background',
                color: 'red',
              }
            ]}
          />
        </div>

        <Modal show={this.state.show} onClick={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.title}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleShow = (title: any) => {
    this.setState({
      show: true,
      title: title,
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  canBooking = (start: any, end: any) => {
    if (start >= this.state.startBooking && end <= this.state.endBooking) return true
    return false
  }

  handleOffWorking = (date: any) => {
    if (format.formatDaytime(date) === this.state.offWorking) return true
    return false
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo, 'select')
    // const startStr = format.formatHourtime(selectInfo.startStr)
    // const endStr = format.formatHourtime(selectInfo.endStr)
    this.handleShow(selectInfo.startStr)
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    console.log(clickInfo, 'event click')
    // this.handleShow()
    // renderTest()
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