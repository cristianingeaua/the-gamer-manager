import { buildReadQuery } from '../utils/builder'

export default class ModelGenerator {
  constructor(knex, table) {
    this.knex = knex
    this.table = table
  }

  get name() {
    return this.table
  }

  create(params, done) {
    knex(this.table).insert(params)
      .then((resultId) => {
        this.read({
          where: { id: resultId[0] }
        }, (err, result) => {
          if (done) { return done(err, result[0]) }
        })
      })
      .catch((err) => {
        if (done) { return done(err) }
      })
  }

  read(params, done) {
    buildReadQuery(this.knex, this.table, params)
      .then((result) => {
        if (done) { return done(null, result) }
      })
      .catch((err) => {
        if (done) { return done(err) }
      })
  }

  update(params, done) {
    knex(this.table).update(params.fields)
      .where(params.where)
      .then((result) => {
        if (done) { return done(null, result.length != 0)}
      })
      .catch((err) => {
        if (done) { return done(err) }
      })
  }

  delete(params, done) {
    knex(this.table).del()
      .where(params.where)
      .then((result) => {
        if (done) { return done(null, result.length != 0)}
      })
      .catch((err) => {
        if (done) { return done(err) }
      })
  }
}
