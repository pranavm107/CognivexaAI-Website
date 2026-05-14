const applyPagination = (query, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(parseInt(limit));
};

const applySorting = (query, { sortBy = 'createdAt', order = 'desc' }) => {
  const sortOrder = order === 'desc' ? -1 : 1;
  return query.sort({ [sortBy]: sortOrder });
};

export default {
  applyPagination,
  applySorting,
};
