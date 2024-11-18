import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "@material-table/core";

const MaterialTableComponent = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8004/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add a new user
  const addUser = async (newData) => {
    try {
      const response = await axios.post("http://localhost:8004/api/users", newData);
      setUsers((prevUsers) => [...prevUsers, response.data]); // Update state with the new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Update an existing user
  const updateUser = async (newData) => {
    try {
      const response = await axios.put(`http://localhost:8004/api/users/${newData.id}`, newData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === newData.id ? response.data : user))
      ); // Update state with edited user
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (oldData) => {
    try {
      await axios.delete(`http://localhost:8004/api/users/${oldData.id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== oldData.id)); // Update state by removing deleted user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "50px" }}>
      <MaterialTable
        title="User Records"
        columns={[
          { title: "Name", field: "name", headerStyle: { width: '25%', textAlign: 'center', fontSize: '16px', padding: '16px', fontWeight: 'bold' } },
          { title: "Age", field: "age", type: "numeric", headerStyle: { width: '15%', textAlign: 'center', fontSize: '16px', padding: '16px', fontWeight: 'bold' } },
          { title: "City", field: "city", headerStyle: { width: '25%', textAlign: 'center', fontSize: '16px', padding: '16px', fontWeight: 'bold' } },
          { title: "Phone", field: "phone", headerStyle: { width: '25%', textAlign: 'center', fontSize: '16px', padding: '16px', fontWeight: 'bold' } },
        ]}
        data={users}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              addUser(newData);
              resolve(); // Resolve the promise after the user is added
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              updateUser(newData);
              resolve(); // Resolve after updating user
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              deleteUser(oldData);
              resolve(); // Resolve after deleting user
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          search: true,
          paging: true,
          headerStyle: {
            background: 'linear-gradient(to right, #3f51b5, #5c6bc0)', // Gradient background color
            color: '#FFFFFF', // Set text color
            textAlign: 'center', // Center text in header
            fontSize: '18px', // Larger font size
            padding: '12px', // Padding for header cells
            fontWeight: 'bold', // Bold font for header
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Box shadow for a lifted look
          },
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff', // Zebra striping for rows
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#1976d2', // Highlight on hover
            },
          }),
        }}
      />
    </div>
  );
};

export default MaterialTableComponent;
