const users = [];

const getUsers = (req, res) => {
  res.json(users);
};

const addUser = (req, res) => {
  console.log("POST /users called", req.body);

  const { name, age, city, phone, email } = req.body;
  if (!name || !age || !city || !phone || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newUser = { id: users.length + 1, name, age, city, phone, email };
  users.push(newUser);

  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;

  res.json(updatedUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
};

module.exports = { getUsers, addUser, updateUser, deleteUser };
