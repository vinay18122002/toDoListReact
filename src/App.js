import React, { useState } from "react";
import "./App.css";
const ToDoList = ({ toDoItems, deleteItem, saveItem, toggleComplete }) => {
  const renderItems = () => {
    return toDoItems.map((item, index) => (
      <ToDoListItem
        key={index}
        {...item}
        deleteItem={deleteItem}
        saveItem={saveItem}
        toggleComplete={toggleComplete}
      />
    ));
  };

  return <div className="items-list">{renderItems()}</div>;
};

const ToDoListItem = ({
  name,
  completed,
  deleteItem,
  saveItem,
  toggleComplete,
}) => {
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(name);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    saveItem(name, editInputValue);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const itemStyle = {
    textDecoration: completed ? "line-through" : "none",
    cursor: "pointer",
  };

  return (
    <div className="to-do-item">
      <span className="name">
        {editing ? (
          <form onSubmit={handleSaveClick}>
            <input
              type="text"
              value={editInputValue}
              onChange={handleInputChange}
            />
          </form>
        ) : (
          <span style={itemStyle} onClick={() => toggleComplete(name)}>
            {name}
          </span>
        )}
      </span>
      <span className="actions">
        {editing ? (
          <span>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </span>
        ) : (
          <span>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => deleteItem(name)}>Delete</button>
          </span>
        )}
      </span>
    </div>
  );
};

const CreateItem = ({ createItem }) => {
  const [newItemValue, setNewItemValue] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newItemValue) {
      alert("Please enter a task name.");
      return;
    } else if (createItem(newItemValue)) {
      alert("This task already exists.");
      setNewItemValue("");
      return;
    }
    setNewItemValue("");
  };

  return (
    <div className="create-new">
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New Task"
          value={newItemValue}
          onChange={(e) => setNewItemValue(e.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [toDoItems, setToDoItems] = useState([
    { name: 'Click "Create" to create new task', completed: false },
    { name: 'Click "Edit" to edit task', completed: false },
    { name: 'Click "Delete" to remove task', completed: false },
    { name: "Click on task to mark as complete", completed: false },
  ]);

  const createItem = (item) => {
    if (toDoItems.map((element) => element.name).indexOf(item) !== -1) {
      return true;
    }
    setToDoItems([{ name: item, completed: false }, ...toDoItems]);
    return false;
  };

  const findItem = (itemName) => {
    return toDoItems.find((element) => element.name === itemName);
  };

  const toggleComplete = (itemName) => {
    const selectedItem = findItem(itemName);
    selectedItem.completed = !selectedItem.completed;
    setToDoItems([...toDoItems]);
  };

  const saveItem = (oldItem, newItem) => {
    const selectedItem = findItem(oldItem);
    selectedItem.name = newItem;
    setToDoItems([...toDoItems]);
  };

  const deleteItem = (itemName) => {
    const index = toDoItems.map((element) => element.name).indexOf(itemName);
    toDoItems.splice(index, 1);
    setToDoItems([...toDoItems]);
  };

  return (
    <div className="to-do-app">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <CreateItem createItem={createItem} />
      <ToDoList
        toDoItems={toDoItems}
        deleteItem={deleteItem}
        saveItem={saveItem}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
