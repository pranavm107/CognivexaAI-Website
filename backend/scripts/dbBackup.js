import { exec } from 'child_process';
import path from 'path';
import logger from '../src/config/logger.js';
import env from '../src/config/env.js';

/**
 * Enterprise Disaster Recovery: MongoDB Backup
 * Performs a mongodump and stores it in the backups directory.
 */
const backupDatabase = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(process.cwd(), 'backups', `backup-${timestamp}`);
  
  logger.info(`Starting scheduled backup to: ${backupPath}`);

  // In production, you would use mongodump with credentials
  // For this enterprise transformation, we simulate the logic
  const command = `mongodump --uri="${env.MONGODB_URI}" --out="${backupPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      logger.error('Backup failed. Manual intervention required.', error);
      return;
    }
    logger.info('Database backup successful. Snapshot secured.');
  });
};

// If run directly
if (process.argv[1].includes('dbBackup.js')) {
  backupDatabase();
}

export default backupDatabase;
