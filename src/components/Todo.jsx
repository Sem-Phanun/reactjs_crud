import React, { useEffect, useState } from "react";
import { CiTrash, CiEdit } from 'react-icons/ci'
import { handleApi } from "../services/globalApi";
import "./todo.scss";
const Todo = () => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    await handleApi("todos", "get").then((res) => {
      if (res) {
        setList(res.data);
      }
    });
  };
  

  //add or update method
  const handleAddorUpdate = async () => {
    var method = "post";
    var param = {title: title,};
    if(title == ""){
      alert("Please fill aw title")
      return false;
    }

    if (itemToEdit != null) {
      method = "put";
      param.todos_id = itemToEdit.todos_id; // add todos_id to param
      alert(itemToEdit.todos_id)
    }
    await handleApi("todos", method, param).then((res => {
      if (res) {
        setTitle("")
        getAllTodos();
        console.log("Resnopse from api ", res)
        setUpdate(false);
      }
    }));
  };

  const handleEdit = (itemToEdit) => {
      setItemToEdit(itemToEdit);
      setTitle(itemToEdit.title);
      setUpdate(true);

  };
  //delete item 
  const onDelete = async (todos_id) => {
    try {
      setItemToEdit();
      await handleApi("todos/" + todos_id, "delete").then((res) => {
        var tmp_data = list.filter((item) => item.todos_id != todos_id);
        setList(tmp_data);
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  return (
    <>
      <div className="container">
        <h1>Todo App</h1>

        <div className="form-container">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Something to do"
          />

          <button onClick={handleAddorUpdate}>{!update ? "Add" : "Update"}</button>
        </div>
      </div>
      <main className="todo-list">
        <ul className="list-box">
            {list.map((item) => (
              <li key={item.todos_id}>
                <p className="title">{item.title}</p>
                <button onClick={() => handleEdit(item)}><CiEdit className="icons"/></button>
                <button onClick={() => onDelete(item.todos_id)}><CiTrash className="icons"/></button>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
};

export default Todo;
