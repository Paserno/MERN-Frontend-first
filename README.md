# First MERN - Frontend
Primera app MERN ( Mongo - Express - React - Node.js) utilizando las bases aprendidas para la implementación de todos estos elementos en conjuto, este repositorio será la parte del Fronend.

Elementos utilizados: 
* __[React Router v5](https://v5.reactrouter.com/web/guides/quick-start)__
* __[React Big Calendar](https://www.npmjs.com/package/react-big-calendar)__
* __[Moment.js](https://www.npmjs.com/package/moment)__ - [Page](https://momentjs.com)
* __[React Modal](https://www.npmjs.com/package/react-modal)__

----

Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
Y luego para hacerla correr.
````
npm start
````
<br>

----
### 1.- Inicio del Proyecto
En este punto se crearon algunas carpetas con sus componentes base y las primeras rutas implementadas.

Pasos a Seguir:
* En `index.js` se importa el componente principal __AppRouter__.
* Creación de la 📂carpeta `components/`, ademas de 3 📂carpetas hijas llamadas `components/auth`, `components/calendar` y `components/ui`.
    * Se crea el componente __LoginScreen__ en `components/auth/LoginScreen.js`.
    * Se crea el componente __CalendarScreen__ en `components/auth/CalendarScreen.js`.
* Se crea la 📂carpeta `router/` donde se almacenará las rutas de la aplicación como __AppRouter__.
* Se importa la __AppRouter__ en el componente principal __CalendarApp__.

En `router/AppRouter.js`
* Se importa los elementos de React Router v5, ademas de los dos compoentes que se craron __LoginScreen__ y __CalendarScreen__.
````
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
````
* Se crea las 2 rutas hacia `LoginScreen` y `CalendarScreen`, ademas de un `Redirect` en el caso que se mande una ruta desconocida.
````
export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={ LoginScreen } />
          <Route exact path="/" component={ CalendarScreen } />

          <Redirect to='/'/>

        </Switch>
      </div>
    </Router>
  )
}
````
----
### 1,5.- Login
Se creo un formulario para Login en conjunto con el de register, ademas de crear un Navbar

Pasos a Seguir:
* Crear formulario en __LoginSreen__.
* Crear componente __Navbar__ en `components/ui/Navbar.js`.
* Invocar componente __Navbar__ en __CalendarScreen__.

En `components/ui/Navbar.js`
* Se crea un componente Navbar basico.
````
export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand">
            Diego
        </span>

        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i> 
            <span> Salir</span>
        </button>
        
    </div>
  )
}
````
En `components/calendar/CalendarScreen.js`
* Importamos el componente __Navbar__
````
import { Navbar } from '../ui/Navbar'
````
* Y invocamos el componente en el inicio.
````
export const CalendarScreen = () => {
  return (
    <div>
      <Navbar />
        <h1>CalendarScreen</h1>

    </div>
  )
}
````
----
### 2.- Calendar 
Se instalo 2 nuevos elementos __[React Big Calendar](https://www.npmjs.com/package/react-big-calendar)__ y __[Moment.js](https://www.npmjs.com/package/moment)__ para obtener un calendario y manejar las horas.

Pasos a Seguir: 
* Implementar en el componente __CalendarScreen__ la nueva instalación de __React Big Calendar__.
* Agregar CSS para visualizar el calendario.

En `components/calendar/CalendarScreen.js`
* Agregamos 4 importaciones nuevas.
  * `Calendar` y `momentLocalizer` propio de __React Big Calendar__ para su utilización.
  * Es recomendado utilizar `moment` para el manejo de las fechas dentro del calendario.
  * Y finalmente se importa el css propio de __React Big Calendar__.
````
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
````
* Realizamos la configuración del `localizer`.
* Y se agrega un evento para mostrarlo como ejemplo en el __Calendar__.
  * Se tiene que mandar el inicio y el fin del evento.
````
const localizer = momentLocalizer(moment); 

const events = [{
  title: 'Cumpleaños',
  start: moment().toDate(), // new Date
  end: moment().add( 2, 'hours').toDate(),
  bgcolor: '#fafafa'
}]
````
* En el retur del componente agregamos el componente __Calendar__ propia de __React Big Calendar__ y le pasamos el evento creado.
````
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
````
En `styles.css`
* Agregamos un pequeño __CSS__ para mostrar mejor el calendario de __React Big Calendar__.
````
html, body {
    height: 100vh;
    width: 100vw;
}

.clendar-screen { 
    display: flex;
    flex-flow: column;
    height: 100vh;
}
.rbc-calendar {
    height: 100%;
    margin: 0 45px 15px 45px;
}
````
----
### 2,5.- Configurando estilos de Calendar
En este puntos se realizará configuraciónes de estilos del calendario.

Pasos a Seguir:
* Se crea la carpeta `helpers/`
  * Agregamos una configuración para tener algunos elementos en el idioma español.
* Realizamos algunas importaciones adicionales en __CalendarScreen__ para tener los elementos en español, ademas de agregar unos estilos.

En `Helpers/calendar-messager-es.js`
* Agregamos la configuración que deseamos en el idioma español.
````
export const messages = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
};
````
En `components/calendar/CalendarScreen.js`
* Se agrega 2 nuevas importaciones, una configuración propia de __moment__ para cambiar el idioma y el objeto literal `messages` que se creo.
````
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messager-es';
````
* Se implementa la configuración para cambio el idioma.
````
moment.locale('es');
````
* Se agrega una función que tendra la configuración de los estilos, ademas de retornar el estilo que se creo.
````
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
  ...
}
````
* Se agrega el `messages` que tiene los elementos en español y en `eventPropGetter={}` se implementa la función recién mostrada que retorna los estilos.
````
<Calendar
        localizer={localizer}
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
      />
````
----
### 3.- Componente de evento - eventos en CalendarScreen
Se creará un componentne nuevo llamado __CalendarEvent__, ademas se agregan algunos eventos nuevos en el componente __CalendarScreen__.

Pasos a Seguir:
* Se crea el nuevo componente __CalendarEvent__, para personalizar los bloques del calendarios.
* Creamos funciones donde se manejaran los eventos.
  * Se crea un evento para el manejo de __localStorage__, para guardar la ultima vista.

En `components/calendar/CalendarEvent.js`
* Se crea el componente que recibirá por parametros `event`.
* Desestructuramos el title y user de los `event`.
* Retornamos en el componente el titulo y el nombre.
````
export const CalendarEvent = ({ event }) => {

    const { title, user } = event;

  return (
    <div>
        <strong> { title } </strong>
        <span>- { user.name } </span>
    </div>
  )
}
````
En `components/calendar/CalendarScreen.js`
* Importamos dos nuevos elementos en el componente, __CalendarEvent__ y __useState__ de React.
````
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
````
* Agregamos al evento ejemplo la propiedad `user` con el id y nombre.
````
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
````
* Se agrega un estado, donde recibirá el __localStorage__, en el caso que no haya nada ahí, se mandara `month`, esto lo que manejará es la ultima vista en la aplicación.
````
const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
````
* Creamos los diferentes eventos que se usaran.
  * evento de doble clic para la futura edición.
  * evento select para eliminarlo en el futuro.
  * Y el evento que se implemento es de mandar la ultima vista al __localStorage__.
````
const onDobleClick = (e) => {
    console.log(e);
  }

  const onSelectEvent = (e) => {
    console.log(e);
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }
````
* Agregamos los ultimos eventos, ademas del nuevo componente personalizado __CalendarEvent__.
````
<Calendar
  ...
  onDoubleClickEvent={ onDobleClick }
  onSelectEvent={ onSelectEvent }
  onView={ onViewChange }
  view={ lastView }
  components={{
    event: CalendarEvent
  }}
/>
````
----
### 4.- Pantalla Modal
En este punto se instalará un __React Modal__, para el manejo de la edición del calenadrio.

Pasos a Seguir: 
* Instalación de __[React Modal](https://www.npmjs.com/package/react-modal)__.
* Crear componente __CalendarModal__ para mostrar la pantalla modal que será para la edición.
* Implementar __CalendarModal__ en el componente __CalendarScreen__.

En `components/calendar/CalendarModal.js`
* Se importa __useState__ de React y __Modal__ de la instalación de React Modal. 
````
import { useState } from 'react';
import Modal from 'react-modal';
````
* Agregamos el estilo personalizado que esta en la documentación de __React Modal__. _(Para centralizar la pantalla modal)_
* Se hace referencia al id del elemento html en este caso es `#root`.
````
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');
````
* Se crea el componente __CalendarModal__.
* Agregamos un __useState__ para manejar el estado de la pantalla modal si se mantiene abierta o cerrada, esto proximamente sera remplazada por los estados en Redux.
* Creamos la función que manejará el estado cuando se cierre la pantalla modal. 
````
export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false);
        console.log('closing...');
    }
    ...
}
````
* Se invoca el componente __Modal__ que viene en la documentación.
  * Le pasamos el __useState__ en isOpen.
  * Agregamos la función `closeModal` en onRequestClose.
  * Implementamos los estilos que viene del objeto `customStyles`.
  * Le damos un timeout de 300ms.
  * Agregamos unos estilos adicionales, luego mostramos un mensaje de prueba.
````
return (
    <Modal
        isOpen={ isOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
        closeTimeoutMS={ 300 }
        className="modal"
        overlayClassName="modal-fondo"
      >
          <h1> Hola mundo </h1>
          <hr />
          <span> hola diego</span>
      </Modal>
  )
````
En `components/calendar/CalendarScreen.js`
* Agregamos al final del return el componente __CalendarModal__.
````
<CalendarModal />
````
En `styles.css`
* Se agregan algunos estilos que vienen de la documentación ademas de personalizar algunos elementos como la transparencia que saldrá en el encima del contenido principal.
````
.ReactModalPortal > div{
    opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
    align-items: center;
    display: flex;
    justify-content: center;
    transition: opacity .3s ease-in-out;
    z-index: 999;
}

.modal-fondo {
    background-color: rgba(2, 0, 0, 0.596);
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
    opacity: 1;
}

.ReactModalPortal .ReactModal__Overlay--before-close {
    opacity: 0;
}

.modal {
    background: white;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    display: inline;
    max-height: 620px;
    max-width: 500px;
    outline: none;
    padding: 10px;
}
````
----