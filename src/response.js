export default {
  statusCode: 'OK',
  section: 30,
  startWorking: '08:00:00',
  endWorking: '21:00:00',
  startBooking: '08:00:00',
  endBooking: '19:00:00',
  maxSeat: 10,
  salon: {
    salonCd: 1,
    salonDayoff: [
      {
        startTime: '2021-04-13 00:00:00',
        endTime: '2021-04-13 23:59:59',
      },
      {
        startTime: '2021-01-03 00:00:00',
        endTime: '2021-01-03 23:59:59',
      },
    ],
    booking: [
      {
        stylistCd: 1,
        customerCd: 1,
        startTime: '2021-01-03 13:00:00',
        endTime: '2021-01-03 13:30:00',
      },
      {
        stylistCd: 2,
        customerCd: 2,
        startTime: '2021-01-03 13:00:00',
        endTime: '2021-01-03 13:30:00',
      },
      {
        stylistCd: 2,
        customerCd: 3,
        startTime: '2021-01-03 13:30:00',
        endTime: '2021-01-03 14:00:00',
      },
    ],
  },
  stylists: [
    {
      stylistCd: 1,
      dayOff: [
        {
          startTime: '2021-04-13 08:00:00',
          endTime: '2021-04-13 13:00:00',
        },
        {
          startTime: '2021-04-14 00:00:00',
          endTime: '2021-04-14 23:59:59',
        },
      ],
    },
    {
      stylistCd: 3,
      dayOff: [
        {
          startTime: '2021-01-03 00:00:00',
          endTime: '2021-01-03 13:00:00',
        },
        {
          startTime: '2021-01-03 13:00:00',
          endTime: '2021-01-03 23:59:59',
        },
      ],
    },
  ],
  holiday: [
    {
      startTime: '2021-01-01 00:00:00',
      endTime: '2021-01-01 23:59:59',
    },
    {
      startTime: '2021-01-02 00:00:00',
      endTime: '2021-01-02 23:59:59',
    },
  ],
};
