import Project from '../models/Project.model.js';
import User from '../models/User.model.js';
import Invoice from '../models/Invoice.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import logger from '../config/logger.js';

/**
 * Generate a CSV string from an array of objects
 */
const jsonToCsv = (items) => {
  if (items.length === 0) return '';
  const header = Object.keys(items[0]);
  const headerString = header.join(',');
  const rowItems = items.map((item) =>
    header
      .map((fieldName) => JSON.stringify(item[fieldName], (key, value) => (value === null ? '' : value)))
      .join(',')
  );
  return [headerString, ...rowItems].join('\r\n');
};

/**
 * Audit Report Generation
 */
const generateRevenueReport = async () => {
  const invoices = await Invoice.find({ isDeleted: false }).populate('client', 'companyName');
  const data = invoices.map(i => ({
    InvoiceNumber: i.invoiceNumber,
    Client: i.client?.companyName || 'Unknown',
    Amount: i.totalAmount,
    Status: i.status,
    Date: i.createdAt.toISOString()
  }));
  return jsonToCsv(data);
};

const generateSecurityReport = async () => {
  const logs = await ActivityLog.find({ entityType: 'Security' }).populate('actorId', 'email');
  const data = logs.map(l => ({
    Timestamp: l.createdAt.toISOString(),
    Action: l.action,
    Actor: l.actorId?.email || 'System',
    IP: l.details?.ip || 'N/A',
    Severity: l.details?.severity || 'info'
  }));
  return jsonToCsv(data);
};

const generateProjectReport = async () => {
  const projects = await Project.find({ isDeleted: false }).populate('client', 'companyName');
  const data = projects.map(p => ({
    Title: p.title,
    Client: p.client?.companyName || 'Unknown',
    Status: p.status,
    Progress: `${p.progress}%`,
    HealthScore: p.healthScore,
    Risk: p.riskLevel
  }));
  return jsonToCsv(data);
};

export default {
  generateRevenueReport,
  generateSecurityReport,
  generateProjectReport
};
