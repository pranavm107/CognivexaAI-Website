import logger from '../config/logger.js';
import Project from '../models/Project.model.js';
import User from '../models/User.model.js';
import Client from '../models/Client.model.js';
import Invoice from '../models/Invoice.model.js';

/**
 * ENTERPRISE GLOBAL SEARCH ENGINE
 * Unified discovery across all organizational entities and departments.
 */
export const globalSearch = {
  /**
   * Execute Cross-Entity Search
   * @param {string} query - Search term
   * @param {Object} options - { organizationId, limit, types: ['projects', 'employees'] }
   */
  search: async (query, options = {}) => {
    logger.info(`[GlobalSearch] Query: ${query}`, options);

    const { organizationId, limit = 10, types = ['projects', 'employees', 'clients', 'invoices'] } = options;
    const searchRegex = new RegExp(query, 'i');

    const searchTasks = [];

    if (types.includes('projects')) {
      searchTasks.push(Project.find({ name: searchRegex, ...(organizationId && { client: organizationId }) }).limit(limit).then(res => res.map(i => ({ type: 'project', id: i._id, title: i.name, status: i.status }))));
    }

    if (types.includes('employees')) {
      searchTasks.push(User.find({ 
        $or: [{ firstName: searchRegex }, { lastName: searchRegex }],
        role: 'employee'
      }).limit(limit).then(res => res.map(i => ({ type: 'employee', id: i._id, title: `${i.firstName} ${i.lastName}`, status: i.status }))));
    }

    if (types.includes('clients')) {
      searchTasks.push(Client.find({ companyName: searchRegex }).limit(limit).then(res => res.map(i => ({ type: 'client', id: i._id, title: i.companyName, status: 'active' }))));
    }

    if (types.includes('invoices')) {
      searchTasks.push(Invoice.find({ 
        invoiceId: searchRegex,
        ...(organizationId && { client: organizationId }) 
      }).limit(limit).then(res => res.map(i => ({ type: 'invoice', id: i._id, title: i.invoiceId || i._id, status: i.status }))));
    }

    const results = await Promise.all(searchTasks);
    return results.flat().sort((a, b) => a.title.localeCompare(b.title));
  }
};

export default globalSearch;
