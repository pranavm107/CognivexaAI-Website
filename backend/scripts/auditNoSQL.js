import axios from 'axios';
import logger from '../src/config/logger.js';

/**
 * NoSQL Injection Audit
 * Attempts to bypass authentication using common NoSQL operators.
 */
const auditNoSQL = async () => {
  const BASE_URL = 'http://localhost:7000/api/v1';
  
  logger.info('--- NoSQL INJECTION AUDIT STARTED ---');

  try {
    // Attempt login with injection
    logger.info('Attempting Login Injection: { email: { $gt: "" }, password: { $gt: "" } }');
    
    const response = await axios.post(`${BASE_URL}/client/auth/login`, {
      email: { $gt: "" },
      password: { $gt: "" }
    }).catch(err => err.response);

    if (response.status === 200) {
      logger.error('FAIL: NoSQL Injection Successful! Login bypassed.');
    } else {
      logger.info(`PASS: NoSQL Injection Rejected with status ${response.status}`);
    }
  } catch (error) {
    logger.error('Audit Script Error', error);
  }

  logger.info('--- NoSQL AUDIT COMPLETE ---');
  process.exit(0);
};

auditNoSQL();
