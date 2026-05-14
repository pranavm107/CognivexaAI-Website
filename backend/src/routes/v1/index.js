import express from 'express';
import authRoute from './auth.route.js';
import adminRoute from './admin.route.js';
import bookingRoute from './booking.route.js';
import bookingAdminRoute from './booking.admin.route.js';
import inquiryRoute from './inquiry.route.js';
import dashboardRoute from './dashboard.route.js';
import analyticsRoute from './analytics.route.js';
import cmsRoute from './cms.route.js';
import publicRoute from './public.route.js';
import clientRoute from './client.route.js';
import clientAuthRoute from './clientAuth.route.js';
import taskRoute from './task.route.js';
import adminCommandRoute from './adminCommand.route.js';
import financeRoute from './finance.route.js';
import opsRoute from './operations.route.js';
import lifecycleRoute from './lifecycle.route.js';
import operationalRoute from './operational.route.js';
import tenantRoute from './tenant.route.js';
import opsCockpitRoute from './opsCockpit.route.js';
import workforceRoute from './workforce.route.js';
import serviceRoute from './service.route.js';
import showcaseProjectRoute from './showcaseProject.route.js';
import portfolioProjectRoute from './portfolioProject.route.js';
import conceptProjectRoute from './conceptProject.route.js';
import pricingCategoryRoute from './pricingCategory.route.js';
import pricingPlanRoute from './pricingPlan.route.js';
import smartPackageRoute from './smartPackage.route.js';
import conceptBuildRoute from './conceptBuild.route.js';
import specializedTeamRoute from './specializedTeam.route.js';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin/workforce',
    route: workforceRoute,
  },
  {
    path: '/admin/ops-cockpit',
    route: opsCockpitRoute,
  },
  {
    path: '/tenant',
    route: tenantRoute,
  },
  {
    path: '/admin/ops-platform',
    route: operationalRoute,
  },
  {
    path: '/admin/lifecycle',
    route: lifecycleRoute,
  },
  {
    path: '/admin/ops-center',
    route: opsRoute,
  },
  {
    path: '/admin/finance/ops',
    route: financeRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/public',
    route: publicRoute,
  },
  {
    path: '/client/auth',
    route: clientAuthRoute,
  },
  {
    path: '/client',
    route: clientRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
  {
    path: '/admin/ops',
    route: adminCommandRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/bookings',
    route: bookingRoute,
  },
  {
    path: '/admin/bookings',
    route: bookingAdminRoute,
  },
  {
    path: '/inquiries',
    route: inquiryRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/analytics',
    route: analyticsRoute,
  },
  {
    path: '/cms',
    route: cmsRoute,
  },
  {
    path: '/services',
    route: serviceRoute,
  },
  {
    path: '/showcase-projects',
    route: showcaseProjectRoute,
  },
  {
    path: '/portfolio-projects',
    route: portfolioProjectRoute,
  },
  {
    path: '/concept-projects',
    route: conceptProjectRoute,
  },
  {
    path: '/pricing-categories',
    route: pricingCategoryRoute,
  },
  {
    path: '/pricing-plans',
    route: pricingPlanRoute,
  },
  {
    path: '/smart-package',
    route: smartPackageRoute,
  },
  {
    path: '/concept-builds',
    route: conceptBuildRoute,
  },
  {
    path: '/specialized-teams',
    route: specializedTeamRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
