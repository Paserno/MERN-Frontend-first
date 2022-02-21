import { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker'; 
import moment from 'moment';
import Swal from 'sweetalert2';


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

//* Agregará una hora y los minutos y segundos en 0
const now = moment().minutes(0).second(0).add(1, 'hours'); 
const oneMoreHours = now.clone().add(1, 'hours');


export const CalendarModal = () => {

  const [dateStart, setDateStart] = useState( now.toDate() );
  const [dateEnd, setDateEnd] = useState( oneMoreHours.toDate() );
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'Event',
    notes: '',
    start: now.toDate(), 
    end: oneMoreHours.toDate()
  });

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {

    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const closeModal = () => {
    //TODO: Cerrar modal
    
  }

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
    //TODO: Realizar Grabación

    setTitleValid(true);
    closeModal();

  }

  return (
    <Modal
      isOpen={true}
      // onAfterOpen={ afterOpenModal }
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={300}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form 
        className="container"
        onSubmit={ handleSubmitForm }
      >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker 
            onChange={ handleStartDateChange } 
            value={ dateStart } 
            format="dd-MM-y h:mm a"
            amPmAriaLabel="Select AM/PM"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker 
            onChange={ handleFinishDateChange } 
            value={ dateEnd } 
            format="dd-MM-y h:mm a"
            amPmAriaLabel="Select AM/PM"
            minDate={ dateStart }
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${ !titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
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
            value={ notes }
            onChange={ handleInputChange }
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
    </Modal>


  )
}