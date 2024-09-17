const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// Create a new Role
router.post('/roles', roleController.createRole);

// Get all Roles
router.get('/roles', roleController.getRoles);

// Get a single Role by ID
router.get('/roles/:id', roleController.getRoleById);

// Update a Role
router.put('/roles/:id', roleController.updateRole);

// Delete a Role
router.delete('/roles/:id', roleController.deleteRole);

module.exports = router;
