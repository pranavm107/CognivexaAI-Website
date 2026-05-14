import Document from '../models/Document.model.js';
import eventBus from './eventBus.service.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * ENTERPRISE DOCUMENT LIFECYCLE SERVICE
 * Manages versioning, approvals, and state transitions for organizational assets.
 */
export const documentLifecycle = {
  /**
   * Create New Document Version
   */
  createVersion: async (docId, fileUrl, changeLog, userId) => {
    const document = await Document.findOne({ documentId: docId });
    if (!document) throw new Error('Document not found');
    if (document.isLocked) throw new Error('Document is locked for review');

    const nextVersion = document.currentVersion + 1;
    
    document.versions.push({
      versionNumber: nextVersion,
      fileUrl,
      updatedBy: userId,
      changeLog
    });
    
    document.currentVersion = nextVersion;
    await document.save();

    await eventBus.publish('DOCUMENT_VERSION_CREATED', {
      documentId: docId,
      version: nextVersion
    }, { userId });

    return document;
  },

  /**
   * Transition Document Status
   */
  transitionStatus: async (docId, status, userId) => {
    const document = await Document.findOneAndUpdate(
      { documentId: docId },
      { status },
      { new: true }
    );

    await AuditLog.create({
      action: 'DOCUMENT_STATUS_CHANGED',
      entityType: 'Document',
      entityId: document._id,
      details: { newStatus: status },
      userId
    });

    await eventBus.publish('DOCUMENT_STATUS_UPDATED', document, { userId });

    return document;
  }
};

export default documentLifecycle;
