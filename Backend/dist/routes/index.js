"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const inventory_controller_1 = require("../controllers/inventory.controller");
const internship_controller_1 = require("../controllers/internship.controller");
const project_controller_1 = require("../controllers/project.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const authCtrl = new auth_controller_1.AuthController();
const invCtrl = new inventory_controller_1.InventoryController();
const internCtrl = new internship_controller_1.InternshipController();
const projCtrl = new project_controller_1.ProjectController();
// Auth Routes
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
// Inventory Routes
router.get('/inventory/requests', auth_middleware_1.authenticate, invCtrl.listRequests);
router.post('/inventory/requests', auth_middleware_1.authenticate, invCtrl.submitRequest);
router.post('/inventory/requests/:id/approve', auth_middleware_1.authenticate, invCtrl.processApproval);
// Internship Routes
router.get('/internships/requests', auth_middleware_1.authenticate, internCtrl.listRequests);
router.post('/internships/requests', auth_middleware_1.authenticate, internCtrl.submitRequest);
router.post('/internships/requests/:id/approve', auth_middleware_1.authenticate, internCtrl.processApproval);
// Project Routes
router.get('/projects/requests', auth_middleware_1.authenticate, projCtrl.listRequests);
router.post('/projects/requests', auth_middleware_1.authenticate, projCtrl.submitRequest);
router.post('/projects/requests/:id/approve', auth_middleware_1.authenticate, projCtrl.processApproval);
exports.default = router;
