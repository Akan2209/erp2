import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { InventoryController } from '../controllers/inventory.controller';
import { InternshipController } from '../controllers/internship.controller';
import { ProjectController } from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const authCtrl = new AuthController();
const invCtrl = new InventoryController();
const internCtrl = new InternshipController();
const projCtrl = new ProjectController();

// Auth Routes
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);

// Inventory Routes
router.get('/inventory/requests', authenticate, invCtrl.listRequests);
router.post('/inventory/requests', authenticate, invCtrl.submitRequest);
router.post('/inventory/requests/:id/approve', authenticate, invCtrl.processApproval);

// Internship Routes
router.get('/internships/requests', authenticate, internCtrl.listRequests);
router.post('/internships/requests', authenticate, internCtrl.submitRequest);
router.post('/internships/requests/:id/approve', authenticate, internCtrl.processApproval);

// Project Routes
router.get('/projects/requests', authenticate, projCtrl.listRequests);
router.post('/projects/requests', authenticate, projCtrl.submitRequest);
router.post('/projects/requests/:id/approve', authenticate, projCtrl.processApproval);

export default router;
