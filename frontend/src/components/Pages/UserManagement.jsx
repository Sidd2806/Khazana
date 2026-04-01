import React, { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      _id:123,
      name: "john doe",
      email: "johndoe@gmail.com",
      role: "admin",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    user: "customer",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit= (e)=>{
    e.preventDefault();
    console.log(formData);
    setFormData({
      name:"",
      email:"",
      password:"",
      role:"customer"
    })
  }
  const handleRoleChange = (userId,newRole) =>{
    console.log({id:userId,role:newRole});
    
  }
  const handleDeleteUser = (userId) =>{
    if(window.confirm("Are you sure you want to delete this user?")){
      console.log("Delting user with ID",userId);
      
    }
  }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="p-6 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded mt-2 h-8"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded mt-2 h-8"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded mt-2 h-8"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded mt-2 h-8"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit"
          className="mt-4 bg-green-500 px-4 py-2  text-white hover:bg-green-600  rounded-md">
            Add User
          </button>
        </form>
      </div>
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>(
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="text-gray-900 p-4 font-semibold whitespace-nowrap">{user.name}</td>
                <td className="p-4"> {user.email} </td>
                <td className="p-4"> 
                  <select value={user.role}
                  onChange={((e)=>handleRoleChange(user._id,e.target.value))}
                  className="p-2 border border-blue-600 rounded"
                  >
                    <option value="customer">Customer </option>
                    <option value="admin">Admin </option>
                    </select> </td>
                    <td className="p-4">
                      <button  onClick={()=>handleDeleteUser(user._id)}
                      className="bg-red-500 px-4 py-2 text-white hover:bg-red-600 rounded">
                        Delete
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
