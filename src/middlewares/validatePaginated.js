const validatePaginated = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query

  if (isNaN(limit) || isNaN(skip)) {
    return res
      .status(400)
      .send({
        detail: 'Limit and Skip parameters must be numbers'
      })
  }

  req.query.limit = Number(limit)
  req.query.skip = Number(skip)

  return next()
}

export {
  validatePaginated
}
