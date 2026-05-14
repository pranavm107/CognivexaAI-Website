import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import workforceController from '../../controllers/workforce.controller.js';
import crmController from '../../controllers/crm.controller.js';
import supportController from '../../controllers/support.controller.js';

const router = express.Router();

// All operational routes require baseline auth
router.use(auth());

// Workforce Operations (Admin Only)
router.get('/workforce/team', auth('admin'), workforceController.getTeamDirectory);
router.get('/workforce/analytics', auth('admin'), workforceController.getWorkforceAnalytics);
router.get('/workforce/performance/:userId', auth('admin'), workforceController.getEmployeePerformance);

// CRM & Sales (Admin/Sales)
router.get('/crm/pipeline', auth('admin', 'sales'), crmController.getSalesPipeline);
router.post('/crm/opportunities', auth('admin', 'sales'), crmController.createOpportunity);
router.patch('/crm/opportunities/:id/stage', auth('admin', 'sales'), crmController.updateOpportunityStage);

// Support Desk (Admin/Support/Client)
router.get('/support/tickets', supportController.getTickets);
router.post('/support/tickets', supportController.createTicket);
router.post('/support/tickets/:id/comments', supportController.addTicketComment);

export default router;
