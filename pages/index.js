import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, setTodoInput] = useState("")
  const [todos, setTodos] = useState([])

  const deleteTodo = (idx) => {
    todos.splice(idx, 1)
    const newTodos = [...todos]
    setTodos(newTodos)
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed
    setTodos([...todos])
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const title = todos[idx].title
    const completed = todos[idx].completed

    todos[idx].title = todos[idx - 1].title
    todos[idx].completed = todos[idx - 1].completed

    todos[idx - 1].title = title
    todos[idx - 1].completed = completed
    setTodos([...todos])
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    const title = todos[idx].title
    const completed = todos[idx].completed

    todos[idx].title = todos[idx + 1].title
    todos[idx].completed = todos[idx + 1].completed
    
    todos[idx + 1].title = title
    todos[idx + 1].completed = completed
    setTodos([...todos])
  };

  useEffect(() => {
    const todoStr = localStorage.getItem('')
    if (todoStr === null) // or if (!todoStr) ! = undefined, null, 0, ""
        setTodos([])
    else
        setTodos(JSON.parse(todoStr))
  }, [])

  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    if(isFirstRender) {
      setIsFirstRender(false)
      return
    }else{
      saveTodos()
    }
  }, [todos])

  const saveTodos = () => {
    const todoStr = JSON.stringify(todos)
    localStorage.setItem('resct-todos', todoStr)
  }

  // const onKeyUpHandler = (e) => {
  //   if(e.key!=="Enter") return
  //   // alert('enter is pressed')
  //   const newTodo = [{ title: todoText, completed: false}, ...todos]
  //   setTodos(newTodos)
  // }

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange = {(event) => {
            setTodoInput(event.target.value)
          }}
          onKeyUp = {(event) => {
            if(event.key !== "Enter") return
            else {
              if (event.target.value === "") {
                alert("Todo cannot be empty")
              }else{
                const newTodos = [{title: todoInput, completed: false}, ...todos]
                setTodos(newTodos)
                setTodoInput("")
              }
            }
          }}
          value={todoInput}
        />
        {/* Todos */}
          {todos.map((todo, i) => (
            <Todo
              title = {todo.title}
              completed = {todo.completed}
              key = {i}
              onMark = {() => markTodo(i)}
              onDelete = {() => deleteTodo(i)}
              onMoveUp = {() => moveUp(i)}
              onMoveDown = {() => moveDown(i)}/>
          ))}
        {/* Example 1 */}
        {/* {
          todos.map(todo => <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
            <span className="me-auto">{todo}</span>
          </div>)
        }
        <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo</span>
        </div> */}
        {/* Example 2 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo with buttons</span>

          <button className="btn btn-success">
            <IconCheck />
          </button>
          <button className="btn btn-secondary">
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary">
            <IconArrowDown />
          </button>
          <button className="btn btn-danger">
            <IconTrash />
          </button>
        </div> */}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">Pending ({todos.filter((x) => x.completed === false).length}) </span>
          <span className="text-success">Completed ({todos.filter((x) => x.completed === true).length})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Patrasorn Khantipongse 640610657
        </p>
      </div>
    </div>
  );
}
