const validatePaginated = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query

  if (isNaN(limit) || isNaN(skip)) {
    return res
      .send({
        detail: 'Limit and Skip parameters must be numbers'
      })
  }

  console.log(limit, skip)

  req.query.limit = Number(limit)
  req.query.skip = Number(skip)

  return next()
}

export {
  validatePaginated
}
