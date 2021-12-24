import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { addTask, deleteTask, updateTask } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import FormModal from './formModal';

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
  const [status, setStatus] = useState("Pendding");

  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const [error, setError] = useState('')
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  let schema = yup.object().shape({
    id: yup.number().typeError("ID must be number").required("ID is Required"),
    task: yup.string().required("Task is Required"),
    status: yup.string().required("Status is Required")
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
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleAdd = (e) => {
    e.preventDefault();
    schema.isValid({ id, task, status })
    .then(function (valid) {
        if(valid) {
          dispatch(addTask({id, task, status}))
          setShow(!show);
          toast("Task updated successfully")
        } else {
          validate()
        }
    });
  } 

  const handleDelete = (t) => {
    schema.isValid({ id, task, status })
    .then(function (valid) {
      dispatch(deleteTask({id:t.id})) && toast("Task delete successfully")
    });
  }

  const handleUpdate = (t) => {
    setShowUpdate(!showUpdate);
    setId(t.id)
    setTask(t.task)
    setStatus(t.status);
  }

  const handleUpdateRedux = (e) => {
    schema.isValid({ id, task, status })
    .then(function (valid) {
        if(valid) {
          dispatch(updateTask({id, task, status}))
          setShowUpdate(!showUpdate);
          toast("Task add successfully")
        } else {
          validate()
        }
    });
    e.preventDefault();
  }

  return ( 
    
    <React.Fragment>
      <h1>To Do</h1>
      <Button variant="dark" onClick={handleShow}>Add Todo</Button>
      <ToastContainer/> 
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

      <FormModal 
        id={id} 
        setId={setId}
        task={task}
        setTask={setTask} 
        status={status} 
        setStatus={setStatus}
        error={error}
        onSubmit={handleAdd}
        title="Add New Task"
        btnName="submit"
        show={show}
        handleClose={handleClose}
      />

      <FormModal 
        id={id} 
        setId={setId}
        task={task}
        setTask={setTask} 
        status={status} 
        setStatus={setStatus}
        error={error}
        onSubmit={(e) => handleUpdateRedux(e)}
        title="Update Task"
        btnName="Update"
        show={showUpdate}
        handleClose={handleCloseUpdate}
        Disabled="disabled"
      />
            
    </React.Fragment>
   );
  
}
 
export default Todo;
