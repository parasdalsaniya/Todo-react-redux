import React, { useState } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { addTask, deleteTask, updateTask } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

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
  const [status, setStatus] = useState("pendding")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addTask({id:id, task:task, status:status}))
    setShow(!show);
  } 

  const handleDelete = (t) => {
    dispatch(deleteTask({id:t.id, task:t.task, status:t.status}))
  }

  const handleUpdate = (t) => {
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
      <Button variant="dark" onClick={() => setShow(!show)}>Add Todo</Button>

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
                  <td><Button variant='dark' onClick={() => handleDelete(t)}>Delete</Button></td>
                  <td><Button variant='dark' onClick={() => handleUpdate(t)}>Update</Button></td>
                </tr>
              ))}
            </tbody>
        </Table>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Task ID" value={id} onChange={e => setId(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Task</Form.Label>
            <Form.Control type="text" placeholder="Task Title" value={task} onChange={e => setTask(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" className={ id==="" && task==="" ? "me-3" : "disabled me-3"} onClick={handleAdd}>
            Save Changes
          </Button>

          <Button variant="primary" className={ id!=="" || task!=="" ? "me-3" : "disabled me-3"} onClick={handleUpdateRedux}>
            Update
          </Button>

        </Modal.Body>
      </Modal>

    </React.Fragment>
   );
}
 
export default Todo;


/*
{ 
  {columns.map(c => (
    <td key={c.path+t.task}>{ 

     }</td>
  ))} 
}

  // function renderCell(t, c) {
  //   console.log("render", c.btn)
  //   if(c.btn) return c.btn[t]
  //   return t[c.path]
  // }

  // console.log("outside",todos)
*/