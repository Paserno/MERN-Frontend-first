import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messager-es';

import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(), // new Date
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Buscar a manuel'
}]

export const CalendarScreen = () => {

  const eventStyleGetter = ( event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <div className='clendar-screen'>
      <Navbar />
        
      <Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
      />

    </div>
  )
}
