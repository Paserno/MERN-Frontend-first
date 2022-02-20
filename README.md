# First MERN - Frontend
Primera app MERN ( Mongo - Express - React - Node.js) utilizando las bases aprendidas para la implementación de todos estos elementos en conjuto, este repositorio será la parte del Fronend.

Elementos utilizados: 
* __[React Router v5](https://v5.reactrouter.com/web/guides/quick-start)__


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