 //floating action modal

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

 
 export const AddNewFab = () => {
     
    const dispatch = useDispatch()

    const hancleClickNew = () => {
        dispatch(uiOpenModal());
    }

   return (
     <button
        className="btn btn-primary fab"
        onClick={ hancleClickNew }
     >
         <i className="fas fa-plus"></i>
     </button>
   )
 }
