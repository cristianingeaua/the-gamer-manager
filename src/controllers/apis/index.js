import ApiGenerator from './generator'
import Models from '../../models'

export default (app) => {
  const models = Models(app.get('knex'))

  const user = new ApiGenerator(app, models.user)
  const character = new ApiGenerator(app, models.character)
}
