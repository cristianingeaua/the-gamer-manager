export function buildReadQuery(knex, table, params) {
  params = params || {}
  let query = knex(table).select()

  if (params.where) {
    if (Array.isArray(params.where[Object.keys(params.where)[0]])) {
      query = query.whereIn(
        Object.keys(params.where)[0],
        params.where[Object.keys(params.where)[0]]
      )
    } else {
      query = query.where(params.where)
    }
  }
  if (params.limit) {
    query = query.limit(params.limit)
  }
  if (params.orderBy) {
    query = query.orderBy(
      params.orderBy.column,
      params.orderBy.order
    )
  }

  return query
}
