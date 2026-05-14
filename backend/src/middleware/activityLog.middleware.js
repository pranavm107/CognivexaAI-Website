import ActivityLog from '../models/ActivityLog.model.js';
import logger from '../config/logger.js';

const logActivity = (action, entityType) => async (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    res.send = originalSend;
    
    // Only log successful operations
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      
      ActivityLog.create({
        adminId: req.user._id,
        action,
        entityType,
        entityId: req.params.id || parsedData.data?._id,
        details: {
          newValues: req.body,
        },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      }).catch(err => logger.error(`Activity logging failed: ${err.message}`));
    }

    return res.send(data);
  };

  next();
};

export default logActivity;
