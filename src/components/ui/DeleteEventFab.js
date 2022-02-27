import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux'
import { eventStartDeleted } from '../../actions/events';


export const DeleteEventFab = () => {
     
    const dispatch = useDispatch()

    const handleDelete = () => {

      Swal.fire({
        title: 'Borrar Evento',
        iconColor:'red',
        text: "Seguro que quieres Borrar este Evento!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {

          dispatch( eventStartDeleted() );
           

          Swal.fire(
              'Borrado!',
              'Tu Evento ha sido Borrado.',
              'success'
          )
        }
      })
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