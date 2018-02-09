import ModelGenerator from './generator'

export default (knex) => {
  const user = new ModelGenerator(knex, 'User')
  const character = new ModelGenerator(knex, 'Character')

  return {
    user,
    character
  }
}
