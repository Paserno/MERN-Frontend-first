> __Elemento Anterior 馃憖:__ __[App de React con SASS - Redux - Firebase](https://github.com/Paserno/react-redux-fst-app)__
# First MERN - Frontend
Primera app MERN ( Mongo - Express - __React__ - Node.js) utilizando las bases aprendidas para la implementaci贸n de todos estos elementos en conjuto, este repositorio ser谩 la parte del Fronend.

Elementos utilizados: 
* __[React Router v5](https://v5.reactrouter.com/web/guides/quick-start)__
* __[React Big Calendar](https://www.npmjs.com/package/react-big-calendar)__
* __[Moment.js](https://www.npmjs.com/package/moment)__ - [Page](https://momentjs.com)
* __[React Modal](https://www.npmjs.com/package/react-modal)__
* __[React DateTime Picker](https://www.npmjs.com/package/react-datetime-picker)__
* __[Sweet Alert 2](https://www.npmjs.com/package/sweetalert2)__

Redux
* __[Redux](https://es.redux.js.org)__
* __[React Redux](https://react-redux.js.org)__
* __[Redux Thunk](https://www.npmjs.com/package/redux-thunk)__

----

Recordar que si se desea ejecutar esta aplicaci贸n, deben de reconstruir los m贸dulos de node as铆:
````
npm install
````
Y luego para hacerla correr.
````
npm start
````
<br>


> __Elemento Posterior 馃憖:__ __[First MERN - Backend](https://github.com/Paserno/MERN-Backend-first)__

----
### 1.- Inicio del Proyecto
En este punto se crearon algunas carpetas con sus componentes base y las primeras rutas implementadas.

Pasos a Seguir:
* En `index.js` se importa el componente principal __AppRouter__.
* Creaci贸n de la 馃搨carpeta `components/`, ademas de 3 馃搨carpetas hijas llamadas `components/auth`, `components/calendar` y `components/ui`.
    * Se crea el componente __LoginScreen__ en `components/auth/LoginScreen.js`.
    * Se crea el componente __CalendarScreen__ en `components/auth/CalendarScreen.js`.
* Se crea la 馃搨carpeta `router/` donde se almacenar谩 las rutas de la aplicaci贸n como __AppRouter__.
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
* Implementar en el componente __CalendarScreen__ la nueva instalaci贸n de __React Big Calendar__.
* Agregar CSS para visualizar el calendario.

En `components/calendar/CalendarScreen.js`
* Agregamos 4 importaciones nuevas.
  * `Calendar` y `momentLocalizer` propio de __React Big Calendar__ para su utilizaci贸n.
  * Es recomendado utilizar `moment` para el manejo de las fechas dentro del calendario.
  * Y finalmente se importa el css propio de __React Big Calendar__.
````
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
````
* Realizamos la configuraci贸n del `localizer`.
* Y se agrega un evento para mostrarlo como ejemplo en el __Calendar__.
  * Se tiene que mandar el inicio y el fin del evento.
````
const localizer = momentLocalizer(moment); 

const events = [{
  title: 'Cumplea帽os',
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
* Agregamos un peque帽o __CSS__ para mostrar mejor el calendario de __React Big Calendar__.
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
En este puntos se realizar谩 configuraci贸nes de estilos del calendario.

Pasos a Seguir:
* Se crea la carpeta `helpers/`
  * Agregamos una configuraci贸n para tener algunos elementos en el idioma espa帽ol.
* Realizamos algunas importaciones adicionales en __CalendarScreen__ para tener los elementos en espa帽ol, ademas de agregar unos estilos.

En `Helpers/calendar-messager-es.js`
* Agregamos la configuraci贸n que deseamos en el idioma espa帽ol.
````
export const messages = {
    allDay: 'Todo el d铆a',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'D铆a',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver m谩s (${total})`
};
````
En `components/calendar/CalendarScreen.js`
* Se agrega 2 nuevas importaciones, una configuraci贸n propia de __moment__ para cambiar el idioma y el objeto literal `messages` que se creo.
````
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messager-es';
````
* Se implementa la configuraci贸n para cambio el idioma.
````
moment.locale('es');
````
* Se agrega una funci贸n que tendra la configuraci贸n de los estilos, ademas de retornar el estilo que se creo.
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
* Se agrega el `messages` que tiene los elementos en espa帽ol y en `eventPropGetter={}` se implementa la funci贸n reci茅n mostrada que retorna los estilos.
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
Se crear谩 un componentne nuevo llamado __CalendarEvent__, ademas se agregan algunos eventos nuevos en el componente __CalendarScreen__.

Pasos a Seguir:
* Se crea el nuevo componente __CalendarEvent__, para personalizar los bloques del calendarios.
* Creamos funciones donde se manejaran los eventos.
  * Se crea un evento para el manejo de __localStorage__, para guardar la ultima vista.

En `components/calendar/CalendarEvent.js`
* Se crea el componente que recibir谩 por parametros `event`.
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
  title: 'Cumplea帽os',
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
* Se agrega un estado, donde recibir谩 el __localStorage__, en el caso que no haya nada ah铆, se mandara `month`, esto lo que manejar谩 es la ultima vista en la aplicaci贸n.
````
const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )
````
* Creamos los diferentes eventos que se usaran.
  * evento de doble clic para la futura edici贸n.
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
En este punto se instalar谩 un __React Modal__, para el manejo de la edici贸n del calenadrio.

Pasos a Seguir: 
* Instalaci贸n de __[React Modal](https://www.npmjs.com/package/react-modal)__.
* Crear componente __CalendarModal__ para mostrar la pantalla modal que ser谩 para la edici贸n.
* Implementar __CalendarModal__ en el componente __CalendarScreen__.

En `components/calendar/CalendarModal.js`
* Se importa __useState__ de React y __Modal__ de la instalaci贸n de React Modal. 
````
import { useState } from 'react';
import Modal from 'react-modal';
````
* Agregamos el estilo personalizado que esta en la documentaci贸n de __React Modal__. _(Para centralizar la pantalla modal)_
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
* Creamos la funci贸n que manejar谩 el estado cuando se cierre la pantalla modal. 
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
* Se invoca el componente __Modal__ que viene en la documentaci贸n.
  * Le pasamos el __useState__ en isOpen.
  * Agregamos la funci贸n `closeModal` en onRequestClose.
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
* Se agregan algunos estilos que vienen de la documentaci贸n ademas de personalizar algunos elementos como la transparencia que saldr谩 en el encima del contenido principal.
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
### 5.- Contenido de la Pantalla Modal
Se instala __React DateTime Picker__ para que el usuaro pueda seleccionar una fecha y hora, ademas de mostrarlo, esto se le agrega a la pantalla modal y otros input's.

Pasos a Seguir:
* Se instala __[React DateTime Picker](https://www.npmjs.com/package/react-datetime-picker)__.
* Se agrega un formulario con diferentes input en el componente __CalendarModal__.
  * Se adapta dos input con __React DateTime Picker__ para el manejo de fechas y se le agrega algunos estilos.
  * Se utiliza el hook __useState__ y funciones que maneje el nuevo input.

En `components/calendar/CalendarModal.js`
* Se instala 2 nuevos elementos en el componente, __DataTimePicker__ y __moment__.
````
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; 
import moment from 'moment';
import { useState } from 'react';
````
* Se utiliza moment para sacar la hora actual y agregarle una hora adicional.
* Se clona la hora actual y se le agrega adicionalmente 1 hora.
````
const now = moment().minutes(0).second(0).add(1, 'hours'); 
const oneMoreHours = now.clone().add(1, 'hours');
````
* Se agregan dos __useState__ para entregarle la hora actual y poder manejar las horas en el input que se mostrar谩 a continuaci贸n.
````
const [dateStart, setDateStart] = useState( now.toDate() );
const [dateEnd, setDateEnd] = useState( oneMoreHours.toDate() );
````
* Se crean dos funciones que har谩 que se pueda cambiar el estado del __useState__ de `dateStart` y `dateEnd`.
````
const handleStartDateChange = (e) => {
    setDateStart( e );
    console.log(e)
  } 

  const handleFinishDateChange = (e) => {
    setDateEnd( e );
    console.log(e)
  } 
````
* Se agrega la estructura HTML que tendra la pantalla modal. _(En los puntos suspensivos ira otro contenido)_
````
<h1> Nuevo evento </h1>
<hr />
<form className="container">

  <div className="form-group">
    <label>Fecha y hora inicio</label>
    
    ....

  </div>

  <div className="form-group">
    <label>Fecha y hora fin</label>
    
    ....

  </div>

  <hr />
  <div className="form-group">
    <label>Titulo y notas</label>
    <input
      type="text"
      className="form-control"
      placeholder="T铆tulo del evento"
      name="title"
      autoComplete="off"
    />
    <small id="emailHelp" className="form-text text-muted">Una descripci贸n corta</small>
  </div>

  <div className="form-group">
    <textarea
      type="text"
      className="form-control"
      placeholder="Notas"
      rows="5"
      name="notes"
    ></textarea>
    <small id="emailHelp" className="form-text text-muted">Informaci贸n adicional</small>
  </div>

  <button
    type="submit"
    className="btn btn-outline-primary btn-block"
  >
    <i className="far fa-save"></i>
    <span>  Guardar</span>
  </button>

</form>
````
* Los primeros puntos suspensivos ira el contenido de __DateTimePicker__ le agregamos que funci贸n har谩 su cambio, su useState, el formato que se mostrar谩 la fecha e hora y su clase.  
````
<DateTimePicker 
  onChange={ handleStartDateChange } 
  value={ dateStart } 
  format="dd-MM-y h:mm a"
  amPmAriaLabel="Select AM/PM"
  className="form-control"
/>
````
* Agregamos todo igual al punto anterior, pero adicionalmente se usa `minDate` que es propio de __DateTimePicker__, esto har谩 que nunca se tenga una hora inferior a su dependencia en este caso el useState `dateStart`.
````
<DateTimePicker 
  onChange={ handleFinishDateChange } 
  value={ dateEnd } 
  format="dd-MM-y h:mm a"
  amPmAriaLabel="Select AM/PM"
  minDate={ dateStart }
  className="form-control"
/>
````
----
### 6.- Obtener Informaci贸n del Formulario Modal
Almacenar el estado del formulario completo para luego enviarlo.

Pasos a Seguir:
* Crear un nuevo useState que almacene el estado de todo el componente modal.
  * Crear la funci贸n que maneje los input de notas y titulo.
  * Adaptar las dos funci贸nes que ya se ten铆a `handleStartDateChange` y `handleFinishDateChange` para entregar el estado al nuevo useState.

En `components/calendar/CalendarModal.js`
* Se implementa el nuevo useState, que le damos como valor inicial el `title`, `notes`, `start` y `end`.
* Desestrucutrar `notes` y `title` del useState, para manejarlo en los input.
````
const [formValues, setFormValues] = useState({
  title: 'Event',
  notes: '',
  start: now.toDate(), 
  end: oneMoreHours.toDate()
});

const { notes, title } = formValues;
````
* Creamos la funci贸n que permitir谩 el camibo en los input's.
````
const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }
````
* Agregamos en las dos funciones `handleStartDateChange` y `handleFinishDateChange` el `setFormValues` que permitir谩 entregar los cambios al useState.
````
const handleStartDateChange = (e) => {
  setDateStart( e );
  setFormValues({
    ...formValues,
    start: e
  })
} 

const handleFinishDateChange = (e) => {
  setDateEnd( e );
  setFormValues({
    ...formValues,
    end: e
  })
} 
````
* Creamos la funci贸n Submit del formulario, que se tendra la informaci贸n de todo el formulario.
````
const handleSubmitForm = (e) => {
  e.preventDefault();

  console.log( formValues );
}
````
* Se agrega la funci贸n en el `<form>`
````
<form 
  className="container"
  onSubmit={ handleSubmitForm }
>
````
* Agregamos el value y onChange en el input del `title` y `notes`.
````
<input
  type="text"
  className="form-control"
  placeholder="T铆tulo del evento"
  name="title"
  autoComplete="off"
  value={ title }
  onChange={ handleInputChange }
/>
````
----
### 6,5.- Validaci贸n de Formulario Modal
En este punto se agregaran unas valicaciones en el componente modal.

Pasos a Seguir: 
* Instalar __[Sweet Alert 2](https://www.npmjs.com/package/sweetalert2)__ para mostrar errores.
* Agregar validaci贸nes en la funci贸n Sumbit del formulario.

En `components/calendar/CalendarModal.js`
* Una vez instalado Sweet Alert se importar谩.
````
import Swal from 'sweetalert2';
````
* Se agrega un estado para realizar la validaci贸n del titulo.
* Adicionalmente desestructuramos 2 elementos mas, `start` y `end`.
````
const [titleValid, setTitleValid] = useState(true);

const { notes, title, start, end } = formValues;
````
* Agregamos en la funci贸n Submit diferentes elementos.
  * Creamos instancias de moment con los estados `start` y `end`.
  * Realizamos la primera validaci贸n usando `isSameOrAfter` que este es propio de __moment__, que hace la comparaci贸n entre las dos constantes creadas, en el caso que sea menor o igual `momentEnd` entrar谩 a la condici贸n y saltando una alerta de __Sweet Alert__.
  * Creamos una validaci贸n que si el `title` es menor a 2 caracteres, entrar谩 a la condic贸n.
  * Finalmente si pasa todo las condiciones se mandar谩 un `true` en la validaci贸n del titulo y se llamar谩 a la fucni贸n que cerrar谩 el formulario modal.
````
const handleSubmitForm = (e) => {
  e.preventDefault();

  const momentStart = moment( start );
  const momentEnd = moment( end );

  if ( momentStart.isSameOrAfter( momentEnd )){
    Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
    return;
  }

  if ( title.trim().length < 2 ) {
    return setTitleValid(false); 
  }

  setTitleValid(true);
  closeModal();

}
````
* Agregamos una condici贸n en `className` si el valor de useState del titulo es `false` se activar谩 un elemento de bootstrap que mostrar谩 el input del titulo en rojo advirtiendo al usuario que necesita mas caracteres el titulo.
````
<input
  type="text"
  className={`form-control ${ !titleValid && 'is-invalid'}`}
  placeholder="T铆tulo del evento"
  name="title"
  autoComplete="off"
  value={ title }
  onChange={ handleInputChange }
/>
````
----
### 7.- Configuraci贸n Redux
En este punto se har谩 la instalaci贸n de Redux, React Redux y Redux Thunk, para la configuraci贸n.

Pasos a Seguir:
* Crear los tipos que estar谩 centralizada para el uso del reducer y acitons.
* Crear el primer reducer llamado `uiReducer` en `reducers/uiReducer.js`.
* Crear una ra铆z de Reducer donde se centralizar谩 todos los reducer que se creen para pasarlo a la configuraci贸n.
* Crear el store con la configuraci贸n necesaria para Redux.

En `types/types.js`
* Se crea los primeros tipos que se usar谩n.
````
export const types = {

    uiOpenModal: '[UI] Open Modal',
    uiCloseModal: '[UI] Close Modal',
}
````
En `reducers/uiReducer.js`
* Se importan los tipos.
````
import { types } from "../types/types";
````
* Se crea el estado inicial del reducer.
````
const initialState = {
    modalOpen: false,
}
````
* Se crea el reducer llamado `uiReducer` donde se le pasa por parametro el estado inicial y el `action`.
* Se crea el __switch__ del reducer con su primer case que cambiar谩 el estado inicial y el defalut que devolver谩 el estado.
````
export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
            
        default:
            return state;
    }
}
````
En `reducers/rootReducer.js`
* Se importa un elemento de __Redux__ llamado `combineReducers` y el reducer que se creo.
````
import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
````
* Se asigna el reducer al `combineReducers`, en este punto se agregar谩n todos los reducer que se creen en la aplicaci贸n. 
````
export const rootReducer = combineReducers({
    ui: uiReducer,
})
````
En `store/store.js`
* En el store se har谩 la configuraci贸n, agregando importaciones de Redux, thunk que permitir谩 el uso de actions que interactuen con `dispatch` y `getState` y el combinador de reducer `rootReducer`.
````
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';
````
* Se agrega la configuraci贸n para utilizar la herramienta __Redux DevTools__.
````
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
````
* Se crea el store, pasandole el combinador de reducer, y usando el middleware thunk con ayuda de la configuraci贸n de Redux DevTools.
````
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)
````
----
### 8.- Ocultar y Mostrar Componente Modal
En este punto se har谩 el uso de los estados de Redux para mostrar y ocultar el componente que tiene el formulario modular.

Paso a Seguir:
* Agregar un nuevo case en `uiReducer`.
* Crear acciones que seran disparados.
* Implementar el useDispatch y useSelect de React Redux en el componente __CalendarScreen__ y __CalendarModal__.

En `reducers/uiReducer.js`
* Se agrega la opci贸n de cambiar el estado de `modalOpen` que servir谩 para cerrar el componente __CalendarModal__.
````
case types.uiCloseModal:
  return {
      ...state,
      modalOpen: false
  }
````
En `actions/ui.js`
* Imprtamos los tipos.
````
import { types } from "../types/types";
````
* Creamos dos acciones sincrona que ser谩n disparados en los componentes.
````
export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

export const uiCloseModal = () => ({
    type: types.uiCloseModal
});
````
En `components/calendar/CalendarScreen.js`
* Se importa el CustomHook de __React Redux__ y  la acci贸n que se usar谩.
````
import { useDispatch } from 'react-redux';
...
import { uiOpenModal } from '../../actions/ui';
````
* Implementamos el `useDispatch`
````
const dispatch = useDispatch();
````
* Se agrega en la funci贸n de doble clic el dispatch que activa la acci贸n que abra la pantalla modal. (cambiando el estado de `modalOpen` en `true`)
````
const onDobleClick = (e) => {
    dispatch(uiOpenModal())
    console.log(e);
  }
````
En `components/calendar/CalendarModal.js`
* Se importan 2 nuevos CustomHook de __React Redux__ el useDispatch, useSelector y se importa la acci贸n `uiCloseModal`.
````
import { useDispatch, useSelector } from 'react-redux';
...
import { uiCloseModal } from '../../actions/ui';
````
* Se implementa el dispatch, para activar las acciones.
* Usamos useSelector para buscar el estado `state.ui` y obtener el estado de `modalOpen` para utilizarlo en la componente.
````
const dispatch = useDispatch();
const { modalOpen } = useSelector(state => state.ui);
````
* Se implementa el dispatch en la funci贸n `closeModal` que se usa la acci贸n `uiCloseModal` que cambiar谩 el estado de `modalOpen` a `false`.
````
const closeModal = () => {
    dispatch(uiCloseModal());
  }
````
* Se agrega el estado que se obtuvo de Redux para pasarlo a `isOpen` en el caso que sea `flase` se cerrar谩 y en el contrario se abrira el componente.
````
<Modal
  isOpen={ modalOpen }
  onRequestClose={closeModal}
  style={customStyles}
  closeTimeoutMS={300}
  className="modal"
  overlayClassName="modal-fondo"
>
````
----
### 9.- Primer eventos de Calendario
Se crear谩 un nuevo reducer para el manejo de algunos eventos en el calendario.

Pasos a Seguir:
* Se agrega 2 tipos que se usar谩 en la acciones y el reducer.
* Se crea un nuevo Reducer llamado `calendarReducer`.
* Se agrega el nuevo reducer en `rootReducer`.
* Crear nueva acci贸n que ser谩n disparados.
* Se crea un componente nuevo llamado __AddNewFab__ en `components/ui/AddNewFab.js` y se implmenta dispatch.
* En el componente __CalendarScreen__ se hace uso de una de las nuevas acciones.

En `types/types.js`
* Se agregan dos nuevos tipos para agregar un nuevo evento y modificar un evento.
````
eventSetActive: '[Event] Set Active',
eventAddNew: '[Event] Add New',
````
En `reducers/calendarReducer.js`
* Se importan __moment__ y los tipos.
````
import moment from 'moment';
import { types } from '../types/types';
````
* Se crea un objeto que manejar谩 el estado inicial del reducer, pasandole un evento creado anteriormenete a `events` y creamos `activeEvent` en `null`.
````
const initialState = {
    events: [{
        title: 'Cumplea帽os',
        start: moment().toDate(), // new Date
        end: moment().add( 2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Buscar a manuel',
        user: {
          _id: '123',
          name: 'Diego'
        }
      }],
    activeEvent: null
};
````
* Creamos el nuevo Reducer llamado `calendarReducer`, pasando por propiiedad el estado inicial en `state` y `action`.
* Creamos el __switch__ con la primera acci贸n que recibira el payload en `activeEvent` y un default que retorna el `state`.
````
export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

      case types.eventSetActive:
        return {
          ...state,
          activeEvent: action.payload
        }
        
    
        default:
            return state;
    }
}
````
En `reducers/rootReducer.js`
* Se agrega el nuevo reducer en `rootReducer`.
````
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
})
````
En `actions/events.js`
* Se crean 2 nuevos acciones que reciben por parametro `event` y enviarlo por el payload.
````
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})
````
En `components/ui/AddNewFab.js`
* Se importa el CustomHook de __React Redux__ y la acci贸n `uiOpenModal`.
* Se crea el nuevo componente __AddNewFeb__.
````
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => { ... }
````
* Se intancia el useDispatch.
* Se crea una funci贸n para el bot贸n, que cambia el estado del Redux, para mostrar la componente modal.
````
const dispatch = useDispatch()

const hancleClickNew = () => {
    dispatch(uiOpenModal());
}
````
* Se crea un bot贸n con el icono `fa-plus`, le asignamos al bot贸n en el evento de click la funci贸n que abrir谩 el componente modal.
````
return (
  <button
     className="btn btn-primary fab"
     onClick={ hancleClickNew }
  >
      <i className="fas fa-plus"></i>
  </button>
)
````
En `styles.css`
* Se agregan algunos estilos para el nuevo componente espec铆ficamente en el bot贸n.
````
.fab {
    border-radius: 100%;
    bottom: 20px;
    font-size: 30px;
    padding: 25px;
    position: fixed;
    right: 25px;
}
````
En `components/calendar/CalendarScreen.js`
* Se importa 2 nuevos elementos la acci贸n creada y el componente __AddNewFab__.
````
...
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
````
* Se agrega el dispatch de la acci贸n `eventSetActive` en la funci贸n select, esto hara que se le envie al Redux el estado que se tiene en el formulario _"se active"_.
````
const onSelectEvent = (e) => {
  dispatch(eventSetActive(e));
}
````
* Agregamos al final del componente __Calendar__ el nuevo componente creado llamado __AddNewFab__.
````
<AddNewFab />
````
----
### 9,5.- A帽adir un Evento al Redux
Se agrega una funcionalidad adicional al bot贸n de guardar del componente modal, este har谩 que se guarde en un estado global el contenido del formulario.

Pasos a Seguir:
* Implementar nuevo case en `calendarReducer`.
* Implementar dispatch al bot贸n guardar del componente __CalendarModal__.

En `reducers/calendarReducrer.js`
* Se agrega el nuevo case de `eventAddNew`, conservando el estado con el operador spread, en el `events` se conserva el contenido que se tenga y ademas agregar el contenido que se agregue al payload.
````
case types.eventAddNew:
  return {
    ...state,
    events: [ ...state.events, action.payload]
  }
````
En `components/calendar/CalendarModal.js`
* Se importa la acci贸n `eventAddNew`.
````
import { eventAddNew } from '../../actions/events';
````
* En la funci贸n `handleSubmitForm` se agrega el dispatch del evento `eventAddNew`, que se le pasa un objeto, el cual es el contenido de estado del formulario, ademas de una id temporal y un `user`, esto proximamente estar谩 enlazado a un __backend__ que proporcionar谩 el user, entre otros elementos.
````
dispatch(eventAddNew({
  ...formValues,
  id: new Date().getTime(),
  user: {
    _id: '123',
    name: 'Diego'
  }
}))
````
----
### 10.- Mostrar eventos en el Calendario
En este punto se dese谩 mostrar los eventos que se agreguen por pantalla en el calendario.

Pasos a Seguir: 
* Se crar谩 un nuevo tipo para la limpieza del formulario activo.
* Se agrega un nuevo `case` en el reducer llamado `calendarReducer` que maneje la nueva opci贸n de limpieza.
* Se crea la acci贸n que ser谩 activada en el componente.
* En el componente __CalendarScreen__ se utiliza un CustomHook de React Redux para buscar el estado de `events` y pasarlo al __Calendar__ para que lo dibuje en el componente.
* En el componente __CalendarModal__ se implementa el __useEffect__ para obtener el estado activo. _(que fue seleccionado por el cliente)_

En `types/types.js`
* Se agrega un nuevo tipo.
````
eventClearActiveEvent: '[Event] Clear Active Event',
````
En `reducers/CalendarReducer.js`
* En este `case` se conserba el estado y ademas el estado de `activeEvent` se cambia a null.
````
case types.eventClearActiveEvent:
  return {
    ...state,
    activeEvent: null
  }
````
En `actions/events.js`
* Se crea la acci贸n que ser谩 activada por el componente __CalendarModal__.
````
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});
````
En `components/calendar/CalendarScreen.js`
* Se importa __useSelector__ de React Redux que permitir谩 realizar la busqueda del estado que necesita del Redux.
````
...
import { useDispatch, useSelector } from 'react-redux';
````
* Se toma el estado `events` que se encuentra en `state.calendar`.
  * Se elimino el `events` anterior que era un objeto con la informaci贸n inicial que se le pasaba al componente __Calendar__, ahora se le pasa el estado que proviene de Redux.
````
const { events } = useSelector( state => state.calendar );
````
En `components/calendar/CalendarModal.js`
* Se importan 2 elementos nuevos en el coponente, este seria useEffect de React y una nueva acci贸n `eventClearActiveEvent`.
````
...
import { useEffect, useState } from 'react';
import { eventAddNew, eventClearActiveEvent } from '../../actions/events';
````
* Creamos un valor inicial que se lo asignaremos al __useState__ que maneja el formulario del componente modal.
````
const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(), 
  end: oneMoreHours.toDate()
}
````
* Le asignamos el valor inicial al useState del formulario.
````
const [formValues, setFormValues] = useState( initEvent );
````
* Se implementa el useEffect, para controlar cuando el estado `activeEvent` cambia, para luego pasarlo al formulario.
* Realizamos una condici贸n de protecci贸n, en el caso que se pasen datos se pondra en el formulario.
````
useEffect(() => {
  
  if( activeEvent ){
    setFormValues( activeEvent );
  }

}, [activeEvent, setFormValues])
````
* En la funci贸n `closeModal` le agregamos un nuevo dispatch con el evento `eventClearActiveEvent` que har谩 que el estado `activeEvent` pase a null. _(Se hace en el caso que se vuelva a seleccionar el mismo evento de esta manera siempre pasarle los datos)_
````
const closeModal = () => {
  dispatch(uiCloseModal());
  dispatch( eventClearActiveEvent() );
  setFormValues( initEvent );
}
````
----
### 11.- Editar el evento activo
Se crear谩 un acci贸n para editar los eventos del calendario.

Pasos a Seguir: 
* Se agrar谩 un tipo mas para la actualizaci贸n.
* Se agrega un case al Reducer llamado `claendarReducer` con el nuevo tipo.
* Se implementa la acci贸n para realizar la edici贸n.
* En el componente __CalendarModal__ se implementa una condic贸n para detectar si el evento se va a editar o crear.

En `types/types.js`
* Se crea el tipo para la edici贸n. 
````
eventUpdated: '[Event] Event Updated',
````
En `reducers/calendarReducer.js`
* Se agrega la id al `events` que se entrega al estado inicial del reducer.
````
events: [{
        id: new Date().getTime(),
        ...
        }]
````
* Se crea el `case` del Reducer `calendarReducer`, se crea un `.map()` que realiza una condic贸n, en el caso que sea el mismo id que se mande por el payload, se realizar谩 la actualizac贸n al contenido, en el caso que no, no pasar谩 nada. 
````
case types.eventUpdated:
  return {
    ...state,
    events: state.events.map(
      e => ( e.id === action.payload.id ) 
        ? action.payload
        : e
    )
  }
````
En `actions/events.js`
* Se crea el evento sicrono, que recibe por parametro el `event` y este sera enviado por el payload.
````
export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});
````
En `components/calendar/CalendarModal`
* Una importaci贸n nueva de la acci贸n creada recientemente `eventUpdated`.
````
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';
````
* En la funci贸n `handleSubmitForm` se agrega algunas validaciones.
  * En el caso que se tenga `activeEvent` se disparar谩 la acci贸n `eventUpdated` enviando por argmento el `formValues`.
  * En el caso de tener null en  `activeEvent` se har谩 el disparo de la acci贸n `eventAddNew` que crear谩 un nuevo evento.
````
if ( activeEvent ){
      dispatch( eventUpdated( formValues ) );
      
    } else {
      dispatch( eventAddNew({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '123',
          name: 'Diego'
        }
      }) );
    }
````
----
### 12.- Eliminar Evento
Se crear谩 la funcionalidad de borrar un evento y la creaci贸n del componente que manejar谩 el bot贸n.

Pasos a Seguir:
* Crear el tipo para la eliminaci贸n.
* Se crea `case` del reducer llamado `calendarReducer` para manejar la eliminaci贸n.
* Se crea la acci贸n que ser谩 disparada por el componente que se crear谩.
* Se crea un componente nuevo llamado __DeleteEventFab__ que sera implementado en el componente __CalendarScreen__ para realizar la eliminaci贸n.
* Se realiza una limpieza del useState que maneja el formulario del componente __CalendarModal__.

En `types/types.js`
* Se mustra el nuevo tipo.
````
eventDeleted: '[Event] Event Deleted',
````
En `reducers/calendarioReducer.js`
* Se crea el nuevo `case` que realizar谩 un `.filter()` de la id que se le pase y mandando `activeEvent` en null.
````
case types.eventDeleted:
  return {
    ...state,
    events: state.events.filter(
      e => ( e.id !== state.activeEvent.id )
    ),
    activeEvent: null
  }
````
En `actions/events.js`
* Se crea la acci贸n que ser谩 disparada.
````
export const eventDeleted = () => ({
    type: types.eventDeleted
});
````
En `components/ui/DeleteEventFab.js`
* Se importa el __useDispatch__ de React Redux y la acci贸n `eventDeleted`.
````
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events';
````
* Se crea el componente __DeleteEventFab__.
* Se implementa el useDispatch.
* Se crea una funci贸n que disparar谩 la acci贸n `eventDeleted` para realizar la eliminaci贸n.
* Se retorna en el componente un bot贸n que tiene la funci贸n `handleDelete`.
````
export const DeleteEventFab = () => {
     
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch( eventDeleted() );
    }

   return (
     <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
     >
         <i className="fas fa-trash"></i>
         <span> Borrar Evento</span>
     </button>
   )
 }
````
En `styles.css`
* Se le agrega unos estilos al bot贸n del componente __DeleteEventFab__.
````
.fab-danger{
    bottom: 25px;
    padding: 10px;
    position: fixed;
    left: 25px;
}
````
En `components/calendar/CalendarScreen.js`
* Se imporetan dos elementos nuevos, la acci贸n para realizar la limpieza `eventClearActiveEvent` y el componente __DeleteEventFab__.
````
...
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { DeleteEventFab } from '../ui/DeleteEventFab';
````
* Se toma del __useSelector__ el estado llamado `activeEvent`.
````
const { events, activeEvent } = useSelector( state => state.calendar );
````
* Se agrega una funci贸n para que el bot贸n de eliminar desaparezca _(pasando `activeEvent` a null)_.
````
const onSelectSlot = (e) => {
  dispatch( eventClearActiveEvent() )
}
````
* Se agrega 2 propiedades adicionales en el componente __Calendar__ esto es `onSelectSlot` pasandole la funci贸n reci茅n creada, ademas de `selectable` en true.
````
<Calendar
  ...
  onSelectSlot={ onSelectSlot }
  selectable={ true }
  ...
/>
````
* En el caso que sea null `activeEvent` desaparecer谩 el bot贸n de eliminar.
````
{ 
  (activeEvent) && <DeleteEventFab />
}
````
En `components/calendar/CalendarModal.js`
* Se agrega un `else` en el __useEffect__ para que no cons茅rve el formulario cuando el elemento seleccionado sea eliminado. 
````
useEffect(() => {
  if( activeEvent ){
    setFormValues( activeEvent );
  } else {
    setFormValues( initEvent );
  }
  
}, [activeEvent, setFormValues])
````
* Se hace una condici贸n con `activeEvent` para mostrar el titulo de formulario.
````
<h1> { (activeEvent)? 'Editar evento' : 'Nuevo evento' } </h1>
````
----
# MERN Frontend - Auth con Backend
El segundo nivel de Frontend es para preparar la autenticaci贸n del frontend hacia el backend.

<img src="https://www.itsitio.com/wp-content/uploads/2019/10/1_NVwfSg8wHwFZ_R7ULgzdLQ-780x405.jpeg" alt="CRUD" width="320"/>

----
### 1.- Reducer de Auth
Se crear谩 el reducer de auteticaci贸n.

Paso a Seguir:
* Se crear谩 los archivos que manejen las variables de entorno.
* Se agregan tipos para manejar el nuevo reducer.
* Se crea el nuevo reducer en `reducers/authReducer.js`.
* El nuevo reducer se agrega en `reducers/rootReducer.js`

En `types/types.js`
* Se crea todo los tipos que se utilizaran para el manejo de los estados.
````
authCheckingFinish: '[Auth] Finish Checking Login State',
authStartLogin: '[Auth] Start Login',
authLogin: '[Auth] Login',
authStartRegister: '[Auth] Start Register',
authStartStartTokenRenew: '[Auth] Start Token Renew',
authLogout: '[Auth] Logout',
````
En `reducers/authReducer.js`
* Se crea el estado inicial, proximamente se utilizar谩 el `uid` y `name`.
````
const initialState = {
    checking: true,
    // uid: null,
    // name: null
}
````
* Se crea el reducer `authReducer`, pasandole el estado inicial al `state` que se tiene en las propiedades y el `action`.
````
export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
    
        default:
            return state;
    }
}
````
En `reducers/rootReducer.js`
* Se agrega el nuevo reducer.
````
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})
````
----
### 2.- Acci贸n de Login
En este punto se implementar谩 el uso del formulario de Login y se crear谩 la acci贸n que ser谩 disparada.

Paso a Seguir:
* Crear CustomHook __useForm__.
* Creaci贸n del archivo donde estar谩n las acciones de __Auth__.
* Implementar CustomHook y habilitar formulario de login en el componente __LoginScreen__.

En `hook/useForm.js`
* Se importa __useState__ para el uso del CustomHook.
````
import { useState } from 'react';
````
* Se crea el hook __useForm__ que recibir谩 por parametro un `initialState`.
* Utilizando el useState, le pasamos el estado inicial que se recibir谩 por parametros.
````
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);
    ...
}
````
* Se crea una funci贸n de reset, que cambiar谩 el estado a su estado inicial.
````
const reset = () => {
    setValues( initialState );
}
````
* Se crea la funci贸n `handleInputChange` que recibe por parametros el `target` esto har谩 que cambie el estado, dandole nuevos valores al inuput, en pocas palabras permitiendo que se pueda editar el contenido del input.
````
const handleInputChange = ({ target }) => {
    setValues({
        ...values,
        [ target.name ]: target.value
    });

}
````
* Se retorna un arreglo con las dos funciones, y el estado del useState.
````
return [ values, handleInputChange, reset ];
````
En `actions/auth.js`
* Creamos la primera acci贸n as铆ncrona `startLogin` que recibira el `email` y `password`.
* En el callback mandamos una impresi贸n por pantalla para evaluar lo que enviemos.
````
export const startLogin = ( email, password ) => {
    return async() => {
        console.log(email, password);
    }
}
````
* Importamos 3 nuevos elementos, useDisaptch para disparar las acciones, __useForm__ para utilizarlo en los formularios y `startLogin` que es la acci贸n.
````
import { useDispatch } from 'react-redux';
import { useForm } from '../../hook/useForm';
import { startLogin } from '../../actions/auth';
````
* Guardamos el __useDispatch__ en la constante.
* Implementamos el CustomHook __useForm__, luego desestructuramos los elementos del `formLoginValues`, para utilizarlo en el formulario.
````
const dispatch = useDispatch();

const [ formLoginValues, handleLoginInputChange ] = useForm({
  lEmail: 'correo@gmail.com',
  lPassword: '123456'
});

const { lEmail, lPassword } = formLoginValues;
````
* Se crea la funci贸n del formulario del login `handleLogin`, disparamos la acci贸n que mostramos anteriormente, mandandole los elementos del formulario.
````
const handleLogin = (e) => {
  e.preventDefault();

  dispatch(startLogin(lEmail, lPassword));
}
````
* En el formulario de login agregamos la funci贸n reci茅n mostrada `handleLogin`.
* Agregamos en los 2 input de `email` y `password` el `name`, `value` correspondiente y la funci贸n del CustomHook `handleLoginInputChange`.
````
 <form onSubmit={ handleLogin }>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='lEmail'
                value={ lEmail }
                onChange={ handleLoginInputChange }
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contrase帽a"
                name='lPassword'
                value={ lPassword }
                onChange={ handleLoginInputChange }
              />
            </div>
            <div className="form-group">
              <input
                ...
              />
            </div>
          </form>
````
----
### 3.- Petici贸n HTTP de Autenticaci贸n
En este punto se har谩 una funci贸n fetch para realizar el login sin token.

Paso a Seguir: 
* Crear helper que manejar谩 el fetch.
* Se implementa el nuevo case del reducer de auth.
* Se modifica la acci贸n `startLogin` y crear una nueva acci贸n sincrona.

En `helpers/fetch.js`
* Se almacena en una constante la variable global.
````
const baseURL = process.env.REACT_APP_API_URL;
````
* Creamos la funci贸n `fetchSinToken` que recibir谩 por parametro el `endpoint`, `data` y `method` que por defecto es un `GET`.
* Almacenamos en la constante `url` se almacenar谩 el contenido que se env铆e por el parametro.
* En el caso que se env铆e un metodo `GET` se retornar谩 el fetch con el `url`.
* En el caso que se mande un metodo diferente, se retornar谩 el `method`, en el `headers` se manda el `content` que sera tipo __JSON__, finalmente se manda el contenido del body. 
````
const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`; 

    if ( method === 'GET' ){
         return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}
````
* Se exporta la funci贸n `fetchSinToken`.
````
export {
    fetchSinToken
}
````
En `reducers/authReducer.js`
* Se agrega el nuevo `case`, retornamos el `state` y cambiamos el `checking` en false y el contenido de payload.
````
case types.authLogin:
return{
    ...state,
    checking: false,
    ...action.payload
}
````
En `actions/auth.js`
* Se importa la funci贸n del helper y los tipos.
````
import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
````
* En el callback recibimos por parametro `dispatch` gracias a thunk.
* En la funci贸n que creamos mandamos el endpoint, la data que esta `email` con `password` y el metodo POST.
* Luego tomamos lo que venga en el fecth para almacenarlo en la constante `body`.
* Realizamos una validaci贸n con el `body.ok`, en el caso q sea true se guardar谩 el token en __localStorage__ con la fecha de creaci贸n.
* Se dispar谩 la acci贸n de login.
````
export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        }
    }
}
````
* Se crea la acci贸n sincrona de login, recibiendo el user, para luego mandarlo por el payload.
````
const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})
````
----
### 4.- Implementaci贸n de Register
Se implementa la acci贸n para realizar el registro en la aplciaci贸n Backend.

Pasos a Seguir: 
* Se crera la acci贸n as铆ncrona `startRegister` para realizar el registro en el Backend.
* Se adapta el formulario de register para tomar los datos y disparar la acci贸n `startRegister`.

En `actions/auth.js`
* Se importa __SweetAlert__ para implementarla en los errores que env铆a el backend.
````
import Swal from 'sweetalert2';
````
* Se crea la acci贸n as铆ncrona `startRegister` que recibir谩 por parametro `email`, `password` y `name`.
* Implementamos el callback que recibe por parametros gracias a __Thunk__ el dispatch.
* Guardamos en la constante `resp` lo que venga en la funci贸n `fetchSinToken`, que le pasamos por argumento el endpoint, la data que seria `email`, `password` y `name` y finalmente le pasamos el metodo `POST`, ya que ser谩 un registro de usuario.
* Almacenamos en una variable llamada `body` el contenido que venga en `resp.json()`.
* Relizamos una condci贸n, si `body.ok` es true, se guardar谩 el token que venga del backend en el __localStorage__ al igual que la fecha que se creo.
* Finalmente disparamos la acci贸n `login()` pasandole por argumento el `uid` y `name`.
* En el caso que venga un `body.ok` en false, saltara un error con el mensaje emitido desde el backend.
````
export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if ( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}
````
En `components/auth/LoginScreen.js`
* Importamos 2 nuevos elementos, la acci贸n `startRegister` y SweetAlert.
````
...
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';
````
* Utilizamos nuevamente el CustomHook __useForm__, pasandole elementos que se utilizar谩n.
* Luego lo desestructuramos del estado `formRegisterValues`, para utilizarlos en el formulario.
````
const [ formRegisterValues, handleRegisterInputChange ] = useForm({
  rName: 'Diego',
  rEmail: 'diego@gmail.com',
  rPassword: '123456',
  rPassword2: '123456'
});

const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;
````
* Creamos la funci贸n del formulario register `handleRegister`.
* Creamos una validaci贸n, que el password y el password de confirmar sean iguales, en el caso que no saltar谩 un alerta.
* Finalmente si todo sale bien, se dispar谩 la acci贸n `startRegister` pasandole por argumento el `email`, `password` y `name` del formulario register.
````
const handleRegister = (e) => {
  e.preventDefault();

  if ( rPassword !== rPassword2 ){
    return Swal.fire('Error', 'Las contrase帽as deben de ser iguales', 'error');
  }
  
  dispatch(startRegister(rEmail, rPassword, rName));
}
````
* Le agregamos al formulario la funci贸n `handleRegister`.
* En los 4 input agregamos el `name`, `value` y `onChange` correspondiente. _(Todos los input con onChange del formulario register usan `handleRegisterInputChange`)_
````
<form onSubmit={ handleRegister }>
  <div className="form-group">
    <input
      type="text"
      className="form-control"
      placeholder="Nombre"
      name="rName"
      value={ rName }
      onChange={ handleRegisterInputChange }
    />
    ...
  </div>
</form>
````
----
### 5.- Mantener Estado del Auth
En este punto se crear谩 una nueva funci贸n que interactuar谩 con el backend para renovar el token, esto servir谩 al momento de recargar la pagina.

Pasos a Seguir:
* Crear funci贸n en los helpers `fetchConToken`.
* Crear un nuevo case en el reducer `authReducer`.
* Crear 2 acciones una as铆ncrona y otra sincrona.
* Activamos la acci贸n as铆ncrona en la ruta __AppRouter__ para tener un mayor nivel de acceso en la aplicaci贸n.

En `helpers/fetch.js`
* Creamos la funci贸n `fetchConToken` muy similar a la anterior, recibiendo por parametros `endpoint`, `data` y `method`.
* En la constante `url` se almacenar谩 el path, y en la constante token, se tomar谩 el contenido del __localStorage__ con `.getItem()`.
* Realizamos una condici贸n en el caso que el `method` sea GET, se enviar谩 el method GET y el token que se tiene en el __localStorage__.
* En el caso ser otro `method`, se enviar谩 este, en el header se envia el Content y el token, ademas del contenido en de `data`.
````
const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ){
         return fetch( url, {
             method,
             headers: {
                 'x-token': token
             }
         });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}
````
En `reducers/authReducer.js`
* Se crea el nuevo case, enviado un `checking` en false.
````
case types.authCheckingFinish:
  return {
      ...state,
      checking: false
  }
````
En `actions/auth.js`
* Se crea la acci贸n `startChecking`, que retorna un callback as铆ncrono que recib谩 el dispatch.
* Enviado en la funci贸n helper `fetchConToken` el endpoint `auth/renew`, recibiendo la respuesta en la constante `body`.
* En el caso que haya un `body.ok` en true, entrar谩 a la condici贸n el cual es guardar el token en el __localStorage__ con la fecha y disparar la acci贸n `login` con el `uid` y `name``.
* En el caso que sea `body.ok` en false, se enviar谩 una impresi贸n por pantalla con el error del backend y disparando la acci贸n `checkingFinish()`.
````
export const startChecking = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if ( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } else {
            console.log(body.msg)
            dispatch( checkingFinish() );
        }
    }
}
````
* Creamos la acci贸n sincrona `checkingFinish` que ser谩 disparada por la acci贸n anteriormentes creada.
````
const checkingFinish = () => ({
    type: types.authCheckingFinish
});
````
En `router/AppRouter.js`
* Se importan dos elementos nuevos el __useEffect__ hook de React y __useDispatch__ custom hook de React Redux.
````
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
...
````
* Se implementa el __useDispatch__.
* Se agrega el useEffect que ser谩 renderizado cada vez que se inicie la aplicaci贸n o cuando dispatch camibe ya que es su dependencia.
* Este disparar谩 la acci贸n as铆ncrona `startChecking`.
````
const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch( startChecking() );
      
  }, [dispatch])
````
----
### 6.- Protecci贸n de Rutas
En este punto se agregar谩 rutas privadas y publicas para realizar la protecci贸n de los componentes.

Pasos a Seguir:
* Se copia e implementa la ruta Publica __[PublicRoute](https://github.com/Paserno/react-redux-fst-app/blob/main/src/routers/PublicRoute.js)__.
* Se copia e implementa la ruta Privada __[PrivateRoute](https://github.com/Paserno/react-redux-fst-app/blob/main/src/routers/PrivateRoute.js)__.
* En la ruta __AppRouter__ se implementa ambas rutas para realizar la protecci贸n de los componentes.

En `router/PrivateRouter.js`
* Se corrige el path de la ruta privada.
````
(isAuthenticated)
  ? (<Component {...props} />)
  : (<Redirect to="/login" />)
````
En `router/AppRouter.js`
* Se importan 3 elementos nuevos useSelector, la ruta publica y privada.
````
import { useDispatch, useSelector } from 'react-redux';
...
import { PrivateRoute } from './PrivateRouter';
import { PublicRoute } from './PublicRouter';
````
* Sacamos del estado global de la aplicaci贸n con ayuda de __useSelector__ el `checking` y `uid`.
````
const { checking, uid } = useSelector(state => state.auth)
````
* Realizamos una condici贸n, cada vez que `checking` este en true, saldra `Cargando...`, esto proximamente se puede remplazar con un componente de carga mas estilizado.
````
if ( checking ){
    return (<h5>Cargando...</h5>);
  }
````
* En el `<Switch>` se implementa las dos rutas, agregando el `isAuthenticated` con `!!uid`, con la doble negaci贸n hacemos q si viene algo se transforme en _false_ y luego con la segunda negaci贸n pase a _true_.
````
<PublicRoute 
  exact path="/login"
  component={ LoginScreen }
  isAuthenticated={ !!uid }
/>
<PrivateRoute 
  exact path="/" 
  component={ CalendarScreen } 
  isAuthenticated={ !!uid }
/>
````
----
### 7.- Logout
Se crear谩 el reducer de logout y agregarlo al bot贸n.

Pasos a Seguir: 
* Se crea el case del logout en el Reducer de auth.
* Se crea 2 acci贸nes una as铆ncrona y otra sincrona.
* Se establece el logout en el bot贸n del componente __Navbar__.

En `reducer/authReducer.js`
* Se crea el case del logout, en este caso no devolver谩 el estado si no que el `checking` en false.
````
case types.authLogout:
  return {
      checking: false
  }
````
* Se crea la acci贸n as铆ncrona retornando un callback.
* Se limpla el `localStorage` y se dispar谩 una acci贸n que proximamente se mostrar谩 de logout.
````
export const startLogout = () => {
    return ( dispatch ) => {驴
        localStorage.clear();
        dispatch( logout() );
    }
}
````
* Se crea la acci贸n `logout` que es dispar谩da en la acci贸n as铆ncrona.
````
const logout = () => ({
    type: types.authLogout
});
````
En `components/ui/Navbar.js`
* Se importa 3 nuevos elementos 2 CustomHook de React Redux y la acci贸n `startLogout`.
````
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
````
* Se busca el estado que esta en Redux `name` para proximamente mostrar el nombre del usuario.
* Se implementa el useDispatch.
* Se crea la funci贸n `handleLogout` que dispara la acci贸n as铆ncrona `startLogout`.
````
const { name } = useSelector(state => state.auth);
const dispatch = useDispatch();

const handleLogout = () => {    
  dispatch( startLogout() );
}
````
* Se agrega el nombre del usuario que se busco en el estado global.
````
<span className="navbar-brand">
  {name}
</span>
````
* Se implementa la funci贸n reci茅n creada `handleLogout`.
````
<button 
  className="btn btn-outline-danger"
  onClick={ handleLogout }
>
````
----
# MERN Frontend - CRUD Eventos con Backend
En este nivel se realizar谩 la integraci贸n de los eventos con el backend, para tener la informaci贸n persistente.

<img src="https://916256.smushcdn.com/2265571/wp-content/uploads/2019/02/0_th2x89zHuZmHGsLJ.png?lossy=1&strip=1&webp=1" alt="CRUD" width="320"/>

----
### 1.- Creaci贸n de evento hacia el backend
En este punto se crear谩 la acci贸n que permita realizar la creaci贸n de eventos hacia el backend, para proximamente mostrarlo.

Pasos a Seguir:
* Crear un nuevo tipo.
* Modificar acci贸n sincrona y crear una nueva acci贸n as铆ncrona.
* Modificar componente CalendarModal.

En `types/types.js`
* Se crea un nuevo tipo.
````
eventStartAddNew: '[Event] Start Add New',
````
En `actions/events.js`
* Se importa la funci贸n del helper `fetchConToken`.
````
import { fetchConToken } from "../helpers/fetch";
````
* Se crea la nueva acci贸n as铆ncrona que recibe por par谩metro `event`.
* Se retorna un callback, gracias a Thunk se puede recibir `dispatch` y `getState`.
* Con el `getState()` se puede buscar elementos en el estado de la aplciaci贸n, en este caso desestructuramos `uid` y `name`.
* Encerramos el contenido en un __TryCatch__ para controlar el error.
* Mandamos en la funci贸n `fetchConToken` el `events` que es el endpoint, event que es el contenido que ser谩 recibido en las propiedades y metodo __POST__.
* Almacenamos el contenido que recibimos en la constante `body`.
* Realizamos una condici贸n, si el `body.ok` es true, se envia el id, y el user por el `event`.
* Mandamos en la acci贸n `eventAddNew` el contenido del `event`.
* En el caso de recibir algun error se imprimir谩 por consola.

````
export const eventStartAddNew = (event) => {
    return async( dispatch, getState ) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if ( body.ok ){
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                };

                dispatch( eventAddNew(event) )
            }

        } catch (error) {
            console.log(error);
        }   
    }
}
````
* Esta funci贸n le quitamos el `export` ya que se manejar谩 localmente.
````
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
````
En ``
* Remplazamos la importaci贸n de `eventAddNew` por la nueva `eventStartAddNew`.
````
import { eventClearActiveEvent, eventStartAddNew, eventUpdated } from '../../actions/events';
````
* En la funci贸n `handleSubmitForm` el ultimo else, se remplaza el contenido que se iba a mandar por la nueva acci贸n `eventStartAddNew` que se le pasa por argumento solamente el estado del formulario.
````
dispatch( eventStartAddNew(formValues) );
````
----
### 2.- Mostrar Evento desde el Backend
En este punto se mostrar谩 recibiremos el contenido que es enviado desde el backend para proximamente mostrarlo.

Pasos a Seguir: 
* Se crea un tipo nuevo.
* Se modifica el reducer, para luego implementar un nuevo case.
* Se crean 2 nuevas acci贸nes en `actions/events` la primera as铆ncrona y otra sincrona que se manejar谩 local.
* Finalmente se crear谩 un useEffect en el componente __CalendarScreem__ para cuando se cargue el componente se muestre proximamente todos los eventos por pantalla.

En `types/types.js`
* Se crea el nuevo tipo de carga de eventos.
````
...
eventLoaded: '[Event] Event Loaded',
````
* El valor inicial del state, espec铆ficamente `events` se eliminar谩 todo el contenido que ten铆a.
````
const initialState = {
    events: [],
    activeEvent: null
};
````
* Se crea el nuevo case donde se retornar谩 el state, ademas de un arreglo de lo que se env铆e por el `aciton.payload`.
````
case types.eventLoaded:
    return {
      ...state,
      events: [ ...action.payload ]
    }
````
En `actions/events.js`
* Se crea la acci贸n `eventStartLoading` as铆ncrona, retornamos un callback que tiene por propiedad el `dispatch` y encerramos el contenido de este con un `TryCatch`.
* Se usa la funci贸n `fetchConToken` enviandole el endpoint `events` por defecto es un GET la petici贸n fetch.
* Recibimos el contenido del backend en la constante body.
* Del body.eventos se lo pasamos a una constante pera luego enviarselo al dispatch, por mientras que no se soluciona lo de la fecha se imprimir谩 por consola solamente.
* En el caso de un error se manda una impresi贸n por consola.
````
export const eventStartLoading = () => {
    return async( dispatch ) => {
        try {
            
            const resp = await fetchConToken( 'events' );
            const body = await resp.json();
            
            const events = body.eventos;

            console.log(events);
            // dispatch( eventLoaded(events) );

        } catch (error) {
            console.log(error);
        }
        
    }
}
````
* Se crea la acci贸n sincrona `eventLoaded` que recibe por parametros `events`, para luego enviarlo por el payload.
````
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})
````
En `components/calendar/CalendarScreen.js`
* Importamos __useEffect__ en el componente y la acci贸n `eventStartLoading`.
````
import { useEffect, useState } from 'react';
...
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
````
* Se implementa el __useEffect__ disparando la acci贸n `eventStartLoading`.
````
useEffect(() => {
  dispatch(eventStartLoading())
  
}, [dispatch])
````
----
### 3.- Transformar las fechas de String a Date
En este punto se har谩 el cambio de las fechas que se obtienen como String y para mostrarlo en el componente es necesario tenerlo modo __Date__.

Pasos a Seguir:
* Se crea un nuevo helper que har谩 la transformaci贸n de String a tipo Date.
* Se agregar谩 la nueva funci贸n del helper en la acci贸n `eventStartLoading`.
* Se usa CustomHook useSelector para realizar una modificaci贸n en los colores de los eventos.

En `helpers/prepareEvent.js`
* Se importa moment para que nos ayude con la transformaci贸n de las fechas.
````
import moment from 'moment';
````
* Se crea el helper `prepareEvents` que recibe por par谩metro el `events` y por defecto se env铆a arreglo vac铆o.
* Se retorna un `.map()` que utilizando __moment__ se transformar谩 de String a Date las fechas de `start` y `end`.
````
export const prepareEvents = ( events = []) => {
    return events.map(
        (e) => ({
            ...e,
            start: moment( e.start ).toDate(),
            end: moment( e.end ).toDate(),
        })
    );
}
````
En `actions/events.js`
* Se importa el helper `prepareEvents`.
````
...
import { prepareEvents } from "../helpers/prepareEvent";
````
* En la acci贸n as铆ncrona `eventStartLoading`, utilizamos la funci贸n del helper `prepareEvents` pasandole por argumento lo que hay en `body.eventos`.
* Para luego disparar la acci贸n `eventLoaded` con lo que recibio `events` con las fechas tipo Date.
````
const events = prepareEvents(body.eventos);

dispatch( eventLoaded(events) );
````
En `components/calendar/CalendarScreen.js`
* Se utiliza __useSelector__ para buscar el id del usuario que viene en auth.
````
const { uid } = useSelector( state => state.auth );
````
* En la funci贸n `eventStyleGetter` verificamos si el uid que se tiene en el estado global es el mismo que el que creeo el evento `event.user._id`, en el caso que si se pondr谩 un color celeste, en el caso que sea diferente los ids, sera de color morado el evento.
````
const style = {
  backgroundColor: ( uid === event.user._id ) ? '#367CF7' :  '#9E24FA',
  borderRadius: '0px',
  opacity: 0.8,
  display: 'block',
  color: 'white'
}
````
----
### 4.- Actualizar Evento en Backend
En este punto se habilitar谩 la edici贸n de un evento.

Pasos a Seguir: 
* Creamos una nueva acci贸n as铆ncrona `eventStartUpdated` para realizar la actualizaci贸n hacia el backend.
* Se remplaza la acci贸n `eventUpdated` por la nueva `eventStartUpdated`.

En `actions/events.js`
* Se crea la acci贸n `eventStartUpdated` as铆ncrona, que recibe por par谩metro el `event`.
* En la funci贸n `fetchConToken` mandamos el path con el id que se recibir谩 del `event`, ademas de mandar el contenido y el metodo PUT.
* Luego realizamos una validaci贸n, en el caso que sea true `body.ok` se disparar谩 `eventUpdated` con el contenido del evento.
* En el caso que sea false se enviar谩 un alerta con el mensaje del backend.
````
export const eventStartUpdated = ( event ) => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken(`events/${ event.id }` , event ,'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch(eventUpdated( event ));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}
````
En ``
* Se remplaza `eventUpdated` por `eventStartUpdated`.
````
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdated } from '../../actions/events';
````
* Se remplaza `eventUpdated` por `eventStartUpdated` para disparar la acci贸n as铆ncrona mandandole por el estado del formulario.
````
dispatch( eventStartUpdated( formValues ) );
````
----
### 5.- Eliminar Evento
En este punto se crea una acci贸n as铆ncrona que eliminar谩 los eventos, ademas se realiza un tipo que limpie los estados al hacer logout.

Pasos a Seguir: 
* Se crea un tipo nuevo para realizar la limpieza de los estados.
* Se crea un nuevo case en el reducer de calendario.
* Se crean 2 nuevos acci贸nes, uno as铆ncrono y sincrono, ademas de modificar otra acci贸n.
* Se implementa la acci贸n de limpieza sincrona en la acci贸n as铆ncrona de logout.
* Se implementa la acci贸n as铆ncrona en el bot贸n de borrar evento, esto esta en el compoonente __DeleteEventFab__.

En `types/types.js`
* Se crea el tipo para realizar la limpieza de los eventos.
````
eventLogout: '[Event] Event Logout',
````
En `reducers/calendarReducer.js`
* Se crea el case que cambiar谩 el estado al `initialState` cuando se haga el logout.
````
case types.eventLogout:
  return {
    ...initialState
  }
````
En `actions/events.js`
* Se crea la acci贸n as铆ncrona `eventStartDeleted` que retorna un callback que tiene como par谩metro el `dispatch` y `getState` gracias a Thunk Redux.
* Obtenemos un estado global la cual es `calendar.activeEvent` espec铆ficamente el id.
* Luego implementamos la funci贸n `fetchConToken` enviado por argumento el path con el id recibido del estado global, un objeto vac铆o y el metodo DETELE, para luego recibir el contenido de la respuesta en la constante `body`.
* En el caso que `body.ok` sea true, se disparar谩 la acci贸n sincrona `eventDeleted`.
* En el caso de tener un false, se mandar谩 una alerta con el error recibido por el backend.
````
export const eventStartDeleted = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent
        try {
            const resp = await fetchConToken(`events/${ id }` , {} ,'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error);
        }
    }
}
````
* Se elimina el `export` de la funci贸n, ya que se usar谩 localmente.
````
const eventDeleted = () => ({
    type: types.eventDeleted
});
````
* Se crea la acci贸n que si se dispara limpiar谩 el estado de los eventos.
````
export const eventLogout = () => ({
    type: types.eventLogout
});
````
En `actions/auth.js`
* En la acci贸n as铆ncrona se dispara la acci贸n `eventLogout` que limpiara los eventos cuando se haga el logout. _(No olviar importar la acci贸n)_
````
export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
    }
}
````
En `components/ui/DeleteEventFab.js`
* Se remplaza la importaci贸n de la acci贸n sincrona `eventDeleted` por la nueva acci贸n as铆ncrona `eventStartDeleted`.
````
import { eventStartDeleted } from '../../actions/events';
````
* En la funci贸n `handleDelete` se dispara la nueva acci贸n `eventStartDeleted` as铆ncrona.
````
dispatch( eventStartDeleted() );
````
----