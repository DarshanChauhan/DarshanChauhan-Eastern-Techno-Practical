function paginate(data, { page, limit }) {
  const pageNo = parseInt(page, 10) || 1;
  const limitNo = parseInt(limit, 10) || 10;

  if (pageNo < 1 || limitNo < 1) {
    throw new Error("Page and limit must be greater than 0");
  }

  const offset = (pageNo - 1) * limitNo;
  const paginatedData = data.slice(offset, offset + limitNo);

  return {
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limitNo),
    currentPage: pageNo,
    data: paginatedData,
  };
}

module.exports = paginate;
