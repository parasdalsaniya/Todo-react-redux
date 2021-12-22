import React, { useState } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { addTask } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Todo = () => {

  const columns = [
    { path: "id", name: "ID", content: () => <Button variant="danger">Delete</Button> },
    { path: "task", name: "Task" },
    { path: "status", name: "Status" },
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
    console.log("Addded",todos);
    e.preventDefault();
    dispatch(addTask({id:id, task:task, status:status}))
    // setShow(!show);
  } 
  // console.log("outside",todos)
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
                  {columns.map(c => (
                    <td key={c.path+t.task}>
                      {t[c.path]}
                    </td>
                  ))}
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

          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Body>
      </Modal>

    </React.Fragment>
   );
}
 
export default Todo;