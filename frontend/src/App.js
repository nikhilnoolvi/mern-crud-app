import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService";
//import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", gender: "" });
  const [editId, setEditId] = useState(null);


  // Fetch users
  const fetchUsers = async () => {
    try {
    console.log("🌐 API URL:", process.env.REACT_APP_API_URL);
    const userData = await getUsers();
    console.log("✅ Users fetched:", userData);
    setUsers(userData);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateUser(editId, form);
      setEditId(null);
    } else {
      await createUser(form);
    }
    setForm({ first_name: "", last_name: "", email: "", gender: "" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm(user);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="App">
      <h1>👤 Users Management systems</h1>

      <form onSubmit={handleSubmit} className="form">
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
        <button type="submit">{editId ? "Update" : "Add"} User</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
            <p>{user.gender}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;