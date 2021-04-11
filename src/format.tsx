import moment from 'moment'

const formatHourtime = (datetime: any) => {
  return moment(datetime).format('HH:mm:ss')
}

const formatDaytime = (datetime: any) => {
  return moment(datetime).format('YYYY-MM-DD')
}

export default {
  formatHourtime,
  formatDaytime,
}