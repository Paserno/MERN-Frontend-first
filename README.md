> __Elemento Anterior 👀:__ __[App de React con SASS - Redux - Firebase](https://github.com/Paserno/react-redux-fst-app)__
# First MERN - Frontend
Primera app MERN ( Mongo - Express - __React__ - Node.js) utilizando las bases aprendidas para la implementación de todos estos elementos en conjuto, este repositorio será la parte del Fronend.

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

Recordar que si se desea ejecutar esta aplicación, deben de reconstruir los módulos de node así:
````
npm install
````
Y luego para hacerla correr.
````
npm start
````
<br>


> __Elemento Posterior 👀:__ __[First MERN - Backend](https://github.com/Paserno/MERN-Backend-first)__

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
* Se agregan dos __useState__ para entregarle la hora actual y poder manejar las horas en el input que se mostrará a continuación.
````
const [dateStart, setDateStart] = useState( now.toDate() );
const [dateEnd, setDateEnd] = useState( oneMoreHours.toDate() );
````
* Se crean dos funciones que hará que se pueda cambiar el estado del __useState__ de `dateStart` y `dateEnd`.
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
      placeholder="Título del evento"
      name="title"
      autoComplete="off"
    />
    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
  </div>

  <div className="form-group">
    <textarea
      type="text"
      className="form-control"
      placeholder="Notas"
      rows="5"
      name="notes"
    ></textarea>
    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
* Los primeros puntos suspensivos ira el contenido de __DateTimePicker__ le agregamos que función hará su cambio, su useState, el formato que se mostrará la fecha e hora y su clase.  
````
<DateTimePicker 
  onChange={ handleStartDateChange } 
  value={ dateStart } 
  format="dd-MM-y h:mm a"
  amPmAriaLabel="Select AM/PM"
  className="form-control"
/>
````
* Agregamos todo igual al punto anterior, pero adicionalmente se usa `minDate` que es propio de __DateTimePicker__, esto hará que nunca se tenga una hora inferior a su dependencia en este caso el useState `dateStart`.
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
### 6.- Obtener Información del Formulario Modal
Almacenar el estado del formulario completo para luego enviarlo.

Pasos a Seguir:
* Crear un nuevo useState que almacene el estado de todo el componente modal.
  * Crear la función que maneje los input de notas y titulo.
  * Adaptar las dos funciónes que ya se tenía `handleStartDateChange` y `handleFinishDateChange` para entregar el estado al nuevo useState.

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
* Creamos la función que permitirá el camibo en los input's.
````
const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }
````
* Agregamos en las dos funciones `handleStartDateChange` y `handleFinishDateChange` el `setFormValues` que permitirá entregar los cambios al useState.
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
* Creamos la función Submit del formulario, que se tendra la información de todo el formulario.
````
const handleSubmitForm = (e) => {
  e.preventDefault();

  console.log( formValues );
}
````
* Se agrega la función en el `<form>`
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
  placeholder="Título del evento"
  name="title"
  autoComplete="off"
  value={ title }
  onChange={ handleInputChange }
/>
````
----
### 6,5.- Validación de Formulario Modal
En este punto se agregaran unas valicaciones en el componente modal.

Pasos a Seguir: 
* Instalar __[Sweet Alert 2](https://www.npmjs.com/package/sweetalert2)__ para mostrar errores.
* Agregar validaciónes en la función Sumbit del formulario.

En `components/calendar/CalendarModal.js`
* Una vez instalado Sweet Alert se importará.
````
import Swal from 'sweetalert2';
````
* Se agrega un estado para realizar la validación del titulo.
* Adicionalmente desestructuramos 2 elementos mas, `start` y `end`.
````
const [titleValid, setTitleValid] = useState(true);

const { notes, title, start, end } = formValues;
````
* Agregamos en la función Submit diferentes elementos.
  * Creamos instancias de moment con los estados `start` y `end`.
  * Realizamos la primera validación usando `isSameOrAfter` que este es propio de __moment__, que hace la comparación entre las dos constantes creadas, en el caso que sea menor o igual `momentEnd` entrará a la condición y saltando una alerta de __Sweet Alert__.
  * Creamos una validación que si el `title` es menor a 2 caracteres, entrará a la condicón.
  * Finalmente si pasa todo las condiciones se mandará un `true` en la validación del titulo y se llamará a la fucnión que cerrará el formulario modal.
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
* Agregamos una condición en `className` si el valor de useState del titulo es `false` se activará un elemento de bootstrap que mostrará el input del titulo en rojo advirtiendo al usuario que necesita mas caracteres el titulo.
````
<input
  type="text"
  className={`form-control ${ !titleValid && 'is-invalid'}`}
  placeholder="Título del evento"
  name="title"
  autoComplete="off"
  value={ title }
  onChange={ handleInputChange }
/>
````
----
### 7.- Configuración Redux
En este punto se hará la instalación de Redux, React Redux y Redux Thunk, para la configuración.

Pasos a Seguir:
* Crear los tipos que estará centralizada para el uso del reducer y acitons.
* Crear el primer reducer llamado `uiReducer` en `reducers/uiReducer.js`.
* Crear una raíz de Reducer donde se centralizará todos los reducer que se creen para pasarlo a la configuración.
* Crear el store con la configuración necesaria para Redux.

En `types/types.js`
* Se crea los primeros tipos que se usarán.
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
* Se crea el __switch__ del reducer con su primer case que cambiará el estado inicial y el defalut que devolverá el estado.
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
* Se asigna el reducer al `combineReducers`, en este punto se agregarán todos los reducer que se creen en la aplicación. 
````
export const rootReducer = combineReducers({
    ui: uiReducer,
})
````
En `store/store.js`
* En el store se hará la configuración, agregando importaciones de Redux, thunk que permitirá el uso de actions que interactuen con `dispatch` y `getState` y el combinador de reducer `rootReducer`.
````
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';
````
* Se agrega la configuración para utilizar la herramienta __Redux DevTools__.
````
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
````
* Se crea el store, pasandole el combinador de reducer, y usando el middleware thunk con ayuda de la configuración de Redux DevTools.
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
En este punto se hará el uso de los estados de Redux para mostrar y ocultar el componente que tiene el formulario modular.

Paso a Seguir:
* Agregar un nuevo case en `uiReducer`.
* Crear acciones que seran disparados.
* Implementar el useDispatch y useSelect de React Redux en el componente __CalendarScreen__ y __CalendarModal__.

En `reducers/uiReducer.js`
* Se agrega la opción de cambiar el estado de `modalOpen` que servirá para cerrar el componente __CalendarModal__.
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
* Creamos dos acciones sincrona que serán disparados en los componentes.
````
export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

export const uiCloseModal = () => ({
    type: types.uiCloseModal
});
````
En `components/calendar/CalendarScreen.js`
* Se importa el CustomHook de __React Redux__ y  la acción que se usará.
````
import { useDispatch } from 'react-redux';
...
import { uiOpenModal } from '../../actions/ui';
````
* Implementamos el `useDispatch`
````
const dispatch = useDispatch();
````
* Se agrega en la función de doble clic el dispatch que activa la acción que abra la pantalla modal. (cambiando el estado de `modalOpen` en `true`)
````
const onDobleClick = (e) => {
    dispatch(uiOpenModal())
    console.log(e);
  }
````
En `components/calendar/CalendarModal.js`
* Se importan 2 nuevos CustomHook de __React Redux__ el useDispatch, useSelector y se importa la acción `uiCloseModal`.
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
* Se implementa el dispatch en la función `closeModal` que se usa la acción `uiCloseModal` que cambiará el estado de `modalOpen` a `false`.
````
const closeModal = () => {
    dispatch(uiCloseModal());
  }
````
* Se agrega el estado que se obtuvo de Redux para pasarlo a `isOpen` en el caso que sea `flase` se cerrará y en el contrario se abrira el componente.
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
Se creará un nuevo reducer para el manejo de algunos eventos en el calendario.

Pasos a Seguir:
* Se agrega 2 tipos que se usará en la acciones y el reducer.
* Se crea un nuevo Reducer llamado `calendarReducer`.
* Se agrega el nuevo reducer en `rootReducer`.
* Crear nueva acción que serán disparados.
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
* Se crea un objeto que manejará el estado inicial del reducer, pasandole un evento creado anteriormenete a `events` y creamos `activeEvent` en `null`.
````
const initialState = {
    events: [{
        title: 'Cumpleaños',
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
* Creamos el __switch__ con la primera acción que recibira el payload en `activeEvent` y un default que retorna el `state`.
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
* Se importa el CustomHook de __React Redux__ y la acción `uiOpenModal`.
* Se crea el nuevo componente __AddNewFeb__.
````
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => { ... }
````
* Se intancia el useDispatch.
* Se crea una función para el botón, que cambia el estado del Redux, para mostrar la componente modal.
````
const dispatch = useDispatch()

const hancleClickNew = () => {
    dispatch(uiOpenModal());
}
````
* Se crea un botón con el icono `fa-plus`, le asignamos al botón en el evento de click la función que abrirá el componente modal.
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
* Se agregan algunos estilos para el nuevo componente específicamente en el botón.
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
* Se importa 2 nuevos elementos la acción creada y el componente __AddNewFab__.
````
...
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
````
* Se agrega el dispatch de la acción `eventSetActive` en la función select, esto hara que se le envie al Redux el estado que se tiene en el formulario _"se active"_.
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
### 9,5.- Añadir un Evento al Redux
Se agrega una funcionalidad adicional al botón de guardar del componente modal, este hará que se guarde en un estado global el contenido del formulario.

Pasos a Seguir:
* Implementar nuevo case en `calendarReducer`.
* Implementar dispatch al botón guardar del componente __CalendarModal__.

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
* Se importa la acción `eventAddNew`.
````
import { eventAddNew } from '../../actions/events';
````
* En la función `handleSubmitForm` se agrega el dispatch del evento `eventAddNew`, que se le pasa un objeto, el cual es el contenido de estado del formulario, ademas de una id temporal y un `user`, esto proximamente estará enlazado a un __backend__ que proporcionará el user, entre otros elementos.
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
En este punto se deseá mostrar los eventos que se agreguen por pantalla en el calendario.

Pasos a Seguir: 
* Se crará un nuevo tipo para la limpieza del formulario activo.
* Se agrega un nuevo `case` en el reducer llamado `calendarReducer` que maneje la nueva opción de limpieza.
* Se crea la acción que será activada en el componente.
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
* Se crea la acción que será activada por el componente __CalendarModal__.
````
export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});
````
En `components/calendar/CalendarScreen.js`
* Se importa __useSelector__ de React Redux que permitirá realizar la busqueda del estado que necesita del Redux.
````
...
import { useDispatch, useSelector } from 'react-redux';
````
* Se toma el estado `events` que se encuentra en `state.calendar`.
  * Se elimino el `events` anterior que era un objeto con la información inicial que se le pasaba al componente __Calendar__, ahora se le pasa el estado que proviene de Redux.
````
const { events } = useSelector( state => state.calendar );
````
En `components/calendar/CalendarModal.js`
* Se importan 2 elementos nuevos en el coponente, este seria useEffect de React y una nueva acción `eventClearActiveEvent`.
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
* Realizamos una condición de protección, en el caso que se pasen datos se pondra en el formulario.
````
useEffect(() => {
  
  if( activeEvent ){
    setFormValues( activeEvent );
  }

}, [activeEvent, setFormValues])
````
* En la función `closeModal` le agregamos un nuevo dispatch con el evento `eventClearActiveEvent` que hará que el estado `activeEvent` pase a null. _(Se hace en el caso que se vuelva a seleccionar el mismo evento de esta manera siempre pasarle los datos)_
````
const closeModal = () => {
  dispatch(uiCloseModal());
  dispatch( eventClearActiveEvent() );
  setFormValues( initEvent );
}
````
----
### 11.- Editar el evento activo
Se creará un acción para editar los eventos del calendario.

Pasos a Seguir: 
* Se agrará un tipo mas para la actualización.
* Se agrega un case al Reducer llamado `claendarReducer` con el nuevo tipo.
* Se implementa la acción para realizar la edición.
* En el componente __CalendarModal__ se implementa una condicón para detectar si el evento se va a editar o crear.

En `types/types.js`
* Se crea el tipo para la edición. 
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
* Se crea el `case` del Reducer `calendarReducer`, se crea un `.map()` que realiza una condicón, en el caso que sea el mismo id que se mande por el payload, se realizará la actualizacón al contenido, en el caso que no, no pasará nada. 
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
* Una importación nueva de la acción creada recientemente `eventUpdated`.
````
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';
````
* En la función `handleSubmitForm` se agrega algunas validaciones.
  * En el caso que se tenga `activeEvent` se disparará la acción `eventUpdated` enviando por argmento el `formValues`.
  * En el caso de tener null en  `activeEvent` se hará el disparo de la acción `eventAddNew` que creará un nuevo evento.
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
Se creará la funcionalidad de borrar un evento y la creación del componente que manejará el botón.

Pasos a Seguir:
* Crear el tipo para la eliminación.
* Se crea `case` del reducer llamado `calendarReducer` para manejar la eliminación.
* Se crea la acción que será disparada por el componente que se creará.
* Se crea un componente nuevo llamado __DeleteEventFab__ que sera implementado en el componente __CalendarScreen__ para realizar la eliminación.
* Se realiza una limpieza del useState que maneja el formulario del componente __CalendarModal__.

En `types/types.js`
* Se mustra el nuevo tipo.
````
eventDeleted: '[Event] Event Deleted',
````
En `reducers/calendarioReducer.js`
* Se crea el nuevo `case` que realizará un `.filter()` de la id que se le pase y mandando `activeEvent` en null.
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
* Se crea la acción que será disparada.
````
export const eventDeleted = () => ({
    type: types.eventDeleted
});
````
En `components/ui/DeleteEventFab.js`
* Se importa el __useDispatch__ de React Redux y la acción `eventDeleted`.
````
import { useDispatch } from 'react-redux'
import { eventDeleted } from '../../actions/events';
````
* Se crea el componente __DeleteEventFab__.
* Se implementa el useDispatch.
* Se crea una función que disparará la acción `eventDeleted` para realizar la eliminación.
* Se retorna en el componente un botón que tiene la función `handleDelete`.
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
* Se le agrega unos estilos al botón del componente __DeleteEventFab__.
````
.fab-danger{
    bottom: 25px;
    padding: 10px;
    position: fixed;
    left: 25px;
}
````
En `components/calendar/CalendarScreen.js`
* Se imporetan dos elementos nuevos, la acción para realizar la limpieza `eventClearActiveEvent` y el componente __DeleteEventFab__.
````
...
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { DeleteEventFab } from '../ui/DeleteEventFab';
````
* Se toma del __useSelector__ el estado llamado `activeEvent`.
````
const { events, activeEvent } = useSelector( state => state.calendar );
````
* Se agrega una función para que el botón de eliminar desaparezca _(pasando `activeEvent` a null)_.
````
const onSelectSlot = (e) => {
  dispatch( eventClearActiveEvent() )
}
````
* Se agrega 2 propiedades adicionales en el componente __Calendar__ esto es `onSelectSlot` pasandole la función recién creada, ademas de `selectable` en true.
````
<Calendar
  ...
  onSelectSlot={ onSelectSlot }
  selectable={ true }
  ...
/>
````
* En el caso que sea null `activeEvent` desaparecerá el botón de eliminar.
````
{ 
  (activeEvent) && <DeleteEventFab />
}
````
En `components/calendar/CalendarModal.js`
* Se agrega un `else` en el __useEffect__ para que no consérve el formulario cuando el elemento seleccionado sea eliminado. 
````
useEffect(() => {
  if( activeEvent ){
    setFormValues( activeEvent );
  } else {
    setFormValues( initEvent );
  }
  
}, [activeEvent, setFormValues])
````
* Se hace una condición con `activeEvent` para mostrar el titulo de formulario.
````
<h1> { (activeEvent)? 'Editar evento' : 'Nuevo evento' } </h1>
````
----
# MERN Frontend - Auth con Backend
El segundo nivel de Frontend es para preparar la autenticación del frontend hacia el backend.

<img src="https://www.itsitio.com/wp-content/uploads/2019/10/1_NVwfSg8wHwFZ_R7ULgzdLQ-780x405.jpeg" alt="CRUD" width="320"/>

----
### 1.- Reducer de Auth
Se creará el reducer de auteticación.

Paso a Seguir:
* Se creará los archivos que manejen las variables de entorno.
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
* Se crea el estado inicial, proximamente se utilizará el `uid` y `name`.
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
### 2.- Acción de Login
En este punto se implementará el uso del formulario de Login y se creará la acción que será disparada.

Paso a Seguir:
* Crear CustomHook __useForm__.
* Creación del archivo donde estarán las acciones de __Auth__.
* Implementar CustomHook y habilitar formulario de login en el componente __LoginScreen__.

En `hook/useForm.js`
* Se importa __useState__ para el uso del CustomHook.
````
import { useState } from 'react';
````
* Se crea el hook __useForm__ que recibirá por parametro un `initialState`.
* Utilizando el useState, le pasamos el estado inicial que se recibirá por parametros.
````
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);
    ...
}
````
* Se crea una función de reset, que cambiará el estado a su estado inicial.
````
const reset = () => {
    setValues( initialState );
}
````
* Se crea la función `handleInputChange` que recibe por parametros el `target` esto hará que cambie el estado, dandole nuevos valores al inuput, en pocas palabras permitiendo que se pueda editar el contenido del input.
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
* Creamos la primera acción asíncrona `startLogin` que recibira el `email` y `password`.
* En el callback mandamos una impresión por pantalla para evaluar lo que enviemos.
````
export const startLogin = ( email, password ) => {
    return async() => {
        console.log(email, password);
    }
}
````
* Importamos 3 nuevos elementos, useDisaptch para disparar las acciones, __useForm__ para utilizarlo en los formularios y `startLogin` que es la acción.
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
* Se crea la función del formulario del login `handleLogin`, disparamos la acción que mostramos anteriormente, mandandole los elementos del formulario.
````
const handleLogin = (e) => {
  e.preventDefault();

  dispatch(startLogin(lEmail, lPassword));
}
````
* En el formulario de login agregamos la función recién mostrada `handleLogin`.
* Agregamos en los 2 input de `email` y `password` el `name`, `value` correspondiente y la función del CustomHook `handleLoginInputChange`.
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
                placeholder="Contraseña"
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
### 3.- Petición HTTP de Autenticación
En este punto se hará una función fetch para realizar el login sin token.

Paso a Seguir: 
* Crear helper que manejará el fetch.
* Se implementa el nuevo case del reducer de auth.
* Se modifica la acción `startLogin` y crear una nueva acción sincrona.

En `helpers/fetch.js`
* Se almacena en una constante la variable global.
````
const baseURL = process.env.REACT_APP_API_URL;
````
* Creamos la función `fetchSinToken` que recibirá por parametro el `endpoint`, `data` y `method` que por defecto es un `GET`.
* Almacenamos en la constante `url` se almacenará el contenido que se envíe por el parametro.
* En el caso que se envíe un metodo `GET` se retornará el fetch con el `url`.
* En el caso que se mande un metodo diferente, se retornará el `method`, en el `headers` se manda el `content` que sera tipo __JSON__, finalmente se manda el contenido del body. 
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
* Se exporta la función `fetchSinToken`.
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
* Se importa la función del helper y los tipos.
````
import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
````
* En el callback recibimos por parametro `dispatch` gracias a thunk.
* En la función que creamos mandamos el endpoint, la data que esta `email` con `password` y el metodo POST.
* Luego tomamos lo que venga en el fecth para almacenarlo en la constante `body`.
* Realizamos una validación con el `body.ok`, en el caso q sea true se guardará el token en __localStorage__ con la fecha de creación.
* Se dispará la acción de login.
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
* Se crea la acción sincrona de login, recibiendo el user, para luego mandarlo por el payload.
````
const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})
````
----
### 4.- Implementación de Register
Se implementa la acción para realizar el registro en la aplciación Backend.

Pasos a Seguir: 
* Se crera la acción asíncrona `startRegister` para realizar el registro en el Backend.
* Se adapta el formulario de register para tomar los datos y disparar la acción `startRegister`.

En `actions/auth.js`
* Se importa __SweetAlert__ para implementarla en los errores que envía el backend.
````
import Swal from 'sweetalert2';
````
* Se crea la acción asíncrona `startRegister` que recibirá por parametro `email`, `password` y `name`.
* Implementamos el callback que recibe por parametros gracias a __Thunk__ el dispatch.
* Guardamos en la constante `resp` lo que venga en la función `fetchSinToken`, que le pasamos por argumento el endpoint, la data que seria `email`, `password` y `name` y finalmente le pasamos el metodo `POST`, ya que será un registro de usuario.
* Almacenamos en una variable llamada `body` el contenido que venga en `resp.json()`.
* Relizamos una condción, si `body.ok` es true, se guardará el token que venga del backend en el __localStorage__ al igual que la fecha que se creo.
* Finalmente disparamos la acción `login()` pasandole por argumento el `uid` y `name`.
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
* Importamos 2 nuevos elementos, la acción `startRegister` y SweetAlert.
````
...
import { startLogin, startRegister } from '../../actions/auth';
import Swal from 'sweetalert2';
````
* Utilizamos nuevamente el CustomHook __useForm__, pasandole elementos que se utilizarán.
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
* Creamos la función del formulario register `handleRegister`.
* Creamos una validación, que el password y el password de confirmar sean iguales, en el caso que no saltará un alerta.
* Finalmente si todo sale bien, se dispará la acción `startRegister` pasandole por argumento el `email`, `password` y `name` del formulario register.
````
const handleRegister = (e) => {
  e.preventDefault();

  if ( rPassword !== rPassword2 ){
    return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
  }
  
  dispatch(startRegister(rEmail, rPassword, rName));
}
````
* Le agregamos al formulario la función `handleRegister`.
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
En este punto se creará una nueva función que interactuará con el backend para renovar el token, esto servirá al momento de recargar la pagina.

Pasos a Seguir:
* Crear función en los helpers `fetchConToken`.
* Crear un nuevo case en el reducer `authReducer`.
* Crear 2 acciones una asíncrona y otra sincrona.
* Activamos la acción asíncrona en la ruta __AppRouter__ para tener un mayor nivel de acceso en la aplicación.

En `helpers/fetch.js`
* Creamos la función `fetchConToken` muy similar a la anterior, recibiendo por parametros `endpoint`, `data` y `method`.
* En la constante `url` se almacenará el path, y en la constante token, se tomará el contenido del __localStorage__ con `.getItem()`.
* Realizamos una condición en el caso que el `method` sea GET, se enviará el method GET y el token que se tiene en el __localStorage__.
* En el caso ser otro `method`, se enviará este, en el header se envia el Content y el token, ademas del contenido en de `data`.
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
* Se crea la acción `startChecking`, que retorna un callback asíncrono que recibá el dispatch.
* Enviado en la función helper `fetchConToken` el endpoint `auth/renew`, recibiendo la respuesta en la constante `body`.
* En el caso que haya un `body.ok` en true, entrará a la condición el cual es guardar el token en el __localStorage__ con la fecha y disparar la acción `login` con el `uid` y `name``.
* En el caso que sea `body.ok` en false, se enviará una impresión por pantalla con el error del backend y disparando la acción `checkingFinish()`.
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
* Creamos la acción sincrona `checkingFinish` que será disparada por la acción anteriormentes creada.
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
* Se agrega el useEffect que será renderizado cada vez que se inicie la aplicación o cuando dispatch camibe ya que es su dependencia.
* Este disparará la acción asíncrona `startChecking`.
````
const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch( startChecking() );
      
  }, [dispatch])
````
----
### 6.- Protección de Rutas
En este punto se agregará rutas privadas y publicas para realizar la protección de los componentes.

Pasos a Seguir:
* Se copia e implementa la ruta Publica __[PublicRoute](https://github.com/Paserno/react-redux-fst-app/blob/main/src/routers/PublicRoute.js)__.
* Se copia e implementa la ruta Privada __[PrivateRoute](https://github.com/Paserno/react-redux-fst-app/blob/main/src/routers/PrivateRoute.js)__.
* En la ruta __AppRouter__ se implementa ambas rutas para realizar la protección de los componentes.

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
* Sacamos del estado global de la aplicación con ayuda de __useSelector__ el `checking` y `uid`.
````
const { checking, uid } = useSelector(state => state.auth)
````
* Realizamos una condición, cada vez que `checking` este en true, saldra `Cargando...`, esto proximamente se puede remplazar con un componente de carga mas estilizado.
````
if ( checking ){
    return (<h5>Cargando...</h5>);
  }
````
* En el `<Switch>` se implementa las dos rutas, agregando el `isAuthenticated` con `!!uid`, con la doble negación hacemos q si viene algo se transforme en _false_ y luego con la segunda negación pase a _true_.
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
Se creará el reducer de logout y agregarlo al botón.

Pasos a Seguir: 
* Se crea el case del logout en el Reducer de auth.
* Se crea 2 acciónes una asíncrona y otra sincrona.
* Se establece el logout en el botón del componente __Navbar__.

En `reducer/authReducer.js`
* Se crea el case del logout, en este caso no devolverá el estado si no que el `checking` en false.
````
case types.authLogout:
  return {
      checking: false
  }
````
* Se crea la acción asíncrona retornando un callback.
* Se limpla el `localStorage` y se dispará una acción que proximamente se mostrará de logout.
````
export const startLogout = () => {
    return ( dispatch ) => {¿
        localStorage.clear();
        dispatch( logout() );
    }
}
````
* Se crea la acción `logout` que es disparáda en la acción asíncrona.
````
const logout = () => ({
    type: types.authLogout
});
````
En `components/ui/Navbar.js`
* Se importa 3 nuevos elementos 2 CustomHook de React Redux y la acción `startLogout`.
````
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
````
* Se busca el estado que esta en Redux `name` para proximamente mostrar el nombre del usuario.
* Se implementa el useDispatch.
* Se crea la función `handleLogout` que dispara la acción asíncrona `startLogout`.
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
* Se implementa la función recién creada `handleLogout`.
````
<button 
  className="btn btn-outline-danger"
  onClick={ handleLogout }
>
````
----
# MERN Frontend - CRUD Eventos con Backend
En este nivel se realizará la integración de los eventos con el backend, para tener la información persistente.

<img src="https://916256.smushcdn.com/2265571/wp-content/uploads/2019/02/0_th2x89zHuZmHGsLJ.png?lossy=1&strip=1&webp=1" alt="CRUD" width="320"/>

----
### 1.- Creación de evento hacia el backend
En este punto se creará la acción que permita realizar la creación de eventos hacia el backend, para proximamente mostrarlo.

Pasos a Seguir:
* Crear un nuevo tipo.
* Modificar acción sincrona y crear una nueva acción asíncrona.
* Modificar componente CalendarModal.

En `types/types.js`
* Se crea un nuevo tipo.
````
eventStartAddNew: '[Event] Start Add New',
````
En `actions/events.js`
* Se importa la función del helper `fetchConToken`.
````
import { fetchConToken } from "../helpers/fetch";
````
* Se crea la nueva acción asíncrona que recibe por parámetro `event`.
* Se retorna un callback, gracias a Thunk se puede recibir `dispatch` y `getState`.
* Con el `getState()` se puede buscar elementos en el estado de la aplciación, en este caso desestructuramos `uid` y `name`.
* Encerramos el contenido en un __TryCatch__ para controlar el error.
* Mandamos en la función `fetchConToken` el `events` que es el endpoint, event que es el contenido que será recibido en las propiedades y metodo __POST__.
* Almacenamos el contenido que recibimos en la constante `body`.
* Realizamos una condición, si el `body.ok` es true, se envia el id, y el user por el `event`.
* Mandamos en la acción `eventAddNew` el contenido del `event`.
* En el caso de recibir algun error se imprimirá por consola.

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
* Esta función le quitamos el `export` ya que se manejará localmente.
````
const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});
````
En ``
* Remplazamos la importación de `eventAddNew` por la nueva `eventStartAddNew`.
````
import { eventClearActiveEvent, eventStartAddNew, eventUpdated } from '../../actions/events';
````
* En la función `handleSubmitForm` el ultimo else, se remplaza el contenido que se iba a mandar por la nueva acción `eventStartAddNew` que se le pasa por argumento solamente el estado del formulario.
````
dispatch( eventStartAddNew(formValues) );
````
----
### 2.- Mostrar Evento desde el Backend
En este punto se mostrará recibiremos el contenido que es enviado desde el backend para proximamente mostrarlo.

Pasos a Seguir: 
* Se crea un tipo nuevo.
* Se modifica el reducer, para luego implementar un nuevo case.
* Se crean 2 nuevas acciónes en `actions/events` la primera asíncrona y otra sincrona que se manejará local.
* Finalmente se creará un useEffect en el componente __CalendarScreem__ para cuando se cargue el componente se muestre proximamente todos los eventos por pantalla.

En `types/types.js`
* Se crea el nuevo tipo de carga de eventos.
````
...
eventLoaded: '[Event] Event Loaded',
````
* El valor inicial del state, específicamente `events` se eliminará todo el contenido que tenía.
````
const initialState = {
    events: [],
    activeEvent: null
};
````
* Se crea el nuevo case donde se retornará el state, ademas de un arreglo de lo que se envíe por el `aciton.payload`.
````
case types.eventLoaded:
    return {
      ...state,
      events: [ ...action.payload ]
    }
````
En `actions/events.js`
* Se crea la acción `eventStartLoading` asíncrona, retornamos un callback que tiene por propiedad el `dispatch` y encerramos el contenido de este con un `TryCatch`.
* Se usa la función `fetchConToken` enviandole el endpoint `events` por defecto es un GET la petición fetch.
* Recibimos el contenido del backend en la constante body.
* Del body.eventos se lo pasamos a una constante pera luego enviarselo al dispatch, por mientras que no se soluciona lo de la fecha se imprimirá por consola solamente.
* En el caso de un error se manda una impresión por consola.
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
* Se crea la acción sincrona `eventLoaded` que recibe por parametros `events`, para luego enviarlo por el payload.
````
const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})
````
En `components/calendar/CalendarScreen.js`
* Importamos __useEffect__ en el componente y la acción `eventStartLoading`.
````
import { useEffect, useState } from 'react';
...
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
````
* Se implementa el __useEffect__ disparando la acción `eventStartLoading`.
````
useEffect(() => {
  dispatch(eventStartLoading())
  
}, [dispatch])
````
----