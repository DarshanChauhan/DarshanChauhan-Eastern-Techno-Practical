const { Role } = require("../models");

// Create a new Role
exports.createRole = async (req, res) => {
  try {
    const { type } = req.body;

    // Validate the 'type' value
    if (!["admin", "superAdmin", "user", "guest"].includes(type)) {
      return res.status(400).json({ message: `This role doen't exits` });
    }

    const role = await Role.create({ type });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error creating role", error });
  }
};

// Get all Roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving roles", error });
  }
};

// Get a single Role by ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving role", error });
  }
};

// Update a Role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    // Validate the 'type' value
    if (!["admin", "superAdmin", "user", "guest"].includes(type)) {
      return res.status(400).json({ message: "Invalid role type" });
    }

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.type = type;
    await role.save();

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Error updating role", error });
  }
};

// Delete a Role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role", error });
  }
};
