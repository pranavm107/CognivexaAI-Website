import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import InquiryWorkspace from '../pages/InquiryWorkspace';
import BookingsWorkspace from '../pages/BookingsWorkspace';
import AnalyticsReport from '../pages/AnalyticsReport';
import ServicesWorkspace from '../pages/ServicesWorkspace';
import PortfolioCMS from '../pages/PortfolioCMS';
import PricingCMS from '../pages/PricingCMS';
import ConceptBuildCMS from '../pages/ConceptBuildCMS';
import SpecializedTeamsCMS from '../pages/SpecializedTeamsCMS';
import TeamWorkspace from '../pages/TeamWorkspace';
import NotificationsWorkspace from '../pages/NotificationsWorkspace';
import SettingsWorkspace from '../pages/SettingsWorkspace';

// Placeholder pages for other modules (deprecated)
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500 mt-2">This module is currently being finalized.</p>
    </div>
  </div>
);

import AdminCommandCenter from '../pages/ops/AdminCommandCenter';
import ClientManagementPage from '../pages/ops/ClientManagementPage';
import ProjectOperationsPage from '../pages/ops/ProjectOperationsPage';
import FinancialOperations from '../pages/ops/FinancialOperations';
import SecurityCenter from '../pages/ops/SecurityCenter';
import ReportsCenter from '../pages/ops/ReportsCenter';
import WorkforceDashboard from '../pages/ops/WorkforceDashboard';
import SalesPipelineBoard from '../pages/ops/SalesPipelineBoard';
import TicketCenter from '../pages/ops/TicketCenter';
import ContractWorkspace from '../pages/ops/ContractWorkspace';
import BrandingCenter from '../pages/ops/BrandingCenter';
import SubscriptionCenter from '../pages/ops/SubscriptionCenter';
import OnboardingWizard from '../pages/ops/OnboardingWizard';
import OpsCockpit from '../pages/ops/OpsCockpit';
import InfrastructureHealthCenter from '../pages/ops/InfrastructureHealthCenter';
import DeveloperPortal from '../pages/dev/DeveloperPortal';
import ComplianceOperationsCenter from '../pages/ops/ComplianceOperationsCenter';
import WebsiteOperationsCenter from '../pages/ops/WebsiteOperationsCenter';
import NotificationCenter from '../components/NotificationCenter';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Absolute login path for clarity */}
      <Route path="login" element={<LoginPage />} />
      
      {/* Protected Layout Section */}
      <Route element={<AdminLayout />}>
        {/* Explicit paths relative to /admin */}
        <Route path="ops" element={<AdminCommandCenter />} />
        <Route path="ops/cockpit" element={<OpsCockpit />} />
        <Route path="ops/infrastructure" element={<InfrastructureHealthCenter />} />
        <Route path="ops/compliance" element={<ComplianceOperationsCenter />} />
        <Route path="ops/website" element={<WebsiteOperationsCenter />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="dev/portal" element={<DeveloperPortal />} />
        <Route path="onboarding" element={<OnboardingWizard />} />
        <Route path="clients" element={<ClientManagementPage />} />
        <Route path="projects" element={<ProjectOperationsPage />} />
        <Route path="finance" element={<FinancialOperations />} />
        <Route path="security" element={<SecurityCenter />} />
        <Route path="reports" element={<ReportsCenter />} />
        <Route path="workforce" element={<WorkforceDashboard />} />
        <Route path="crm" element={<SalesPipelineBoard />} />
        <Route path="support" element={<TicketCenter />} />
        <Route path="contracts" element={<ContractWorkspace />} />
        <Route path="branding" element={<BrandingCenter />} />
        <Route path="subscription" element={<SubscriptionCenter />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="bookings" element={<BookingsWorkspace />} />
        <Route path="inquiries" element={<InquiryWorkspace />} />
        
        {/* Sub-routing for analytics to prevent loop */}
        <Route path="analytics/report" element={<AnalyticsReport />} />
        <Route path="analytics" element={<Navigate to="/admin/analytics/report" replace />} />
        
        <Route path="home/builds" element={<ConceptBuildCMS />} />
        <Route path="about/teams" element={<SpecializedTeamsCMS />} />
        <Route path="services" element={<ServicesWorkspace />} />
        <Route path="portfolio" element={<PortfolioCMS />} />
        <Route path="pricing" element={<PricingCMS />} />
        <Route path="team" element={<TeamWorkspace />} />
        <Route path="notifications" element={<NotificationsWorkspace />} />
        <Route path="settings" element={<SettingsWorkspace />} />
        
        {/* Index redirect to operations cockpit */}
        <Route index element={<Navigate to="/admin/ops" replace />} />
      </Route>

      {/* Global catch-all within /admin namespace */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
