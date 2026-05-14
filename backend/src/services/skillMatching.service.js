import User from '../models/User.model.js';
import logger from '../config/logger.js';

/**
 * ENTERPRISE SKILL MATCHING ENGINE
 * Recommends resources for projects based on skills, availability, and utilization.
 */
export const skillMatching = {
  /**
   * Find Best Match for Project Requirements
   * @param {Array} requiredSkills - ['React', 'Node.js', 'AWS']
   * @param {Object} options - { minExperience: 5, department: 'Engineering' }
   */
  findMatches: async (requiredSkills, options = {}) => {
    logger.info(`[SkillMatching] Searching for matches: ${requiredSkills}`);

    // Fetch all active employees
    const employees = await User.find({
      role: 'employee',
      status: 'active',
      isDeleted: false
    });

    const matches = employees.map(emp => {
      // Calculate Skill Score
      const matchingSkills = (emp.skills || []).filter(s => requiredSkills.includes(s));
      const skillScore = (matchingSkills.length / requiredSkills.length) * 100;

      // Calculate Availability Score (Placeholder for utilization logic)
      const availabilityScore = emp.utilization < 70 ? 100 : (100 - emp.utilization);

      return {
        employee: {
          id: emp._id,
          name: `${emp.firstName} ${emp.lastName}`,
          avatar: emp.avatar,
          department: emp.department
        },
        scores: {
          skill: skillScore,
          availability: availabilityScore,
          total: (skillScore * 0.7) + (availabilityScore * 0.3)
        },
        matchingSkills
      };
    });

    // Sort by total score descending
    return matches.sort((a, b) => b.scores.total - a.scores.total).slice(0, 5);
  }
};

export default skillMatching;
