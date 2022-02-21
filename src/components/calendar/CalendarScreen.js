import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messager-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(), // new Date
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa',
  notes: 'Buscar a manuel',
  user: {
    _id: '123',
    name: 'Diego'
  }
}]

export const CalendarScreen = () => {

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );
  const dispatch = useDispatch();

  const onDobleClick = (e) => {
    dispatch(uiOpenModal())
    console.log(e);
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

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
        onDoubleClickEvent={ onDobleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      
      <CalendarModal />

    </div>
  )
}
