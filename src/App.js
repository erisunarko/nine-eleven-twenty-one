/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function TodoComplete({ todo, index, setSelectedTodo }) {
  return (
    <div className="todo">
      <div>
        <span>
          {todo.title}
        </span>
        <br />
        <span>
          {todo.description}
        </span>
        <br />
        <span>
          Status: {todo.status}
        </span>
      </div>
      <div>
        <Button variant="primary" onClick={() => setSelectedTodo(todo, index)}>Edit</Button>
      </div>
    </div>
  );
}

function TodoInComplete({ todo, index, setSelectedTodo }) {
  return (
    <div className="todo">
      <div>
        <span>
          {todo.title}
        </span>
        <br />
        <span>
          {todo.description}
        </span>
        <br />
        <span>
          Status: {todo.status}
        </span>
      </div>
      <div>
      <Button variant="primary" onClick={() => setSelectedTodo(todo, index)}>Edit</Button>
      </div>
    </div>
  );
}

async function getData(setTodos) {
  const apiUrl = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";

  let res = await fetch(apiUrl).then(res => {
    return res.json()
  }).catch(() => {
    alert("Opps something went wrong!")
    return
  })

  setTodos(res)
}

function App() {
  React.useEffect(() => {
    getData(setTodos)
  }, []);

  const [todos, setTodos] = React.useState([]);
  const [selectedTodo, updateTodo] = useState(
    {
      index: 0,
      id : 0,
      title : "",
      description : "",
      status : 0,
      createdAt : "",
    }
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setSelectedTodo = (todo, index) => {
    handleShow();
    todo.index = index;
    updateTodo(todo);
    setTitleValue(todo.title);
    setDescriptionValue(todo.description);
    setStatusValue(todo.status);
  };
  const updateTodos = index => {
    const newTodos = [...todos];
    newTodos[index].title = titleValue;
    newTodos[index].description = descriptionValue;
    newTodos[index].status = statusValue;
    setTodos(newTodos);
    handleClose();
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    handleClose();
  };
  const [titleValue, setTitleValue] = useState("");
  const onChangeTitle = e => {
    setTitleValue(e.target.value);
  };
  const [descriptionValue, setDescriptionValue] = useState("");
  const onChangeDescription = e => {
    setDescriptionValue(e.target.value);
  };
  const [statusValue, setStatusValue] = useState(0);
  const onChangeStatus = e => {
    setStatusValue(parseInt(e.target.value));
  };

  return (
    <div className="app">
      <div className="todo-list mb-4">
        {todos.map((todo, index) => {
          if(todo.status === 1) {
            return <TodoComplete
              key={index}
              index={index}
              todo={todo}
              setSelectedTodo={setSelectedTodo}
            />
          }
        })}
      </div>

      <div className="todo-list mb-4">
        {todos.map((todo, index) => {
          if(todo.status === 0) {
            return <TodoInComplete
              key={index}
              index={index}
              todo={todo}
              setSelectedTodo={setSelectedTodo}
            />
          }
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>To do</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                onChange={onChangeTitle}
                value={titleValue}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                onChange={onChangeDescription}
                value={descriptionValue}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select onChange={onChangeStatus}>
                <option>Status</option>
                <option value={1}>Completed</option>
                <option value={0}>Not-Complete</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => updateTodos(selectedTodo.index)}>
            Update
          </Button>
          {selectedTodo.status === 0
            ? <Button variant="danger" onClick={() => removeTodo(selectedTodo.index)}>
                Delete
              </Button>
            : ""
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;