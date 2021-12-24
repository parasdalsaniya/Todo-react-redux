import React, { useState } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { addTask, deleteTask, updateTask } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { Formik } from 'formik';

const Todo = () => {

  const columns = [
    { path: "id", name: "ID" },
    { path: "task", name: "Task" },
    { path: "status", name: "Status" },
    { path: "delete", name: "Delete" },
    { path: "update", name: "Update" }
  ];

  const [id, setId] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("pendding");

  const [show, setShow] = useState(false);
  const [error, setError] = useState('')
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    id: yup.number().typeError("ID must be number").required("ID is Required"),
    task: yup.string().required("Task is Required"),
    status: yup.string().required("tatus is Required")
  });

  
  const validate = () => {
    schema.validate({id, task, status}).catch(function(err){
      console.log("err[0]",err.errors);
      setError(err.errors[0])
      toast.error(err.errors[0]);
    })
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = (e, v) => {
    e.preventDefault();
    console.log("e",e);
    console.log("v",v);

    validate();
    setShow(!show);
    dispatch(addTask({id:id, task:task, status:status}))
  } 

  const handleDelete = (t) => {
    dispatch(deleteTask({id:t.id, task:t.task, status:t.status}))
  }

  const handleUpdate = (t) => {
    validate()
    setShow(!show);
    setId(t.id);
    setTask(t.task);
    setStatus(t.status);
  }

  const handleUpdateRedux = () => {
    dispatch(updateTask({id:id, task:task, status:status}))
    setShow(!show);
  }

  return ( 
    
    <React.Fragment>
      <h1>To Do</h1>
      <Button variant="dark" onClick={handleShow}>Add Todo</Button>
      
      <Table responsive style={{ width:"50%"}}>
        <thead >
            <tr >
              {columns.map((c) => (
                <th key={c.path} >{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr key={t.id + t.task}>
                <td>{t.id}</td>
                <td>{t.task}</td>
                <td>{t.status}</td>
                <td><Button variant='dark' onClick={() => handleUpdate(t)}>Update</Button></td>
                <td><Button variant='danger' onClick={() => handleDelete(t)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
      </Table>

        <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              
                <Form>
                  <Form.Group className="mb-3" controlId="id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Task ID" value={id} onChange={e => setId(e.target.value)}/>
                    <ToastContainer/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="task">
                    <Form.Label>Task</Form.Label>
                    <Form.Control  type="text" placeholder="Task Title" value={task} onChange={e => setTask(e.target.value)}/>
                    {/* <ToastContainer/> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control  type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)}/>
                    {/* <ToastContainer/> */}
                  </Form.Group>

                  { error!=="" ? <p style={{color: "red"}}>*{error}</p> : null }

                  <Button type='submit' variant="dark" className={"me-3"} onClick={handleAdd}>
                    Add Task
                  </Button>

                  <Button  variant="dark" className={"me-3"} onClick={handleUpdateRedux}>
                    Update
                  </Button>
                </Form>

          </Modal.Body>
        </Modal>
            
    </React.Fragment>
   );
}
 
export default Todo;
