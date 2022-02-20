import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(), // new Date
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa'
}]

export const CalendarScreen = () => {
  return (
    <div className='clendar-screen'>
      <Navbar />
        
      <Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
      />

    </div>
  )
}
