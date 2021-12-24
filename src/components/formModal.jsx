import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Button, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap';

const FormModal = ({id, setId, task, setTask, status, setStatus, error, onSubmit, title, btnName, show, handleClose, Disabled }) => {
  
  return ( 
    <Modal show={show} onHide={handleClose}>
      <ToastContainer/>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>

        <Form>
          <Form.Group className="mb-3" controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control disabled={Disabled} type="text" placeholder="Task ID" value={id} onChange={e => setId(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="task">
            <Form.Label>Task</Form.Label>
            <Form.Control type="text" placeholder="Task Title" value={task} onChange={e => setTask(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Label id="status">Status</Form.Label>
            <select className='form-select' value={status} onChange={e => setStatus(e.target.value)} id="status">
              <option value="Pendding">Pendding</option>
              <option value="Done">Done</option>
              <option value="Cancle">Cancle</option>
            </select>
          </Form.Group>

          { error!=="" ? <p style={{color: "red"}}>{error}</p> : null }

          <Button type='submit' variant="dark" className={"mt-3"} onClick={onSubmit}>
            {btnName}
          </Button>
        </Form>

      </Modal.Body>
    </Modal>
   );
}
 
export default FormModal;