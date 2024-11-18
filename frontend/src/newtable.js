import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import "./style.css";

const CustomTable = () => {
  const [rows, setRows] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [newRowData, setNewRowData] = useState({
    name: "",
    age: "",
    city: "",
    phone: "",
    email: "",
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8005/api/users");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    setRowToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:8005/api/users/${rowToDelete}`, {
        method: "DELETE",
      });
      setRows(rows.filter((row) => row.id !== rowToDelete));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setOpenDeleteDialog(false);
      setRowToDelete(null);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setRowToDelete(null);
  };

  const handleEdit = (id) => {
    const rowData = rows.find((row) => row.id === id);
    setEditingRowId(id);
    setEditingRowData(rowData);
    setOpenEditDialog(true);
  };

  const confirmEdit = async () => {
    try {
      await fetch(`http://localhost:8005/api/users/${editingRowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingRowData),
      });
      setRows(
        rows.map((row) => (row.id === editingRowId ? editingRowData : row))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setOpenEditDialog(false);
      setEditingRowId(null);
      setEditingRowData({});
    }
  };

  const handleAddOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddSave = async () => {
    try {
      const response = await fetch("http://localhost:8005/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRowData),
      });
      const newUser = await response.json();
      setRows([...rows, newUser]);
      setOpenAddDialog(false);
      setNewRowData({ name: "", age: "", city: "", phone: "", email: "" });

      setButtonsVisible(true);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "custom-header",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "age",
      headerName: "Age",
      headerClassName: "custom-header",
      width: 100,
    },
    {
      field: "city",
      headerName: "City",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "phone",
      headerName: "Phone",
      headerClassName: "custom-header",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "custom-header",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className="main-container"
      style={{
        padding: "40px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        className="box"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
        style={{
          padding: "16px",
          backgroundColor: "#ffff",
          borderRadius: "4px",
        }}
      >
        <IconButton
          onClick={toggleMenu}
          style={{
            position: "absolute",
            right: "16px",
            top: "10px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 1,
          }}
        >
          <MenuIcon />
        </IconButton>

        {menuOpen && (
          <div
            className="hamburger-menu"
            style={{
              position: "absolute",
              right: "10px",
              top: "60px",
              background: "tranparent",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 1,
            }}
          >
            <a
              href="https://github.com/kafeelahmed-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Profile</Button>
            </a>
            <Button onClick={() => alert("Settings clicked")}>Settings</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}

        <div className="heading-search" style={{ flex: 1 }}>
          <h2 style={{ margin: 0, paddingLeft: "25px" }}>User Records</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              className="text-fields"
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton
                    position="start"
                    style={{ margin: 0, paddingRight: "15px" }}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </div>
        </div>

        {buttonsVisible && (
          <IconButton
            color="primary"
            onClick={handleAddOpen}
            style={{ margin: 0, paddingRight: "45px" }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>

      <div
        style={{
          height: 450,
          width: "90%",
          margin: "0 auto",
          border: "1px solid #ccc",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "blue",
              color: "black",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newRowData.name}
            onChange={(e) =>
              setNewRowData({ ...newRowData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={newRowData.age}
            onChange={(e) =>
              setNewRowData({ ...newRowData, age: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
            value={newRowData.city}
            onChange={(e) =>
              setNewRowData({ ...newRowData, city: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={newRowData.phone}
            onChange={(e) =>
              setNewRowData({ ...newRowData, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newRowData.email}
            onChange={(e) =>
              setNewRowData({ ...newRowData, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSave}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editingRowData.name}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={editingRowData.age}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, age: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
            value={editingRowData.city}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, city: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={editingRowData.phone}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editingRowData.email}
            onChange={(e) =>
              setEditingRowData({ ...editingRowData, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={confirmEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTable;
